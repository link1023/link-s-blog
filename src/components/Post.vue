<template>
  <article class="post">
    <h4 class="post-title">{{ post.title }}</h4>
    <p class="post-excerpt">{{ post.excerpt }}</p>
    <router-link class="read-more" :to="'/post/' + post.id">阅读更多 →</router-link>
  </article>
</template>

<script>
export default {
  name: 'Post',
  props: { post: { type: Object, required: true } }
}
</script>

<style scoped>
.post{background:var(--card);padding:18px;border-radius:var(--radius);box-shadow:0 6px 18px rgba(16,24,40,0.06)}
.post-title{margin:0 0 8px;font-size:16px}
.post-excerpt{margin:0 0 12px;color:var(--muted);font-size:14px}
.read-more{color:var(--accent);text-decoration:none;font-weight:600}
</style>
