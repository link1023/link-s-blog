<script setup lang="ts">
import { useBlogStore } from '@/stores/blog'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

const postId = computed(() => parseInt(route.params.id as string))
const post = computed(() => blogStore.getPostById(postId.value))

function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="blog-detail-container">
    <button class="back-button" @click="goBack">← 返回列表</button>

    <article v-if="post" class="post-detail">
      <header class="post-header">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <span class="post-category">{{ post.category }}</span>
          <span class="post-date">{{ post.date }}</span>
        </div>
      </header>

      <div class="post-content">
        <p v-for="(paragraph, index) in post.content.split('\n\n')" :key="index" class="paragraph">
          {{ paragraph }}
        </p>
      </div>
    </article>

    <div v-else class="not-found">
      <p>文章不存在</p>
    </div>
  </div>
</template>

<style scoped>
.blog-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.back-button {
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  color: #333;
  transition: all 0.3s;
  margin-bottom: 30px;
}

.back-button:hover {
  background-color: #e0e0e0;
  border-color: #ccc;
}

.post-detail {
  background-color: #fff;
}

.post-header {
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

.post-title {
  font-size: 2.5em;
  margin: 0 0 16px 0;
  color: #333;
  line-height: 1.3;
}

.post-meta {
  display: flex;
  gap: 16px;
  align-items: center;
  font-size: 0.95em;
  color: #666;
}

.post-meta span {
  margin-right: 16px;
}

.post-meta span:last-child {
  margin-right: 0;
}

.post-category {
  display: inline-block;
  padding: 4px 12px;
  background-color: #f0f0f0;
  color: #666;
  border-radius: 12px;
}

.post-date {
  color: #aaa;
}

.post-content {
  font-size: 1.1em;
  line-height: 1.8;
  color: #444;
}

.paragraph {
  margin: 0 0 20px 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.paragraph:last-child {
  margin-bottom: 0;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 1.2em;
}
</style>
