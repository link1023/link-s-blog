import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  category: string
}

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<BlogPost[]>([
    {
      id: 1,
      title: 'Vue 3 入门指南',
      excerpt: '学习 Vue 3 的最佳实践和新特性',
      content: `Vue 3 是一个强大的 JavaScript 框架，提供了更好的性能和开发体验。

主要特点：
- 更快的响应式系统
- 更好的 TypeScript 支持
- 组合式 API
- 更小的包体积

通过学习 Vue 3，你可以构建高效的用户界面和单页应用程序。`,
      date: '2025-12-10',
      category: 'Vue',
    },
    {
      id: 2,
      title: 'TypeScript 基础知识',
      excerpt: 'TypeScript 如何提升代码质量和开发效率',
      content: `TypeScript 是 JavaScript 的超集，提供了静态类型检查的能力。

好处：
- 提前发现错误
- 改进代码提示
- 更易于重构
- 更好的代码文档化

掌握 TypeScript 将让你成为更高效的开发者。`,
      date: '2025-12-08',
      category: 'TypeScript',
    },
    {
      id: 3,
      title: 'Web 开发最佳实践',
      excerpt: '编写可维护和高性能的前端代码',
      content: `编写高质量的 Web 代码需要遵循最佳实践：

1. 代码组织
   - 模块化设计
   - 清晰的文件结构
   
2. 性能优化
   - 代码分割
   - 懒加载
   - 缓存策略

3. 测试和质量保证
   - 单元测试
   - 集成测试
   - 代码审查

通过遵循这些实践，可以创建更加稳定和可维护的应用程序。`,
      date: '2025-12-05',
      category: '最佳实践',
    },
  ])

  function getPostById(id: number) {
    return posts.value.find((post) => post.id === id)
  }

  function getAllPosts() {
    return posts.value
  }

  function addPost(post: Omit<BlogPost, 'id'>) {
    const newPost: BlogPost = {
      id: Math.max(...posts.value.map((p) => p.id), 0) + 1,
      ...post,
    }
    posts.value.unshift(newPost)
    return newPost
  }

  return {
    posts,
    getPostById,
    getAllPosts,
    addPost,
  }
})
