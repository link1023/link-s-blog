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

    <div class="main-layout container">
      <!-- 左侧导航栏 -->
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <router-link to="/" class="sidebar-link" exact-active-class="active">
            <span class="icon">🏠</span>
            <span class="text">首页</span>
          </router-link>
          <router-link to="/guestbook" class="sidebar-link" active-class="active">
            <span class="icon">💬</span>
            <span class="text">留言板</span>
          </router-link>
        </nav>
      </aside>

      <!-- 主内容区域 -->
      <main class="main-content">
        <router-view></router-view>
      </main>
    </div>

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
.main-layout {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  min-height: calc(100vh - 200px);
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.sidebar {
  flex-shrink: 0;
  width: 200px;
  position: sticky;
  top: 100px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: var(--radius);
  text-decoration: none;
  color: var(--text-main);
  font-weight: 500;
  transition: all 0.2s;
  background: var(--card);
}

.sidebar-link:hover {
  background: var(--surface);
  transform: translateX(4px);
}

.sidebar-link.active {
  background: var(--accent);
  color: white;
}

.sidebar-link .icon {
  font-size: 1.25rem;
}

.sidebar-link .text {
  font-size: 0.95rem;
}

.main-content {
  flex: 1;
  min-width: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-layout {
    flex-direction: column;
    gap: 1rem;
  }
  
  .sidebar {
    width: 100%;
    position: static;
  }
  
  .sidebar-nav {
    flex-direction: row;
    overflow-x: auto;
  }
  
  .sidebar-link {
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.75rem;
    min-width: 80px;
    text-align: center;
  }
  
  .sidebar-link .icon {
    font-size: 1.5rem;
  }
  
  .sidebar-link .text {
    font-size: 0.8rem;
  }
}
</style>
