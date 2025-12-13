<script setup lang="ts">
import { useBlogStore } from '@/stores/blog'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const blogStore = useBlogStore()
const router = useRouter()

const allPosts = computed(() => blogStore.getAllPosts())

function goToDetail(postId: number) {
  router.push(`/blog/${postId}`)
}
</script>

<template>
  <div class="blog-list-container">
    <div class="header">
      <h1>裴青的主页</h1>
      <p class="subtitle">这是一行字</p>
    </div>

    <div class="posts-grid">
      <article v-for="post in allPosts" :key="post.id" class="post-card" @click="goToDetail(post.id)">
        <div class="post-header">
          <h2 class="post-title">{{ post.title }}</h2>
          <span class="post-category">{{ post.category }}</span>
        </div>
        <p class="post-excerpt">{{ post.excerpt }}</p>
        <div class="post-footer">
          <span class="post-date">{{ post.date }}</span>
          <span class="read-more">阅读全文 →</span>
        </div>
      </article>
    </div>

    <div v-if="allPosts.length === 0" class="empty-state">
      <p>暂无文章</p>
    </div>
  </div>
</template>

<style scoped>
.blog-list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.header {
  text-align: center;
  margin-bottom: 50px;
}

.header h1 {
  font-size: 3em;
  margin: 0 0 10px 0;
  color: #333;
  font-weight: 700;
}

.subtitle {
  font-size: 1.2em;
  color: #666;
  margin: 0;
}

.posts-grid {
  display: grid;
  gap: 24px;
  margin-bottom: 40px;
}

.post-card {
  padding: 24px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #fff;
  margin-bottom: 24px;
}

.post-card:last-child {
  margin-bottom: 0;
}

.post-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
  border-color: #d0d0d0;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
}

.post-category {
  display: inline-block;
  padding: 4px 12px;
  background-color: #f0f0f0;
  color: #666;
  border-radius: 12px;
  font-size: 0.85em;
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: 16px;
}

.post-excerpt {
  margin: 0 0 16px 0;
  color: #666;
  line-height: 1.6;
  font-size: 1em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
  font-size: 0.9em;
}

.post-date {
  color: #aaa;
}

.read-more {
  color: #0066cc;
  font-weight: 500;
  transition: color 0.3s;
}

.post-card:hover .read-more {
  color: #004499;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 1.2em;
}
</style>
