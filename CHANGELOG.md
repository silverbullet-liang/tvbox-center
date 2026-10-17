# 更新日志

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/) 与 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 规范。

## [1.8.8] - 2026-10-17

### 新增

- **宣传页**：一键体验按钮下方新增「最新更新」卡片。通过 GitHub Contents API 实时读取 `CHANGELOG.md` 并在本地渲染 Markdown，只展示最新一个版本；5 分钟内使用会话缓存，接口不可用时回退 raw 文件，失败不影响页面其他内容。

[1.8.8]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.8.8

## [1.8.7] - 2026-10-17

### 修复

- **Pro 版 · 一起看**：移除竖屏侧栏多余的 `order` 反转，修复聊天面板上下颠倒；头部恢复在视觉顶部（关闭按钮在右上角），输入框在底部，视频仍让出 320px。

[1.8.7]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.8.7

## [1.8.6] - 2026-10-17

### 修复

- **Pro 版 · 一起看**：竖屏布局改为「侧栏与播放器同处旋转坐标系」——视频让出 320px 并缩小，侧栏位于视觉右侧；通过 `order` 把侧栏头部排到视觉顶部，关闭按钮回到侧栏右上角，不再落到播放控件层。
- 不再依赖系统横屏锁定；即使 Screen Orientation API 不可用，也能正确缩小播放器并显示右侧栏。

[1.8.6]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.8.6

## [1.8.5] - 2026-10-17

### 修复

- **Pro 版 · 一起看**：竖屏点击「一起看」时优先请求系统横屏（全屏 + Screen Orientation API），整个页面进入真实横屏坐标系，侧栏固定在右侧、关闭按钮位于侧栏头部。
- 浏览器不支持横屏锁定（如 iOS Safari）时，回退为与「选集」弹窗完全相同的 `inset:0` 覆盖层，随播放器一起旋转（不再自行计算 320px 定位），关闭按钮仍在侧栏头部。
- 退出影院模式时释放横屏锁与浏览器全屏。

[1.8.5]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.8.5

## [1.8.3] - 2026-10-17

### 修复

- **Pro 版 · 一起看**：侧栏不再嵌入旋转中的播放器，避免关闭按钮与播放控件重叠、误触。竖屏与移动端改为固定在底部的聊天抽屉（不随播放器旋转，关闭按钮始终在侧栏顶部），视频仍自动横屏；桌面宽屏保持右侧 320px 侧栏。

[1.8.3]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.8.3

## [1.8.2] - 2026-10-17

### 修复

- **Pro 版 · 一起看**：修复移动端 / 竖屏下打开侧栏不横屏的问题。现在点击「一起看」会进入影院横屏模式；竖屏时侧栏**随播放器一起旋转**到视觉右侧，文字方向正确，视频让出 320px。
- 关闭侧栏后播放器恢复全宽。

[1.8.2]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.8.2

## [1.8.1] - 2026-10-17

### 修复

- **Pro 版 · 一起看**：修复打开侧栏后未自动进入横向影院模式、播放器未缩小的问题。桌面宽屏（视口 ≥768px 且横向）点击「一起看」会自动进入全屏，并将播放器缩至「视口宽 − 320px」，右侧显示聊天侧栏。
- **Pro 版 · 一起看**：侧栏布局改为仅按视口宽度判断（≤767px 为底部抽屉），不再把桌面竖屏窗口误判为移动端。

[1.8.1]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.8.1

## [1.8.0] - 2026-10-17

### 新增

- **Pro 版 · 一起看**：全屏播放控件新增「一起看」。桌面端播放器约占 70%、右侧固定约 320px 侧栏；移动端为底部抽屉。按影视隔离房间（同一影片不同采集源不合并，不同剧集 / 线路共用），支持在线人数与用户列表、未读红点、后台接收、断线自动重连、跨端已读同步。
- **Pro 版 · 一起看分享**：侧栏「分享」生成 `TVC1:` 分享串并写入剪贴板；页面加载、窗口聚焦、剪贴板按钮、搜索框回车、全局粘贴均可识别，一键切换数据源、定位线路与集数、跳转进度并加入房间。
- **Pro 版 · 个人资料**：5×5 像素 identicon 头像（稳定种子生成）与自定义上传头像（本地压缩）、昵称（1–16 字符）。
- **Pro 版 · 一起看设置**：总开关、后台监控、红点提示三个开关，即时生效并本地保存；总开关关闭时隐藏入口与分享按钮并断开连接，子开关置灰且保留原状态。
- **Pro 版 · 数据备份**：设置页「一键导出所有数据 / 导入备份数据」，生成 `.tvcbak` 二进制文件（强制 GZIP 压缩 + PBKDF2-SHA256 200000 次 + XOR / RC4 / AES-GCM 分层加密）。覆盖收藏、设置、历史、头像、昵称、一起看开关、聊天记录与全库索引；导出前在内存中完整校验，导入前完成解密 / 解压 / 结构校验。

### 变更

- **CDN 聚合文件**：`dist/tvbox-center.js` 内置 **mqtt.js 5.15.1** 与 **hls.js 1.7.3**，以 IIFE 合并进同一文件，暴露 `TVBoxCenter.mqtt` / `TVBoxCenter.hls`。Worker 可直接 `importScripts` 本文件：无 `document` 时只装载第三方库，不启动 UI。
- **Pro 版**：内部标识更新为 `v5.8-pro`。
- **Mini 版**：未同步本次改动；一起看、分享、数据备份仅 Pro 提供，Mini 的搜索 / 播放 / 收藏 / 历史不受影响。

[1.8.0]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.8.0

## [1.7.3] - 2026-10-11

### 变更

- **Pro 版**：播放控件自动隐藏逻辑优化 —— 暂停时控件**保持显示**（不再自动隐藏）；操作控件时重置计时，**停止操作 2 秒**后才隐藏（原为固定 3 秒）。

[1.7.3]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.7.3

## [1.7.2] - 2026-10-11

### 修复

- **Pro 版**：修复搜索联想总是晚于搜索结果出现的问题 —— 联想现**只查询支持搜索的源**（此前会对禁搜的仅列表源也发联想请求，既无效又挤占连接），并加 2 秒超时，联想更快返回。

[1.7.2]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.7.2

## [1.7.1] - 2026-10-11

### 变更

- **Pro 版**：全库索引默认关闭；索引设置（每源页数、参与源、构建与进度）随「开启全库检索」开关**联动显示/隐藏** —— 开启才展开，关闭即收起。

[1.7.1]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.7.1

## [1.7.0] - 2026-10-11

### 修复

- **Pro 版**：修复「仅列表」源在源筛选下不起作用的问题 —— 本地索引结果现按筛选过滤，仅列表源也按筛选参与。

### 变更

- **Pro 版**：仅列表源的搜索改为「本地索引优先 + 到底在线续抓」——开启全库检索时先展示本地索引结果；滚动到页面底部时自动从在线列表继续抓取下一批 10 页并追加（未开启全库时则首屏即在线抓 10 页）。
- 全程按 `vod_id|源` 去重（索引 / 服务端 / 在线列表结果互不重复）。
- **Pro 版**：内部标识更新为 `v5.4-pro`。

[1.7.0]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.7.0

## [1.6.1] - 2026-10-11

### 变更

- **Pro 版**：全库索引排除「支持在线搜索」的源（量子、暴风）——它们本身已是服务端全库检索，无需本地索引；索引仅覆盖「仅列表」源（豆瓣、猫台、豆瓣影视、茅台）。

[1.6.1]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.6.1

## [1.6.0] - 2026-10-11

### 新增

- **全库索引可配置**：设置页可选择每源抓取页数（10 / 20 / 50 / 100）与参与索引的源（逐源开关）。
- **并发下载 + 断点续传**：多个源同时下载；每完成一页即写入进度，中断后点「构建 / 继续」即从断点续传，不重头再来。
- 进度条按「已完成页 / 总页数」实时更新。

### 变更

- **Pro 版**：内部标识更新为 `v5.2-pro`。
- 组件库 `dist/tvbox-center.js` 同步。

[1.6.0]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.6.0

## [1.5.1] - 2026-10-11

### 变更

- **Pro 版**：关闭「全库检索」时，仅列表源的检索范围由前 100 页调整为**前 10 页**（更快、更轻）；开启全库检索后仍使用本地索引的全量数据（前 100 页/源）。

[1.5.1]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.5.1

## [1.5.0] - 2026-10-11

### 新增

- **全库检索**：设置页可开启「全库检索」，将启用源的列表（每源前 100 页）抓取并建立本地索引，缓存到浏览器 **IndexedDB**（结构仿 SQL：database `tvbox_center` / table `works` / index `idx_name`）。开启后搜索优先用本地索引做全库模糊匹配。
- **索引进度 UI**：构建索引时显示进度条与实时文字（正在下载哪个源、第几页、已入库条数、正在建立索引、完成），过程全程可感知。
- **仅列表源前 100 页检索**：不支持关键词搜索的源，普通模式下改为抓取其前 100 页并客户端标题匹配；检索期间保持加载动画，不再提前显示「未找到」。

### 变更

- **Pro 版**：内部标识更新为 `v5.1-pro`。
- 组件库 `dist/tvbox-center.js` 同步支持全库索引与进度 UI。

[1.5.0]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.5.0

## [1.4.0] - 2026-10-11

### 新增

- **Pro 版**：数据源支持两种搜索能力 —— `search:true` 走服务端关键词搜索（如量子、暴风，即时返回）；`search:false`（API 禁止关键词搜索，如豆瓣、猫台、豆瓣影视、茅台）改由客户端拉取列表并按**标题模糊匹配**补全。
- **Pro 版**：搜索分阶段加载 —— 先展示可搜索源的结果，其余源后台加载、命中后追加并提示；内置源恢复为 6 个。
- 组件库 `dist/tvbox-center.js` 同步支持两类源与分阶段搜索。

### 变更

- **Pro 版**：内部标识更新为 `v5.0-pro`。

[1.4.0]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.4.0

## [1.3.2] - 2026-10-11

### 修复

- 移除 4 个**禁止关键词搜索**的采集源：其接口返回 `code 1002 / Current API forbids keyword search`，搜索场景始终无结果（非跨域或参数问题，无法旁路）。
- Pro 版内置源据此调整为 2 个（量子资源、暴风资源），二者均支持关键词搜索。
- 组件库 `dist/tvbox-center.js` 同步更新；Pro 版内部标识更新为 `v4.8-pro`。

[1.3.2]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.3.2

## [1.3.1] - 2026-10-11

### 变更

- **Pro 版**：移除 3 个含成人内容的采集源与 2 个已失效的采集源，内置源由 11 个调整为 6 个（量子、暴风、豆瓣、猫台、豆瓣影视、茅台），界面更干净合规。
- 组件库 `dist/tvbox-center.js` 同步更新。
- **Pro 版**：内部标识更新为 `v4.7-pro`。

[1.3.1]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.3.1

## [1.3.0] - 2026-10-11

### 新增

- **Pro 版**：内置采集源由 2 个扩展至 **11 个**（量子、暴风、小桔子、豆瓣、猫台、NXFLV、豆瓣影视、黑料、黑木耳、茅台等），显著提升多源搜索的资源覆盖面。

### 变更

- 组件库 `dist/tvbox-center.js` 同步更新内置源。
- **Pro 版**：内部标识更新为 `v4.6-pro`。

[1.3.0]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.3.0

## [1.2.0] - 2026-10-11

### 新增

- 新增**完整组件库** `dist/tvbox-center.js`（含压缩版 `.min.js`）：把 Pro 版全部功能（多源搜索、HLS 播放器、投屏、选集、倍速、画质画幅、换肤、历史、收藏、设置、快捷键等）重构为可嵌入组件，引入后调用 `TVBox.mount(target, options)` 即可在任意页面挂载；样式已作用域隔离，UMD 封装，支持 CDN / `require` / AMD。
- 新增**采集接口 SDK** `dist/tvbox-sdk.js`（含压缩版 `.min.js`）：轻量封装苹果 CMS（MacCMS v10）标准接口的列表 / 搜索 / 详情 / 联想与播放串解析，供二次开发。
- README 增加「组件库」「接口 SDK」章节（标准 jsDelivr / raw 链接、挂载与接口用法）。

### 变更

- **Pro 版**：播放器弹窗尺寸改按像素计算，修复横屏下的尺寸偏差。
- **Pro 版**：内部标识更新为 `v4.5-pro`。

[1.2.0]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.2.0

## [1.1.0] - 2026-10-11

### 变更

- **Pro 版**：全屏播放时，集名改为跟随画面旋转显示在视觉左上角，不再随设备方向错位。
- **Pro 版**：长按 2x 倍速提示、播放器内的操作提示改为跟随播放器旋转，横竖屏下均位于视觉顶部，避免错位。
- **Pro 版**：全屏播放时的操作提示改用播放器内 Toast 呈现，不再被页面其它元素遮挡。
- **Pro 版**：内部标识更新为 `v4.4-pro`。

[1.1.0]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.1.0

## [1.0.0] - 2026-10-11

首个开源版本，以 `AGPL-3.0-or-later` 许可发布。

### 新增

- **Pro 版（`index.html`）**：内置量子资源、暴风资源双数据源；投屏（Chromecast / AirPlay）；长按 2x 倍速；跳过片头 / 片尾；记忆播放位置；播放方式（顺序 / 列表循环 / 单集循环 / 随机）；默认倍速与画幅；历史保留条数设置；搜索联想建议；MiSans 字体。
- **Mini 版（`mini.html`）**：单数据源轻量实现，内置量子资源。
- **两版通用**：多源并行搜索、HLS 播放、画质 / 画幅 / 倍速切换、选集与线路切换、全屏 / 小窗、手势控制、键盘快捷键、4 色主题换肤（自动适配深浅色）、本地持久化。
- **开源配套**：README（中文 / 英文）、更新日志、贡献指南、社区行为准则、安全政策、Issue / PR 模板、`.gitignore`、`.editorconfig`、SPDX 版权头。

### 说明

- Pro 版内部标识为 `v4.3-pro`，Mini 版内部标识为 `v2.9-mini`。本仓库以 `v1.0.0` 作为统一的开源起点。
- 数据源为第三方公开采集接口，仅作技术演示，详见 README 免责声明。

[1.0.0]: https://github.com/silverbullet-liang/tvbox-center/releases/tag/v1.0.0
