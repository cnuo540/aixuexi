# AI分享 个人软件分享网站

这是一个纯静态 HTML/CSS/JS 网站，风格采用第 4 种“暖色个人分享风”。

## 页面
- `index.html`：首页
- `software.html`：AI 软件列表
- `tutorials.html`：教程文档
- `download.html`：下载须知 / 下载入口
- `about.html`：关于我

## 修改软件、密码、下载链接
打开：`assets/js/main.js`

在 `products` 数组中修改：
- `name`：软件名称
- `password`：查看下载链接所需密码
- `url`：真实下载地址
- `desc` / `steps`：使用说明
- `icon` / `preview`：图标和界面图路径

示例密码：
- 智能写作助手：`ai123`
- AI 绘图工具：`pic888`
- 办公自动化助手：`office66`
- 视频处理工具箱：`video99`
- 提示词管理器：`prompt5`
