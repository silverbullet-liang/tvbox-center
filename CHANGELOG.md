# 更新日志

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/) 与 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 规范。

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
