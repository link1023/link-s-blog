<template>
  <div class="guestbook">
    <h2>留言板</h2>
    <p class="guestbook-intro">欢迎在这里留下您的足迹！所有留言实时同步。</p>

    <!-- 留言表单 -->
    <div class="message-form">
      <h3>发表留言</h3>
      <form @submit.prevent="submitMessage">
        <div class="form-group">
          <label for="name">昵称：</label>
          <input 
            type="text" 
            id="name" 
            v-model="newMessage.name" 
            placeholder="请输入您的昵称"
            required
            maxlength="50"
          />
        </div>
        <div class="form-group">
          <label for="content">留言内容：</label>
          <textarea 
            id="content" 
            v-model="newMessage.content" 
            placeholder="写下您想说的话..."
            required
            maxlength="1000"
            rows="4"
          ></textarea>
        </div>
        <button type="submit" class="submit-btn" :disabled="submitting">
          {{ submitting ? '提交中...' : '发表留言' }}
        </button>
      </form>
    </div>

    <!-- 留言列表 -->
    <div class="messages-list">
      <h3>全部留言 ({{ messages.length }})</h3>
      
      <div v-if="loading" class="loading">加载中...</div>
      
      <div v-else-if="error" class="error">
        {{ error }}
        <p class="error-hint">请检查 Supabase 配置是否正确</p>
      </div>
      
      <div v-else-if="messages.length === 0" class="no-messages">
        还没有留言，快来抢沙发吧！
      </div>
      
      <div v-else class="messages">
        <div 
          v-for="message in messages" 
          :key="message.id" 
          class="message-item"
        >
          <div class="message-header">
            <span class="message-author">{{ message.name }}</span>
            <span class="message-time">{{ formatTime(message.created_at) }}</span>
          </div>
          <div class="message-content">{{ message.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '../supabase'

export default {
  name: 'Guestbook',
  data() {
    return {
      newMessage: {
        name: '',
        content: ''
      },
      messages: [],
      loading: true,
      submitting: false,
      error: null
    }
  },
  mounted() {
    this.loadMessages()
    this.subscribeToMessages()
  },
  methods: {
    async loadMessages() {
      this.loading = true
      this.error = null
      
      try {
        const { data, error } = await supabase
          .from('guestbook')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) throw error
        
        this.messages = data || []
      } catch (err) {
        console.error('加载留言失败:', err)
        this.error = '加载留言失败，请稍后重试'
      } finally {
        this.loading = false
      }
    },
    
    subscribeToMessages() {
      // 实时监听新留言
      const channel = supabase
        .channel('guestbook_changes')
        .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'guestbook' },
          (payload) => {
            // 只有当新留言不在列表中时才添加（避免因为乐观更新导致的重复）
            if (!this.messages.some(m => m.id === payload.new.id)) {
              this.messages.unshift(payload.new)
            }
          }
        )
        .subscribe((status) => {
          console.log('Realtime subscription status:', status)
        })
    },
    
    async submitMessage() {
      if (!this.newMessage.name.trim() || !this.newMessage.content.trim()) {
        return
      }
      
      this.submitting = true
      
      try {
        const { data, error } = await supabase
          .from('guestbook')
          .insert([
            {
              name: this.newMessage.name.trim(),
              content: this.newMessage.content.trim()
            }
          ])
          .select() // 获取插入后的数据，包含 id 和 created_at
        
        if (error) throw error
        
        // 乐观更新：直接将返回的新留言添加到列表
        if (data && data.length > 0) {
          const newMsg = data[0]
          // 检查是否已经存在（通过 realtime 可能已经添加了）
          if (!this.messages.some(m => m.id === newMsg.id)) {
            this.messages.unshift(newMsg)
          }
        }
        
        // 清空表单
        this.newMessage.name = ''
        this.newMessage.content = ''
        
        // 可选：显示成功提示，或者直接让用户看到新留言出现
        // alert('留言发表成功！') 
      } catch (error) {
        console.error('发表留言失败:', error)
        alert('发表留言失败，请稍后重试')
      } finally {
        this.submitting = false
      }
    },
    
    formatTime(timestamp) {
      if (!timestamp) return '刚刚'
      
      const date = new Date(timestamp)
      const now = new Date()
      const diff = now - date
      
      // 小于1分钟
      if (diff < 60000) return '刚刚'
      // 小于1小时
      if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
      // 小于1天
      if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
      // 小于7天
      if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`
      
      // 超过7天显示具体日期
      return date.toLocaleDateString('zh-CN')
    }
  }
}
</script>

<style scoped>
.guestbook {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
}

.guestbook h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--text-main);
}

.guestbook-intro {
  color: var(--muted);
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.message-form {
  background: var(--card);
  padding: 1.5rem;
  border-radius: var(--radius);
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.message-form h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-main);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  background: var(--surface);
  color: var(--text-main);
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-btn {
  background: var(--accent);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.messages-list h3 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.loading,
.no-messages {
  text-align: center;
  padding: 3rem;
  color: var(--muted);
}

.error {
  text-align: center;
  padding: 3rem;
  color: #e74c3c;
}

.error-hint {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--muted);
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message-item {
  background: var(--card);
  padding: 1.25rem;
  border-radius: var(--radius);
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border);
}

.message-author {
  font-weight: 600;
  color: var(--accent);
}

.message-time {
  font-size: 0.875rem;
  color: var(--muted);
}

.message-content {
  color: var(--text-main);
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
