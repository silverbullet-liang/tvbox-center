# TVBox 影视资源中心

**纯前端 · 单文件 · 零构建** 的影视聚合播放器，界面基于 Material Design 3。

下载一个 HTML 文件，用浏览器打开即可搜索、播放与投屏 —— 无需后端、无需安装依赖、无需打包。

项目提供两个版本：

- **Pro（`index.html`）** — 全功能版。内置 6 个采集源；支持本地全库索引（IndexedDB）与分阶段搜索；支持投屏、长按倍速、跳过片头片尾、播放位置记忆等。
- **Mini（`mini.html`）** — 轻量版。单数据源，交互更精简，适合低配设备与快速部署。

许可：`AGPL-3.0-or-later`

---

## 免责声明

> 本项目**仅供编程技术学习与交流**，不提供、不存储、不托管任何影视内容。
>
> - 所有影视数据均来自**第三方公开采集接口**（苹果 CMS / MacCMS 标准 JSON 接口），由对应接口提供方维护，与本项目作者无关。
> - 本项目是纯粹的浏览器端界面：搜索与播放地址**直连数据源**，作者无法、也未曾干预其内容。
> - 请勿将本项目用于商业用途，或用于侵犯版权、传播违法信息的场景。
> - 内置接口地址仅作**技术演示**；使用者应在下载后 24 小时内自行判断并承担使用后果。
> - 如权利人认为相关内容侵犯其合法权益，请直接联系对应的**数据源提供方**，本项目不承担任何责任。
>
> **请支持正版，通过正规渠道观看影视内容。**

---

## 功能对比

| 能力 | Mini | Pro |
| --- | :--: | :--: |
| 内置数据源 | 1 个（量子资源） | 6 个（两类：服务端搜索 / 客户端标题匹配） |
| 多源并行搜索 | 支持 | 支持 |
| 搜索联想建议 | — | 支持 |
| HLS 播放（hls.js） | 支持 | 支持 |
| 画质切换 | 支持 | 支持 |
| 画幅比例 | 支持 | 支持 |
| 倍速（0.25x–5x） | 支持 | 支持 |
| 选集 / 线路切换 | 支持 | 支持 |
| 全屏 / 小窗 | 支持 | 支持 |
| 手势控制（进度 / 音量） | 支持 | 支持 |
| 键盘快捷键 | 支持 | 支持 |
| 记忆播放位置 | — | 支持 |
| 长按 2x 倍速 | — | 支持 |
| 跳过片头 / 片尾 | — | 支持 |
| 播放方式（顺序 / 循环 / 随机） | — | 支持 |
| 投屏（Chromecast / AirPlay） | — | 支持 |
| 历史保留条数设置 | — | 支持 |
| 本地全库索引（IndexedDB，仿 SQL 表） | — | 支持 |
| 一起看（MQTT 实时聊天 / 在线人数 / 未读红点） | — | 支持 |
| 一起看分享（TVC1 分享串 / 剪贴板与搜索框识别） | — | 支持 |
| 加密数据备份（.tvcbak 导出 / 导入） | — | 支持 |
| 主题换肤（4 色 + 深浅色） | 支持 | 支持 |
| MiSans 字体 | — | 支持 |

---

## 快速开始

### 1. 直接打开

下载 `index.html`，双击用浏览器打开。

> 部分接口不允许 `file://` 跨域请求。若搜索无结果，请改用下方本地服务器或部署到 HTTPS。

### 2. 本地服务器（推荐）

```bash
python3 -m http.server 8000
```

浏览器访问 `http://localhost:8000/index.html`。

### 3. GitHub Pages

Fork 本仓库 → `Settings` → `Pages` → Source 选择 `Deploy from a branch` → 分支 `main`、目录 `/ (root)` → 保存。稍后访问 `https://<你的用户名>.github.io/tvbox-center/`。

### 4. 任意静态托管

`index.html` / `mini.html` 是自包含文件，直接放入 Nginx、对象存储或 CDN 即可对外提供服务。

---

## 使用说明

1. **搜索** — 底部导航进入「搜索」，输入片名，多个数据源并行返回结果，点卡片查看详情。
2. **播放** — 在详情页选择线路与剧集，进入播放器。
3. **收藏 / 历史** — 卡片右上角心形可收藏；播放过的内容自动进入首页「历史记录」。
4. **设置** — 换肤、开关数据源；（Pro）历史保留条数、播放器默认参数与播放行为。

### 键盘快捷键

| 按键 | 功能 |
| --- | --- |
| `空格` / `K` | 播放 / 暂停 |
| `←` / `→` | 快退 / 快进 10 秒 |
| `J` / `L` | 快退 / 快进 60 秒 |
| `↑` / `↓` | 音量 + / − |
| `M` | 静音切换 |
| `F` | 全屏 / 退出全屏 |
| `Esc` | 关闭播放器 / 退出全屏 |
| `P` / `N` | 上一集 / 下一集 |
| `0` – `9` | 跳转到 0% – 90% |
| `>` / `<` | 加速 / 减速 0.25x |
| `E` | 切换选集面板 |

---

## 一起看（Watch Together）

播放控件右下角的「一起看」按钮可打开聊天侧栏。点击后会直接进入影院模式：

- **桌面宽屏**：播放器约占 70%，右侧固定 320px 侧栏；
- **竖屏 / 移动端**：播放器自动旋转 90° 横屏；聊天侧栏固定在底部作为抽屉，不随播放器旋转，关闭按钮始终在侧栏顶部；
- **关闭侧栏**：播放器恢复全宽；MQTT 连接与订阅默认保持（可在设置中关闭后台监控）。

房间按影视隔离：`sourceKey + "::" + vodId` 哈希成 `roomHash`，同一影片的不同采集源不会合并，不同剧集 / 线路共用同一个房间。

- **连接**：默认使用公共 Broker `wss://broker.emqx.io:8084/mqtt`，无需账号；首次点击「一起看」时创建 Web Worker（Blob URL），后续复用。
- **自建 Broker**：修改 `index.html` 顶部的 `MQTT_CONFIG`（`url` / `username` / `password` / `clientIdPrefix` / `topicPrefix`）。Topic 形如 `tvbox-center/v1/chat/{roomHash}`。
- **状态**：绿点「已连接」、黄点「正在连接」、红点「连接失败」；断线自动重连。聊天服务不可用时只影响侧栏，不阻塞播放。
- **在线人数**：点击右上角人数可展开在线用户列表（自己置顶并标注「我」，同一用户多标签只计一人）。
- **未读红点**：关闭侧栏后仍可在后台接收当前影视消息（可在设置中关闭），「一起看」按钮右上角显示未读数字。
- **已读同步**：只有其他客户端打开侧栏并渲染消息后才回 ACK；重连后按当前房间做一次增量同步（最多 200 条）。
- **限制**：单条消息最多 500 字，发送间隔 1.2 秒；每个影视本地保留最近 200 条。公共 Broker 上的消息对任何知道 Topic 的人可见，**请勿发送敏感信息**。

### 分享与加入

侧栏左下角「分享」会生成 `TVC1:` 开头的分享串（JSON → deflate-raw → base64url），并写入剪贴板。对方打开本项目后：

- 页面加载 / 窗口重新聚焦时自动检查剪贴板第一条；
- 粘贴到搜索框时提示「检测到一起看分享，按回车加入」，回车才解析；
- 在页面其他位置粘贴、或设置页点「从剪贴板打开一起看」也可以加入。

分享会切换到对应数据源、加载影视详情、定位线路与集数、跳转分享时的播放进度、进入全屏并打开侧栏。若当前正在播放其他内容，会先确认再切换。

## 数据备份（加密导出 / 导入）

设置页 →「数据备份」：

- **一键导出所有数据**：输入密钥并再次确认，生成 `tvbox-backup-YYYYMMDD-HHmm.tvcbak`。
- **导入备份数据**：选择 `.tvcbak` 文件并输入导出时的密钥；确认后恢复。

备份覆盖收藏、设置、历史、播放位置、头像、昵称、一起看开关、聊天记录与全库索引。文件格式：

```text
magic(8) "TVCBAK1\0" | version(1) | flags(1) | salt(16) | iv(12) | AES-GCM ciphertext
```

加密流程：JSON → UTF-8 → **GZIP** → XOR → RC4 → **AES-GCM-256**。密钥经 PBKDF2-SHA256（200000 次）派生 64 字节，分别用作 AES / RC4 / XOR 密钥；AES-GCM 的 additionalData 绑定文件头，防篡改。

> 密钥不会保存、不会上传，也不会写入日志。密钥丢失将无法恢复备份。备份文件包含聊天记录与个人资料，请妥善保管。
>
> 导出 / 导入需要浏览器支持 `CompressionStream`（GZIP）与 WebCrypto，并通过 **HTTPS 或 localhost** 访问。

## 数据源

数据源为公开的苹果 CMS（MacCMS v10）标准 JSON 采集接口，请求参数：

| 参数 | 说明 |
| --- | --- |
| `ac=list` | 列表 / 搜索 |
| `ac=detail` | 详情 |
| `ac=suggest` | 联想搜索 |

接口地址定义在文件开头的 `DEFAULT_SOURCES` 数组中，可替换为任意同协议接口：

```js
const DEFAULT_SOURCES = [
  { key:"lzi", name:"量子资源", api:"https://example.com/api.php/provide/vod/", type:1, enabled:true, noProxy:true }
];
```

> 本项目不保证任何第三方接口的可用性、合法性或稳定性，接口随时可能变更或失效。

---

## 组件库 tvbox-center.js（含 Pro 全部功能）

`dist/tvbox-center.js` 由 Pro 版重构而来，是**自包含组件库**：包含 Pro 的全部功能——多源搜索、HLS 播放器、一起看、加密备份、投屏（Chromecast / AirPlay）、选集与线路切换、倍速、画质画幅、主题换肤、历史、收藏、设置、键盘快捷键等。样式已作用域限定在容器内，不会污染宿主页面。引入后调用 `TVBox.mount(target, options)` 即可在任意页面挂载完整影视中心。

### 标准 CDN 引入

```html
<!-- jsDelivr · 锁定版本（生产环境推荐） -->
<script src="https://cdn.jsdelivr.net/gh/silverbullet-liang/tvbox-center@v1.8.3/dist/tvbox-center.min.js"></script>

<!-- jsDelivr · 跟随 main（始终最新） -->
<script src="https://cdn.jsdelivr.net/gh/silverbullet-liang/tvbox-center@main/dist/tvbox-center.min.js"></script>

<!-- raw 直链（GitHub 直出，无 CDN 缓存） -->
<script src="https://raw.githubusercontent.com/silverbullet-liang/tvbox-center/main/dist/tvbox-center.min.js"></script>
```

### 挂载用法

```html
<div id="tvbox-app" style="height:100vh"></div>
<script src="https://cdn.jsdelivr.net/gh/silverbullet-liang/tvbox-center@main/dist/tvbox-center.min.js"></script>
<script>
  const app = TVBox.mount('#tvbox-app', {
    // 可选：覆盖内置数据源
    sources: [
      { key: 'lzi',  name: '量子资源', api: 'https://example.com/api.php/provide/vod/' },
      { key: 'bfzy', name: '暴风资源', api: 'https://example.com2/api.php/provide/vod/' }
    ],
    // 可选：默认主题 purple | yellow | green | blue
    theme: 'purple'
  });

  // TVBox.unmount();  // 卸载
</script>
```

> - 容器需要有高度（例如 `height:100vh`）；全屏播放器会覆盖整个视口。
> - 组件库已内置 hls.js 1.7.3 与 mqtt.js 5.15.1；只有 Iconify 图标、MiSans 字体与 Cast SDK 会按需从 CDN 加载。
> - 同一页面建议只挂载一个实例。

### 内置第三方库（TVBoxCenter 命名空间）

聚合文件已把 mqtt.js 与 hls.js 以 IIFE 合并进同一文件，不产生额外 vendor 文件，并显式暴露到统一命名空间：

```js
// 主线程 / Worker 均可直接使用（需先加载/importScripts 聚合文件）
const mqtt = TVBoxCenter.mqtt;   // mqtt.js 5.15.1
const Hls  = TVBoxCenter.hls;    // hls.js 1.7.3
```

在 Web Worker 中复用的方式：

```js
const worker = new Worker(URL.createObjectURL(new Blob([`
  importScripts('https://cdn.jsdelivr.net/gh/silverbullet-liang/tvbox-center@v1.8.3/dist/tvbox-center.js');
  const client = TVBoxCenter.mqtt.connect('wss://broker.emqx.io:8084/mqtt');
`], { type: 'application/javascript' })));
```

> 聚合文件在 `document` 不存在（Worker）时只装载 `TVBoxCenter.mqtt` / `TVBoxCenter.hls`，不会执行组件库 UI。

### 直接下载

- [tvbox-center.js](dist/tvbox-center.js) — 源码版（约 1.2 MB，含 mqtt / hls）
- [tvbox-center.min.js](dist/tvbox-center.min.js) — 压缩版（约 1.16 MB，jsDelivr 会再 gzip）

---

## 接口 SDK tvbox-sdk.js

`dist/tvbox-sdk.js` 是从本项目提取的**纯前端、零依赖**采集接口 SDK，封装苹果 CMS（MacCMS v10）标准 JSON 接口，可在任意网页或 Node 项目中复用。

### 通过 CDN 引入

```html
<!-- jsDelivr（推荐，真正的 CDN，带缓存加速） -->
<script src="https://cdn.jsdelivr.net/gh/silverbullet-liang/tvbox-center@main/dist/tvbox-sdk.min.js"></script>

<!-- 锁定版本（生产环境建议） -->
<script src="https://cdn.jsdelivr.net/gh/silverbullet-liang/tvbox-center@v1.2.0/dist/tvbox-sdk.min.js"></script>

<!-- raw 直链（GitHub 直出，无 CDN 缓存） -->
<script src="https://raw.githubusercontent.com/silverbullet-liang/tvbox-center/main/dist/tvbox-sdk.js"></script>
```

> `raw.githubusercontent.com` 的 `Content-Type` 为 `text/plain`，作为 `<script src>` 引用可用，但没有 CDN 的缓存与加速；生产环境建议用 jsDelivr 或下载到本地。

### 直接下载

- [tvbox-sdk.js](dist/tvbox-sdk.js) — 源码版（约 8 KB）
- [tvbox-sdk.min.js](dist/tvbox-sdk.min.js) — 压缩版（约 4 KB）

### 基本用法

```html
<script src="https://cdn.jsdelivr.net/gh/silverbullet-liang/tvbox-center@main/dist/tvbox-sdk.min.js"></script>
<script>
  // 1. 创建多源客户端
  const client = TVBoxSDK.create({
    timeout: 12000,
    sources: [
      { key: 'lzi', name: '量子资源', api: 'https://example.com/api.php/provide/vod/' },
      { key: 'bfzy', name: '暴风资源', api: 'https://example.com2/api.php/provide/vod/' }
    ]
  });

  // 2. 多源并行搜索（结果项附带 _source / _sourceKey / _api）
  client.search('庆余年').then(list => {
    list.forEach(it => console.log(it._source, it.vod_name, it.vod_id));
  });

  // 3. 详情 + 解析线路与剧集
  client.get('lzi').detail('12345').then(detail => {
    const lines = TVBoxSDK.parsePlayUrls(detail.vod_play_url, detail.vod_play_from);
    // lines = { '线路名': [{ name: '第1集', url: 'https://.../index.m3u8' }, ...] }
    console.log(lines);
  });

  // 4. 搜索联想
  client.suggest('庆').then(list => console.log(list));
</script>
```

### API 一览

| 方法 | 说明 |
| --- | --- |
| `TVBoxSDK.create({ sources, timeout })` | 创建多源客户端 |
| `client.search(wd, { page })` | 多源并行搜索，结果项附带 `_source` / `_sourceKey` / `_api` |
| `client.suggest(wd, limit)` | 多源联想 |
| `client.get(keyOrName)` | 按 key 或名称取单个数据源 |
| `client.add(src)` | 追加数据源 |
| `source.list({ page, wd, t })` | 列表 / 搜索，返回 `{ ok, list, total, pagecount }` |
| `source.detail(vodId)` | 详情，返回对象或 `null` |
| `source.suggest(wd, limit)` | 联想，返回数组 |
| `source.url(params)` | 拼装完整请求 URL |
| `TVBoxSDK.parsePlayUrls(playUrl, playFrom)` | 解析多线路 → `{ 线路名: [{ name, url }] }` |
| `TVBoxSDK.parseEpisodes(block)` | 解析单块 `名称$地址#...` |
| `TVBoxSDK.buildUrl(api, params)` | 依据接口地址拼装请求 URL |

### Node / 打包环境

SDK 采用 UMD 封装，可直接 `require`：

```js
const TVBoxSDK = require('./dist/tvbox-sdk.js');
// Node 18+ 自带全局 fetch
```

---

## 项目结构

```
tvbox-center/
├── index.html           Pro 版（全功能，默认入口）
├── promo.html           宣传页（单文件落地页）
├── dist/                通用 CDN 资源（组件库 tvbox-center.js，已聚合 mqtt.js / hls.js；接口 SDK tvbox-sdk.js）
├── mini.html            Mini 版（轻量）
├── favicon.png          网站图标（favicon）
├── LICENSE              AGPL-3.0 全文
├── README.md            中文说明
├── README.en.md         英文说明
├── CHANGELOG.md         更新日志
├── CONTRIBUTING.md      贡献指南
├── CODE_OF_CONDUCT.md   社区行为准则
├── SECURITY.md          安全政策
├── .editorconfig        编辑器约定
├── .gitignore
└── .github/             Issue / PR 模板
```

---

## 浏览器兼容

| 浏览器 | 支持情况 |
| --- | --- |
| Chrome / Edge（桌面与 Android） | 完整 |
| Safari（macOS / iOS） | 完整，投屏走 AirPlay |
| Firefox | 完整，无 Chromecast 投屏 |

HLS 播放依赖 `hls.js`；Safari 原生支持 HLS，会自动回退。

一起看需要 WebSocket 与 Web Worker（现代浏览器均支持）；加密备份需要 `CompressionStream`（GZIP）与 WebCrypto（Safari 16.4+），且页面需在 **HTTPS 或 localhost** 下运行。

---

## 常见问题

**一起看一直显示「正在连接」/「连接失败」？**
公共 Broker 可能被网络或防火墙拦截，也可能临时限流。可修改 `MQTT_CONFIG` 指向自建 Broker。聊天不可用不影响正常播放。

**打开一起看没有横屏？**
v1.8.3 起，竖屏点击「一起看」会自动旋转为横屏影院模式，侧栏固定在底部抽屉、不随播放器旋转；请确认使用的是最新 `index.html`。

**导入备份提示「密钥错误或备份文件损坏」？**
请确认密钥与导出时完全一致；版本不支持、文件损坏或缺少 GZIP 压缩都会统一提示。建议先用当前版本重新导出一份备份再导入。

**搜索没有结果？**
多为接口不可用或跨域限制。请用本地服务器或 HTTPS 访问，或在设置中切换其它数据源。

**播放黑屏 / 一直缓冲？**
通常是片源（m3u8）已失效或网络受限，换线路或换剧集再试。

**数据存在哪里？**
全部保存在浏览器 `localStorage`，不上传任何服务器。清除浏览器数据会一并清空收藏与历史。

**如何新增数据源？**
编辑 `DEFAULT_SOURCES` 数组（见上文），加入同协议的接口地址。

---

## 开发

本项目刻意保持**单文件、零构建**：不引入打包器、不拆分模块，修改后刷新即生效。

- 设计规范：Material Design 3 令牌（颜色、圆角、阴影、动效）
- 图标：Iconify（lucide 图标集）
- 播放：hls.js
- 编码：UTF-8，CSS / JS 内联

贡献前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。

---

## 致谢

- [hls.js](https://github.com/video-dev/hls.js)
- [Iconify](https://iconify.design/) / [Lucide](https://lucide.dev/)
- MiSans（Pro 版字体，小米官方字体）
- Material Design 3

---

## 许可

本项目基于 **GNU Affero 通用公共许可证 v3.0 或更新版本（AGPL-3.0-or-later）** 发布，全文见 [LICENSE](LICENSE)。

```
Copyright (C) 2026 silverbullet-liang
```

AGPL 要求：任何通过网络向用户提供本程序（或其修改版本）服务的，都必须同样以 AGPL 公开其完整源代码。
