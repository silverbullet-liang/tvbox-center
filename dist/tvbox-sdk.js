/*!
 * TVBox 通用采集接口 SDK
 * 纯前端、零依赖，封装苹果 CMS（MacCMS v10）标准 JSON 采集接口。
 *
 * 仓库：https://github.com/silverbullet-liang/tvbox-center
 * 版权：Copyright (C) 2026 silverbullet-liang
 * 许可：AGPL-3.0-or-later（SPDX）
 *
 * 用法（浏览器）：
 *   <script src="https://cdn.jsdelivr.net/gh/silverbullet-liang/tvbox-center@main/dist/tvbox-sdk.js"></script>
 *   <script>
 *     const client = TVBoxSDK.create({ sources: [
 *       { key: 'lzi', name: '量子资源', api: 'https://example.com/api.php/provide/vod/' }
 *     ]});
 *     client.search('庆余年').then(list => console.log(list));
 *   </script>
 *
 * 用法（模块）：
 *   const TVBoxSDK = require('./tvbox-sdk.js');
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else if (typeof define === 'function' && define.amd) define([], factory);
  else root.TVBoxSDK = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var VERSION = '1.0.0';
  var DEFAULT_TIMEOUT = 12000;

  /* ---------- 基础工具 ---------- */

  // 确保接口地址以 "/" 结尾
  function slash(u) {
    return u && u.charAt(u.length - 1) === '/' ? u : u + '/';
  }

  // 依据接口地址与参数拼装完整 URL（自动过滤空值并编码）
  function buildUrl(api, params) {
    var qs = Object.keys(params || {})
      .filter(function (k) {
        var v = params[k];
        return v !== undefined && v !== null && v !== '';
      })
      .map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
      })
      .join('&');
    return slash(api) + (qs ? '?' + qs : '');
  }

  // 归一化数据源：允许传入字符串或对象
  function normalizeSource(src) {
    if (typeof src === 'string') return { api: src, name: src, key: src };
    src = src || {};
    return {
      api: src.api,
      name: src.name || src.api,
      key: src.key || src.name || src.api,
      noProxy: !!src.noProxy
    };
  }

  // 带超时的 JSON 请求（AbortController 取消）
  function request(url, timeout) {
    timeout = timeout || DEFAULT_TIMEOUT;
    var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = setTimeout(function () {
      if (ctrl) ctrl.abort();
    }, timeout);
    var conf = { headers: { 'User-Agent': 'Mozilla/5.0' } };
    if (ctrl) conf.signal = ctrl.signal;
    return fetch(url, conf)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        clearTimeout(timer);
        return data;
      })
      .catch(function (err) {
        clearTimeout(timer);
        throw err;
      });
  }

  /* ---------- 播放串解析 ---------- */

  // 解析单块剧集串："第1集$http://...#第2集$http://..." → [{ name, url }]
  function parseEpisodes(block) {
    if (!block) return [];
    var eps = [];
    var parts = String(block).split('#');
    for (var i = 0; i < parts.length; i++) {
      var seg = parts[i];
      var idx = seg.indexOf('$');
      if (idx > 0) {
        var name = seg.substring(0, idx).trim();
        var url = seg.substring(idx + 1).trim();
        if (url) eps.push({ name: name || '第' + (eps.length + 1) + '集', url: url });
      }
    }
    return eps;
  }

  // 解析多线路：vod_play_url 与 vod_play_from 均以 "$$$" 分隔且一一对应
  // 返回 { 线路名: [{ name, url }] }
  function parsePlayUrls(playUrl, playFrom) {
    var out = {};
    var urls = String(playUrl || '').split('$$$');
    var froms = playFrom ? String(playFrom).split('$$$') : [];
    for (var i = 0; i < urls.length; i++) {
      var eps = parseEpisodes(urls[i]);
      if (!eps.length) continue;
      var name = (froms[i] || '').trim() || '线路' + (i + 1);
      out[name] = eps;
    }
    return out;
  }

  /* ---------- 单数据源 ---------- */

  function Source(src, opts) {
    var s = normalizeSource(src);
    this.api = s.api;
    this.name = s.name;
    this.key = s.key;
    this.noProxy = s.noProxy;
    this.timeout = (opts && opts.timeout) || DEFAULT_TIMEOUT;
  }

  Source.prototype.url = function (params) {
    return buildUrl(this.api, params);
  };

  // 列表 / 搜索：{ page, wd, t }
  Source.prototype.list = function (o) {
    o = o || {};
    var params = { ac: 'list', pg: o.page || 1 };
    if (o.wd) params.wd = o.wd;
    if (o.t) params.t = o.t;
    var self = this;
    return request(this.url(params), this.timeout)
      .then(function (data) {
        var list = data && Array.isArray(data.list) ? data.list : [];
        return {
          ok: true,
          list: list,
          total: (data && data.total) || list.length,
          pagecount: (data && data.pagecount) || 1,
          page: (data && data.page) || params.pg
        };
      })
      .catch(function (err) {
        return { ok: false, list: [], total: 0, pagecount: 0, error: err.message };
      });
  };

  // 详情：按 vod_id 获取完整信息
  Source.prototype.detail = function (id) {
    return request(this.url({ ac: 'detail', ids: id }), this.timeout)
      .then(function (data) {
        return data && data.list && data.list[0] ? data.list[0] : null;
      })
      .catch(function () {
        return null;
      });
  };

  // 搜索联想：建议词
  Source.prototype.suggest = function (wd, limit) {
    if (!wd) return Promise.resolve([]);
    return request(this.url({ ac: 'suggest', wd: wd, limit: limit || 10 }), this.timeout)
      .then(function (data) {
        return data && Array.isArray(data.list) ? data.list : [];
      })
      .catch(function () {
        return [];
      });
  };

  /* ---------- 多数据源客户端 ---------- */

  function Client(opts) {
    opts = opts || {};
    var timeout = opts.timeout || DEFAULT_TIMEOUT;
    this.timeout = timeout;
    var list = opts.sources || [];
    this.sources = list.map(function (s) {
      return s instanceof Source ? s : new Source(s, { timeout: timeout });
    });
  }

  // 按 key 或 name 取数据源
  Client.prototype.get = function (keyOrName) {
    for (var i = 0; i < this.sources.length; i++) {
      if (this.sources[i].key === keyOrName || this.sources[i].name === keyOrName) return this.sources[i];
    }
    return null;
  };

  // 新增数据源
  Client.prototype.add = function (src) {
    var s = src instanceof Source ? src : new Source(src, { timeout: this.timeout });
    this.sources.push(s);
    return s;
  };

  // 多源并行搜索，结果为各源列表拼接（每项附带 _source / _sourceKey / _api）
  Client.prototype.search = function (wd, o) {
    o = o || {};
    var page = o.page || 1;
    var t = o.t || '';
    return Promise.all(
      this.sources.map(function (src) {
        return src.list({ page: page, wd: wd, t: t }).then(function (r) {
          return r.list.map(function (it) {
            it._source = src.name;
            it._sourceKey = src.key;
            it._api = src.api;
            return it;
          });
        });
      })
    ).then(function (groups) {
      return groups.reduce(function (acc, g) {
        return acc.concat(g);
      }, []);
    });
  };

  // 多源并行联想
  Client.prototype.suggest = function (wd, limit) {
    return Promise.all(
      this.sources.map(function (src) {
        return src.suggest(wd, limit);
      })
    ).then(function (groups) {
      return groups.reduce(function (acc, g) {
        return acc.concat(g);
      }, []);
    });
  };

  /* ---------- 导出 ---------- */

  return {
    version: VERSION,
    DEFAULT_TIMEOUT: DEFAULT_TIMEOUT,
    buildUrl: buildUrl,
    parseEpisodes: parseEpisodes,
    parsePlayUrls: parsePlayUrls,
    Source: Source,
    Client: Client,
    request: request,
    source: function (src, opts) {
      return new Source(src, opts);
    },
    create: function (opts) {
      return new Client(opts);
    }
  };
});
