<template>
    <div class="blog-detail-page">
      <h1>{{ blog.title }}</h1>
      <img :src="blog.coverImage" alt="博客封面" class="blog-cover">
      <p>{{ blog.description }}</p>
      <div class="blog-content">
        {{ blog.content }}
      </div>
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
        }
      };
    },
    created() {
      this.fetchBlogDetail();
    },
    methods: {
        fetchBlogDetail() {
              const blogId = this.$route.params.blogId;
              axios.get(`http://localhost:3000/api/blog/${blogId}`)
                  .then(response => {
                      this.blog = response.data;
                  })
                  .catch(error => {
                      console.error('Error fetching blog details:', error);
                  });
          }
    }
  };
  </script>
  
  <style scoped>
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
  </style>
  