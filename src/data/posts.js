export const posts = [
    {
        id: 1,
        title: '快速开始：如何搭建第一个博客',
        excerpt: '教你一步步搭建一个简单的静态博客，适合初学者。',
        content: `
      <p>搭建博客是学习前端开发的第一步。你可以使用 Vue.js, React, 或者简单的 HTML/CSS。</p>
      <h3>1. 准备工作</h3>
      <p>确保你安装了 Node.js 和编辑器（如 VS Code）。</p>
      <h3>2. 初始化项目</h3>
      <p>使用 Vite 快速创建 Vue 项目：<code>npm create vite@latest my-blog -- --template vue</code></p>
      <h3>3. 编写代码</h3>
      <p>修改 App.vue，添加你的个人信息和文章列表。</p>
      <h3>4. 部署</h3>
      <p>你可以使用 GitHub Pages 或 Vercel 免费部署你的网站。</p>
    `,
        date: '2023-10-01'
    },
    {
        id: 2,
        title: '学习笔记：JavaScript 常见陷阱',
        excerpt: '整理了一些容易踩坑的点，帮助你写出更健壮的代码。',
        content: `
      <p>JavaScript 是一门灵活的语言，但也容易出错。</p>
      <h3>1. 变量提升</h3>
      <p>使用 let 和 const 代替 var 可以避免变量提升带来的困扰。</p>
      <h3>2. 等号比较</h3>
      <p>始终使用 <code>===</code> 而不是 <code>==</code>，避免类型转换带来的意外结果。</p>
      <h3>3. 闭包</h3>
      <p>理解闭包对于处理异步操作和私有变量至关重要。</p>
    `,
        date: '2023-10-15'
    },
    {
        id: 3,
        title: '工具与效率：我的开发环境',
        excerpt: '分享常用工具、快捷配置以及提升效率的小技巧。',
        content: `
      <p>工欲善其事，必先利其器。</p>
      <h3>1. VS Code 插件</h3>
      <p>推荐安装 Eslint, Prettier, Volar 等插件。</p>
      <h3>2. 终端工具</h3>
      <p>使用 iTerm2 (Mac) 或 Windows Terminal，搭配 Oh My Zsh。</p>
      <h3>3. Chrome 开发者工具</h3>
      <p>熟练使用 Console, Network, Elements 面板。</p>
    `,
        date: '2023-10-20'
    }
];
