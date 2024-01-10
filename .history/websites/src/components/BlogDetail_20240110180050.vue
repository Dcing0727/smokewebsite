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
        // 发送请求获取博客详情
        // 示例：axios.get(`/api/blog/${blogId}`).then(response => { ... })
      }
    }
  };
  </script>
  
  <style scoped>
  /* 添加样式 */
  </style>
  