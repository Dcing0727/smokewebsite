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
      <div v-for="blog in blogs" :key="blog.blogId" class="blog-post">
        <div class="blog-cover">
          <img :src="blog.coverImage" alt="博客封面">
        </div>
        <div class="blog-content">
          <h2 class="blog-title">{{ blog.title }}</h2>
          <div class="blog-meta">
            <span>作者: {{ blog.userId }}</span>
            <span>发表时间: {{ formatDate(blog.createdAt) }}</span>
            <span>最后修改: {{ formatDate(blog.updatedAt) }}</span>
          </div>
          <p class="blog-summary">{{ blog.description }}</p>
          <button class="read-more-btn" @click="viewBlog(blog)">阅读更多</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      blogs: []
    };
  },
  mounted() {
    this.fetchBlogs();
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
      },
    fetchBlogs() {
      axios.get('http://localhost:3000/api/blogs')
        .then(response => {
          console.log(response.data);
          this.blogs = response.data.blogs;
        })
        .catch(error => {
          console.error('Error fetching blogs:', error);
        });
    },
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
