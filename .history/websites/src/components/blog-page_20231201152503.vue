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
      
            margin: 0px;
            padding: 0px;
        } -->

    
<!-- </style> -->

<!--加入后端的接口-->
<!-- export default {
  data() {
    return {
      blogs: [],
      loading: false,
      error: null
    };
  },
  created() {
    this.fetchBlogs();
  },
  methods: {
    async fetchBlogs() {
      this.loading = true;
      try {
        // 假设有一个API调用来获取博客列表
        const response = await this.$http.get('/api/blogs');
        this.blogs = response.data;
      } catch (err) {
        this.error = err.toString();
      } finally {
        this.loading = false;
      }
    }
  }
}; -->

<template>
  <div class="blog-page">
    <h1 class="page-title">社区博客</h1>
    <div class="blog-list">
      <div v-for="blog in blogs" :key="blog.id" class="blog-post">
        <div class="blog-cover">
          <img :src="blog.cover" alt="博客封面">
        </div>
        <div class="blog-content">
          <h2 class="blog-title">{{ blog.title }}</h2>
          <div class="blog-meta">
            <span>作者: {{ blog.author }}</span>
            <span>发表时间: {{ blog.date }}</span>
            <span class="likes">点赞数: {{ blog.likes }}</span>
          </div>
          <p class="blog-summary">{{ blog.summary }}</p>
          <button class="read-more-btn" @click="viewBlog(blog)">阅读更多</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogs: [
        {
          id: 1,
          title: '博客文章 1',
          author: '作者 A',
          date: '2023-01-01',
          likes: 100,
          summary: '这是第一篇博客文章的简介...',
          cover: require('@/assets/o.jpg')
        },
        {
          id: 2,
          title: '博客文章 2',
          author: '作者 B',
          date: '2023-01-02',
          likes: 150,
          summary: '这是第二篇博客文章的简介...',
          cover: '@/assets/pro5.jpg'
        },
        {
          id: 3,
          title: '博客文章 3',
          author: '作者 C',
          date: '2023-01-03',
          likes: 151,
          summary: '这是第三篇博客文章的简介...',
          cover: '@/assets/pro5.jpg'
        },
        {
          id: 4,
          title: '博客文章 4',
          author: '作者 D',
          date: '2023-01-04',
          likes: 152,
          summary: '这是第四篇博客文章的简介...',
          cover: '@/assets/pro5.jpg'
        },
        {
          id: 5,
          title: '博客文章 5',
          author: '作者 E',
          date: '2023-01-05',
          likes: 153,
          summary: '这是第五篇博客文章的简介...',
          cover: '@/assets/pro5.jpg'
        },
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
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  background-image: url('@/assets/o.jpg');
  background-size: cover;
  background-position: center;
}

.page-title {
  text-align: center;
  color: #333;
}

.blog-list {
  margin-top: 20px;
}

.blog-post {
  display: flex;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  overflow: hidden;
}

.blog-cover img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.blog-content {
  padding: 15px;
  flex-grow: 1;
}

.blog-title {
  color: #2c3e50;
  margin-bottom: 5px;
}

.blog-meta {
  font-size: 0.9em;
  color: #606f7b;
  margin-bottom: 10px;
}

.blog-meta span {
  margin-right: 15px;
}

.blog-summary {
  color: #606f7b;
}

.read-more-btn {
  display: inline-block;
  padding: 8px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.read-more-btn:hover {
  background-color: #2980b9;
}

.likes {
  color: #e74c3c;
}
</style>
