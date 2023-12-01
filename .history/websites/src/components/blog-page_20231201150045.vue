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
          cover: 'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E9%A3%8E%E6%99%AF%E5%9B%BE%E7%89%87&step_word=&hs=0&pn=2&spn=0&di=7264239678495129601&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=-1&cs=4162644376%2C272796753&os=1577119026%2C2406740422&simid=4162644376%2C272796753&adpicid=0&lpn=0&ln=1963&fr=&fmq=1701413978894_R&fm=result&ic=&s=undefined&hd=&latest=&copyright=&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F512%2F0306121S615%2F1203061S615-16-1200.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B33da_z%26e3Bv54AzdH3FkzAzdH3Fz6u2AzdH3Fu2i3AzdH3F9caa_80_z%26e3Bip4s&gsm=1e&rpstart=0&rpnum=0&islist=&querylist=&nojc=undefined&dyTabStr=MCwyLDMsMSw0LDYsNSw4LDcsOQ%3D%3D&lid=8764171842572711941'
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
  background-image: url('https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E9%A3%8E%E6%99%AF%E5%9B%BE%E7%89%87&step_word=&hs=0&pn=2&spn=0&di=7264239678495129601&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=-1&cs=4162644376%2C272796753&os=1577119026%2C2406740422&simid=4162644376%2C272796753&adpicid=0&lpn=0&ln=1963&fr=&fmq=1701413978894_R&fm=result&ic=&s=undefined&hd=&latest=&copyright=&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F512%2F0306121S615%2F1203061S615-16-1200.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B33da_z%26e3Bv54AzdH3FkzAzdH3Fz6u2AzdH3Fu2i3AzdH3F9caa_80_z%26e3Bip4s&gsm=1e&rpstart=0&rpnum=0&islist=&querylist=&nojc=undefined&dyTabStr=MCwyLDMsMSw0LDYsNSw4LDcsOQ%3D%3D&lid=8764171842572711941');
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
