<!-- <template>
<div>
  <div class="box">
    <h1>博客页面</h1>
    <h2>欢迎来到博客页面</h2>
    <p>本功能将在后续进行开发</p>
  </div>
  <Footer></Footer>
</div>


 
</template>
<script>
    import Footer from './page-footer.vue'
    export default {
       name: "blog-page", 
       components:{
            Footer,
       }
   };

</script>

<style scoped>
    .box{
        
        position: relative;
        margin: 5px;
        top: 250px;
        left: 250px;
        color: black;
    }
      *{
            margin: 0px;
            padding: 0px;
        } -->

    
<!-- </style> -->

<template>
  <div class="blog-page">
    <h1 class="page-title">社区博客</h1>
    <div class="blog-list">
      <div v-for="blog in blogs" :key="blog.id" class="blog-post">
        <h2 class="blog-title">{{ blog.title }}</h2>
        <p class="blog-summary">{{ blog.summary }}</p>
        <button class="read-more-btn" @click="viewBlog(blog)">阅读更多</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogs: [
        { id: 1, title: '博客文章 1', summary: '这是第一篇博客文章的简介...' },
        { id: 2, title: '博客文章 2', summary: '这是第二篇博客文章的简介...' },
        // ...其他博客文章
      ]
    };
  },
  methods: {
    viewBlog(blog) {
      alert('查看博客：' + blog.title);
    }
  }
};
</script>

<style>
.blog-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.page-title {
  text-align: center;
  color: #333;
}

.blog-list {
  margin-top: 20px;
}

.blog-post {
  padding: 15px;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.blog-title {
  color: #2c3e50;
  margin-bottom: 10px;
}

.blog-summary {
  color: #606f7b;
}

.read-more-btn {
  display: inline-block;
  padding: 8px 15px;
  margin-top: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.read-more-btn:hover {
  background-color: #2980b9;
}
</style>
