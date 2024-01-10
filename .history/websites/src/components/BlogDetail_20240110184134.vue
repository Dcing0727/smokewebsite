<template>
    <div class="blog-detail-layout">
      <aside class="left-card">
        <!-- 作者个人介绍 -->
        <div class="author-info">
          <h3>{{ blog.user.account }}</h3>
          <p>昵称: {{ author.nickname }}</p>
          <p>年龄: {{ author.age }}</p>
          <!-- 其他个人信息 -->
        </div>
      </aside>
      <article class="main-card">
        <!-- 博客主要内容 -->
        <h1>{{ blog.title }}</h1>
        <p class="blog-time">创建时间: {{ formatDate(blog.createdAt) }}</p>
        <p class="blog-description">{{ blog.description }}</p>
        <div class="blog-content">{{ blog.content }}</div>
      </article>
      <aside class="right-card">
        <!-- 作者的其他博客 -->
        <div class="other-blogs">
          <h3>其他博客</h3>
          <ul>
            <li v-for="otherBlog in authorBlogs" :key="otherBlog.id">
              <a :href="`/blog/${otherBlog.id}`">{{ otherBlog.title }}</a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        blog: {
          title: '',
          description: '',
          content: '',
          coverImage: ''
        },
        author: {/* ... */},
        authorBlogs: [/* ... */]
      };
    },
    created() {
      this.fetchBlogDetail();
      this.fetchAuthorInfo();
      this.fetchAuthorBlogs();
    },
    methods: {
        formatDate(dateString) {
              const date = new Date(dateString);
              return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
          },
          fetchBlogDetail() {
              const blogId = this.$route.params.blogId;
              axios.get(`http://localhost:3000/api/blog/${blogId}`)
                  .then(response => {
                      this.blog = response.data;
                  })
                  .catch(error => {
                      console.error('Error fetching blog details:', error);
                  });
          },
          fetchAuthorInfo() {
              // 假设 authorId 是已知的或者从路由参数中获取
              const userId = this.blog.userId; // 或者 this.$route.params.authorId
              axios.get(`http://localhost:3000/api/id/${userId}`)
                  .then(response => {
                      this.author = response.data;
                  })
                  .catch(error => {
                      console.error('Error fetching author info:', error);
                  });
          },

          fetchAuthorBlogs() {
              // 同样，假设 authorId 是已知的或者从路由参数中获取
              const userId = this.blog.userId; // 或者 this.$route.params.authorId
              axios.get(`http://localhost:3000/api/user/user-blogs/${userId}`)
                  .then(response => {
                      this.authorBlogs = response.data.blogs;
                  })
                  .catch(error => {
                      console.error('Error fetching author blogs:', error);
                  });
          }
    }
  };
  </script>
  
  <!-- <style scoped>
  /* 添加样式 */
  .blog-detail-page {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
  background-color: #fff;
}

.blog-cover {
  width: 100%;
  border-radius: 8px 8px 0 0;
  object-fit: cover;
}

.blog-content {
  padding: 1rem;
}
h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
}
  </style> -->
  <style scoped>
  .blog-detail-layout {
    display: flex;
    justify-content: space-between;
    margin: 20px;
  }
  
  .left-card,
  .right-card {
    flex: 1;
    margin: 10px;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;
  }
  
  .main-card {
    flex: 3;
    margin: 10px;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .author-info h3,
  .other-blogs h3 {
    margin-bottom: 10px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  ul li a {
    text-decoration: none;
    color: #333;
    transition: color 0.3s;
  }
  
  ul li a:hover {
    color: #007bff;
  }
  
  .blog-time {
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 10px;
  }
  
  .blog-description {
    font-size: 1rem;
    color: #666;
    margin-bottom: 20px;
  }
  
  .blog-content {
    font-size: 1.1rem;
    color: #444;
  }
  </style>
   