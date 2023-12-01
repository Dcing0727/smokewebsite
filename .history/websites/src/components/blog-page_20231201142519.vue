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
    <h1>社区博客</h1>
    <div v-for="blog in blogs" :key="blog.id" class="blog-post">
      <h2>{{ blog.title }}</h2>
      <p>{{ blog.summary }}</p>
      <!-- 假设点击链接可以查看更多，但实际上不会进行页面跳转 -->
      <a href="#" @click="viewBlog(blog)">阅读更多</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 模拟博客数据
      blogs: [
        { id: 1, title: '博客文章 1', summary: '这是第一篇博客文章的简介...' },
        { id: 2, title: '博客文章 2', summary: '这是第二篇博客文章的简介...' },
        // ...更多博客文章
      ]
    };
  },
  methods: {
    viewBlog(blog) {
      alert('查看博客：' + blog.title);
      // 实际项目中，这里可以是跳转到博客详细页面的逻辑
    }
  }
};
</script>

<style>
.blog-page {
  margin: 20px;
}

.blog-post {
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}
</style>
