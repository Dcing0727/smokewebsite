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
    padding: 20px;
  }

  .blog-cover {
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
  }

  .blog-content {
    margin-top: 20px;
  }
  </style>
  