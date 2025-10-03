# 🍌 香蕉超市

香蕉超市 (Nano Bananary) 是一个功能强大且充满乐趣的Web应用程序，它利用 Google Gemini API 来执行各种富有创意的图像编辑和生成任务。您可以上传一张图片，从超过50种独特效果中进行选择，或者编写您自己的提示语，以令人惊叹的方式变换您的照片。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnb-apps%2Fnano-bananary)  [视频教程](https://www.bilibili.com/video/BV1UuHGzHEbb/) [交流群](https://cnb.cool/fuliai/comfyui/-/issues/11)


【[免部署直接用nb1.kuai.host](https://nb1.kuai.host/)】【[免部署直接用nb.kuai.host](https://nb.kuai.host/)】

暴改自 ZHO 大佬的项目 Nano Bananary ，增加了一些模板及支持Vercel一键部署。
---

## ✨ 主要功能

- **📸 70+ 创意模板：** 一个庞大的一键式效果库，从将照片变成3D手办、钩针娃娃，到应用像素艺术、水彩和赛博朋克等艺术风格。
- **✍️ 自定义提示：** 支持完整的文生图和图生图功能。您可以描述任何能想象到的变化，并选择性地上传参考图像用于风格或内容借鉴。您的创造力是唯一的限制！
- **🎨 高级编辑工具：**
  - **蒙版编辑：** 在图像上绘制蒙版，将编辑效果应用于特定区域。
  - **多图支持：** 使用多张图片实现复杂效果，如姿势/表情迁移或色彩方案替换。
- **🖼️ 交互式结果查看器：** 使用交互式滑块、并排视图或网格视图来比较原始图像和生成图像。
- **⚙️ 自定义API和水印设置：**
  - 使用您自己的 Gemini API 密钥和自定义 API 基础 URL（用于代理）。
  - 为所有生成的图像添加自定义的可见水印。
- **🌍 多语言和主题：**
  - 完全支持英语和中文（中文）。
  - 拥有流畅、响应式的界面，并提供浅色和深色两种主题。
- **🚀 一键部署：** 轻松将您自己的应用实例部署到 Vercel。

## 🚀 快速开始和本地开发

要在您的本地计算机上运行此项目，请按照以下简单步骤操作。

### 环境要求

- [Node.js](https://nodejs.org/) (LTS version)
- [npm](https://www.npmjs.com/) 或 [yarn](https://yarnpkg.com/)
- 一款现代的网页浏览器

### 安装与运行

1.  **克隆仓库**
    ```bash
    git clone https://github.com/nb-apps/nano-bananary.git
    或
    git clone https://cnb.cool/fuliai/nano_bananary
    
    cd nano-bananary
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **启动开发服务器**
    ```bash
    npm run dev
    ```
    这会启动一个本地开发服务器。然后，您可以在浏览器中打开提供的 URL (例如, `http://localhost:5173`)。

4.  **添加您的 API 密钥**
    应用运行后，点击头部的 **设置** (⚙️) 图标，添加您的 Google Gemini API 密钥。该密钥会安全地存储在您浏览器的 `localStorage` 中。

## 🚀 使用 Vercel 一键部署

您只需单击一下，就可以将您自己的香蕉超市版本部署到 Vercel。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnb-apps%2Fnano-bananary)


在 Vercel 设置过程中，系统会提示您输入 `VITE_API_KEY` 和 `VITE_BASE_URL` (可选)。这些将作为环境变量配置在您的 Vercel 应用中。部署后的应用会优先使用您在应用内设置面板中配置的 API 信息，如果未配置，则会使用这些环境变量作为备用。

## 🛠️ 技术栈

- **构建工具:** Vite
- **前端:** React, TypeScript
- **AI 模型:** Google Gemini API (`@google/genai`)
- **样式:** Tailwind CSS (通过 CDN)
- **国际化 (i18n):** 使用 React Context 的自定义实现

## 📄 许可证

本项目是开源的，根据 [MIT 许可证](LICENSE) 提供。
