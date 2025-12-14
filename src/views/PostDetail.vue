<template>
  <article class="post-detail" v-if="post">
    <header class="post-header">
      <h1>{{ post.title }}</h1>
      <div class="post-meta">
        <span class="date">{{ post.date }}</span>
      </div>
    </header>
    <div class="post-content" v-html="post.content"></div>
    <div class="post-footer">
      <router-link to="/" class="back-link">← 返回首页</router-link>
    </div>
  </article>
  <div v-else class="not-found">
    <h2>文章未找到</h2>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script>
import { posts } from '../data/posts.js'

export default {
  name: 'PostDetail',
  data() {
    return {
      post: null
    }
  },
  created() {
    const id = parseInt(this.$route.params.id);
    this.post = posts.find(p => p.id === id);
  }
}
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
  animation: fadeIn 0.5s ease;
}

.post-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 1rem;
}

.post-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-main);
}

.post-meta {
  color: var(--muted);
  font-size: 0.9rem;
}

.post-content {
  line-height: 1.8;
  font-size: 1.1rem;
  color: var(--text-main);
}

.post-content :deep(h3) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.post-content :deep(p) {
  margin-bottom: 1.5rem;
}

.post-content :deep(code) {
  background: var(--surface);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
}

.post-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
  transition: transform 0.2s;
}

.back-link:hover {
  transform: translateX(-5px);
}

.not-found {
  text-align: center;
  padding: 4rem 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
