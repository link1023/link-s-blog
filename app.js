// Vue 3 app (使用全局构建)
(function(){
  const { createApp } = Vue;

  createApp({
    data(){
      return {
        siteTitle: 'Link 的博客',
        hero: { title: '你好，我是 Link', subtitle: '欢迎来到我的小天地，我会在这里记录学习笔记、项目与生活点滴。' },
        posts: [
          { id: 1, title: '快速开始：如何搭建第一个博客', excerpt: '教你一步步搭建一个简单的静态博客，适合初学者。', url: '#' },
          { id: 2, title: '学习笔记：JavaScript 常见陷阱', excerpt: '整理了一些容易踩坑的点，帮助你写出更健壮的代码。', url: '#' },
          { id: 3, title: '工具与效率：我的开发环境', excerpt: '分享常用工具、快捷配置以及提升效率的小技巧。', url: '#' }
        ],
        about: '我是一名前端学习者，喜欢折腾工具与写小工具来提升日常效率。这里是我的学习记录。',
        contact: { email: 'link@example.com' },
        dark: false,
      };
    },
    computed: {
      themeIcon(){ return this.dark ? '☀️' : '🌙' },
      themeLabel(){ return this.dark ? '切换到浅色主题' : '切换到深色主题' }
    },
    mounted(){
      try{
        const saved = localStorage.getItem('link_blog_theme_dark');
        if(saved === '1'){ this.dark = true; document.documentElement.classList.add('dark'); }
      }catch(e){}
    },
    methods: {
      toggleTheme(){
        this.dark = !this.dark;
        if(this.dark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        try{ localStorage.setItem('link_blog_theme_dark', this.dark ? '1' : '0'); }catch(e){}
      }
    }
  }).mount('#app');
})();
