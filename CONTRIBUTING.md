# 贡献指南

感谢你愿意为本项目贡献代码或建议。

## 提交 Issue

- 使用 [Bug 报告](.github/ISSUE_TEMPLATE/bug_report.md) 或 [功能建议](.github/ISSUE_TEMPLATE/feature_request.md) 模板。
- 尽量具体：复现步骤、浏览器与版本、期望结果与实际结果。
- **不要**在 Issue 中粘贴影视内容或侵权链接。

## 提交 Pull Request

1. Fork 本仓库并新建分支，例如 `fix/search-timeout`。
2. 保持**单文件、零构建**：不引入打包器、不拆分模块、不新增运行时依赖（确有必要时请先开 Issue 讨论）。
3. 遵循现有设计语言（Material Design 3 令牌）。
4. 修改后在目标浏览器中实测（Chrome / Safari），确认搜索、播放、选集等主路径可用。
5. 在 PR 描述中说明改动目的、影响范围与测试方式。

## 代码约定

- 编码 UTF-8；缩进与换行见 [.editorconfig](.editorconfig)。
- CSS / JS 内联，确保文件仍可直接双击运行。
- 命名语义化，仅在关键处写注释。
- 界面不使用 emoji 作为图标，统一使用 Iconify（lucide）图标。

## 提交信息

采用约定式风格，示例：

```
fix: 修复搜索在 file:// 下跨域失败
feat(pro): 新增片尾跳过秒数设置
docs: 更新免责声明
```

## 许可

你的贡献将以本项目的 `AGPL-3.0-or-later` 许可发布。
