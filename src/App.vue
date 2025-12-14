<template>
  <div>
    <header class="site-header">
      <div class="container header-inner">
        <h1 class="site-title">{{ siteTitle }}</h1>
        <nav class="nav">
          <router-link to="/">首页</router-link>
          <a href="/#about">关于</a>
          <a href="/#contact">联系</a>
        </nav>
        <button id="theme-toggle" @click="toggleTheme" :aria-label="themeLabel">{{ themeIcon }}</button>
      </div>
    </header>

    <main class="container">
      <router-view></router-view>
    </main>

    <footer class="site-footer">
      <div class="container">
        <p>© {{ new Date().getFullYear() }} 裴青。欢迎转载，请注明出处。</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      siteTitle: '裴青的博客',
      dark: false,
    }
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
}
</script>

<style scoped>
/* small scoped adjustments if needed */
</style>
