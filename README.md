# Link 的个人博客（示例）

这是一个非常简单的静态个人博客示例，已迁移为使用 Vite + Vue 3（SFC）以便开发与构建。

包含文件：`index.html`、`package.json`、`vite.config.js`、`src/`（包含 `App.vue`、`components/Post.vue`、`main.js`、`styles.css`）。

快速开始（需安装 Node.js 与 npm/yarn/pnpm）

```bash
# 安装依赖
npm install

# 开发服务器（热重载）
npm run dev

# 构建生产包
npm run build

# 本地预览构建产物
npm run preview
```

说明
- 使用 Vite 方便热开发与单文件组件。组件代码位于 `src/components`。
- 主题切换保存在 `localStorage`，并通过根元素 `class` 控制深色主题样式。

下一步建议
- 添加路由（`vue-router`）并为每篇文章使用独立路由与 Markdown 渲染（`vite-plugin-md` 或 `markdown-it`）。
- 若想部署：推荐使用 Vercel、Netlify 或 GitHub Pages（配合 `gh-pages`）。
