<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <RouterLink to="/" class="logo">我好饿啊这里随便写了</RouterLink>
      <div class="nav-links">
        <RouterLink to="/">首页</RouterLink>
      </div>
    </div>
  </nav>

  <main class="main-content">
    <RouterView />
  </main>

  <footer class="footer">
    <p>&copy; 2025 My Blog. All rights reserved.</p>
  </footer>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.navbar {
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5em;
  font-weight: 700;
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
}

.logo:hover {
  color: #0066cc;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-links a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s;
  font-weight: 500;
  margin-left: 24px;
}

.nav-links a:first-child {
  margin-left: 0;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #0066cc;
}

.main-content {
  min-height: calc(100vh - 200px);
  background-color: #fafafa;
}

.footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 30px 20px;
  margin-top: 50px;
}

.footer p {
  margin: 0;
  font-size: 0.9em;
  color: #ccc;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
  line-height: 1.6;
}
</style>
