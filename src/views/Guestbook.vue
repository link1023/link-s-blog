<template>
  <div class="guestbook">
    <h2>留言板</h2>
    <p class="guestbook-intro">欢迎在这里留下您的足迹！留言将作为 GitHub Issue 保存。</p>

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
      error: null,
      // GitHub 仓库信息
      owner: 'link1023',
      repo: 'link-s-blog',
      label: 'guestbook' // 用于标记留言的 label
    }
  },
  mounted() {
    this.loadMessages();
  },
  methods: {
    async loadMessages() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch(
          `https://api.github.com/repos/${this.owner}/${this.repo}/issues?labels=${this.label}&state=open&sort=created&direction=desc`
        );
        
        if (!response.ok) {
          throw new Error('加载留言失败');
        }
        
        const issues = await response.json();
        
        // 解析 issues 为留言格式
        this.messages = issues.map(issue => {
          // 从 issue body 中提取昵称和内容
          const lines = issue.body.split('\n');
          const name = lines[0]?.replace('**昵称：**', '').trim() || '匿名';
          const content = lines.slice(2).join('\n').trim();
          
          return {
            id: issue.number,
            name: name,
            content: content,
            created_at: issue.created_at
          };
        });
      } catch (err) {
        console.error('加载留言失败:', err);
        this.error = '加载留言失败，请稍后重试';
      } finally {
        this.loading = false;
      }
    },
    
    async submitMessage() {
      if (!this.newMessage.name.trim() || !this.newMessage.content.trim()) {
        return;
      }
      
      this.submitting = true;
      
      try {
        // 构建 issue body
        const body = `**昵称：**${this.newMessage.name.trim()}\n\n${this.newMessage.content.trim()}`;
        
        const response = await fetch(
          `https://api.github.com/repos/${this.owner}/${this.repo}/issues`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: `留言 - ${this.newMessage.name.trim()}`,
              body: body,
              labels: [this.label]
            })
          }
        );
        
        if (!response.ok) {
          // GitHub API 对于未认证用户有限制
          throw new Error('发表留言失败，请稍后重试');
        }
        
        // 清空表单
        this.newMessage.name = '';
        this.newMessage.content = '';
        
        alert('留言发表成功！');
        
        // 重新加载留言列表
        this.loadMessages();
      } catch (error) {
        console.error('发表留言失败:', error);
        alert('发表留言失败。由于 GitHub API 限制，请访问以下链接手动创建留言：\n\nhttps://github.com/' + this.owner + '/' + this.repo + '/issues/new?labels=' + this.label + '&title=留言 - ' + encodeURIComponent(this.newMessage.name));
      } finally {
        this.submitting = false;
      }
    },
    
    formatTime(timestamp) {
      if (!timestamp) return '刚刚';
      
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now - date;
      
      // 小于1分钟
      if (diff < 60000) return '刚刚';
      // 小于1小时
      if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
      // 小于1天
      if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
      // 小于7天
      if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`;
      
      // 超过7天显示具体日期
      return date.toLocaleDateString('zh-CN');
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
.no-messages,
.error {
  text-align: center;
  padding: 3rem;
  color: var(--muted);
}

.error {
  color: #e74c3c;
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
