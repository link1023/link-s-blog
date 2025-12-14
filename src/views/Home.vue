<template>
  <div>
    <section class="hero">
      <h2>{{ hero.title }}</h2>
      <p>{{ hero.subtitle }}</p>
    </section>

    <section class="posts" aria-label="最新文章">
      <h3>最新文章</h3>
      <div class="posts-grid">
        <Post v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </section>

    <section id="about" class="about">
      <h3>关于我</h3>
      <p>{{ about }}</p>
    </section>

    <section id="contact" class="contact">
      <h3>联系我</h3>
      <p>邮箱：{{ contact.email }}</p>
    </section>
  </div>
</template>

<script>
import Post from '../components/Post.vue'
import { posts } from '../data/posts.js'

export default {
  name: 'Home',
  components: { Post },
  data() {
    return {
      hero: { title: '你好，我是裴青', subtitle: '这是一个前端学习记录' },
      posts: posts,
      about: '我是一名前端学习者，这里是我的学习记录。',
      contact: { email: 'link@example.com' }
    }
  }
}
</script>
