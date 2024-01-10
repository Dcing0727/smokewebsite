<template>
  <div class="mhy-container mhy-account-center-content">
    <div class="mhy-account-center-content-container mhy-account-center-collection">
      <div class="mhy-account-center__subheader">
        <span>我的博客</span>
        <div class="mhy-account-center-collection-menu">
          <div class="mhy-button mhy-account-center-collection-menu__create mhy-button-outlined">
            <button class="mhy-button__button" @click="openDialog">创建博客</button>
          </div>
          <!---->
        </div>
      </div>
      
    <div class="mhy-account-center-content-container__list">
      <div 
        class="mhy-collection-card mhy-account-center-collection-card"
        v-for="blog in userBlogs"
        :key="blog.blogId"
      >
        <a class="mhy-router-link mhy-collection-card__link">
          <div class="mhy-collection-card__cover" :style="{ backgroundImage: `url('${blog.coverImage}')` }">
          </div>
        </a>
        <div class="mhy-collection-card__info">
          <a class="mhy-router-link mhy-collection-card__link" target="_blank">
            <p class="mhy-collection-card__name">{{ blog.title }}</p>
            <p class="mhy-collection-card__desc">{{ blog.description }}</p>
            <span class="blog-time">创建时间: {{ formatDate(blog.createdAt) }}</span>
            <span class="blog-time">最后修改: {{ formatDate(blog.updatedAt) }}</span>
          </a>
          <div class="mhy-collection-card__stats">
            <!-- 这里可以添加浏览量、点赞量等信息 -->
          </div>
          <!-- <div class="blog-actions">
          <button  @click="viewBlog(blog)">查看</button>
          <button  @click="editBlog(blog)">编辑</button>
        </div> -->
          <div class="mhy-button mhy-account-center-collection-menu__create mhy-button-outlined">
            <button class="mhy-button__button" @click="viewBlog(blog)">查看</button>
            <button class="mhy-button__button" @click="editBlog(blog)">编辑</button>
          </div>
        </div>
      </div>
      <!-- 用于显示没有更多数据的消息 -->
      <div v-if="userBlogs.length === 0" class="mhy-container__footer">
        <div class="mhy-loadmore mhy-loadmore-scroll">
          <div class="mhy-loadmore__nomore">没有更多数据了</div>
        </div>
      </div>
    </div>



  </div>

  <el-dialog title="创建博客" v-model="dialogVisible" width="70%">
    <el-form :model="blogForm">
      <el-form-item label="博客标题">
        <el-input v-model="blogForm.title"></el-input>
      </el-form-item>
      <el-form-item label="博客封面">
        <el-upload
                        class="upload-demo"
                        action=""
                        ref="upload"
                        :show-file-list="false"
                        :auto-upload="false"
                        :before-upload="beforeUpload"
                        :on-change="handleChange"
                        :on-remove="handleRemove"
          >
          <img v-if="blogForm.coverImage" :src="blogForm.coverImage" class="coverImage" alt="" style="width: 100px; height: 100px; object-fit: cover;">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="博客简介">
        <el-input type="textarea" v-model="blogForm.description"></el-input>
      </el-form-item>
      <el-form-item label="博客内容">
        <el-input type="textarea" v-model="blogForm.content"></el-input>
      </el-form-item>
    </el-form>
    <template v-slot:footer>
     <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="submitBlog">发布</el-button>
    </span>
   </template>
  </el-dialog>
  </div>
</template>
 
<script>
// import { mavonEditor } from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
  export default {
  //   components: {
  //   mavonEditor,
  // },
    data() {
    return {
      dialogVisible: false,
      userBlogs: [], // 存储用户博客的数组
      blogForm: {
        file: null,
        title: '',
        description: '',
        content: '',
        coverImage: 'https://t9.baidu.com/it/u=100131377,2569675271&fm=193'
      },
     };
    },
    mounted() {
      this.fetchUserBlogs();
    },
    methods: {
       /* eslint-disable */
       viewBlog(blog) {
      // 实现查看博客的逻辑，比如导航到博客详情页面
      // 例如：this.$router.push({ name: 'BlogDetail', params: { blogId: blog.blogId } });
      alert('查看博客：' + blog.title);
    },

    editBlog(blog) {
      // 实现编辑博客的逻辑，比如打开编辑表单或导航到博客编辑页面
      // 例如：this.$router.push({ name: 'EditBlog', params: { blogId: blog.blogId } });
      alert('编辑博客：' + blog.title);
    },
      openDialog() {
      this.dialogVisible = true; // 打开对话框
      },
      submitBlog() {
      // 发送请求到后端API
      // 示例：axios.post('/api/blog', this.blogForm)
      // ...处理响应...
      const token = localStorage.getItem("token");
                    // 解码 JWT
                    //console.log(token)
      const decodedToken = jwtDecode(token);
                    // 获取用户账号
      console.log(decodedToken) 
      const userId = decodedToken.sub;

      // 准备要发送的博客数据
      const blogData = {
        userId: userId,
        title: this.blogForm.title,
        description: this.blogForm.description,
        content: this.blogForm.content,
        coverImage: this.blogForm.coverImage
      };

      // 发送 POST 请求到后端API
      axios.post('http://localhost:3000/api/blog', blogData, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => {
          // 处理成功的响应
          this.$message.success('博客发布成功');
          this.dialogVisible = false; // 关闭对话框
          // 这里可以添加代码来清空表单或更新页面上的博客列表
        })
        .catch(error => {
          // 处理错误的响应
          console.error('Error publishing the blog:', error);
          this.$message.error('发布失败');
        });

      this.dialogVisible = false; // 关闭对话框
      },


      beforeUpload(file) {
        
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
      },
    
      handleRemove(file, fileList) {
        this.blogForm.file = null;
        this.blogForm.coverImage = '';
      },   
      // handleChange(file, fileList){
      //   console.info(fileList);
      //   this.file = file;
      //   let URL = window.URL || window.webkitURL;
      //   this.blogForm.coverImage = URL.createObjectURL(file.raw);
      // },
      handleChange(file, fileList) {
      // 创建 FormData 对象
      const formData = new FormData();
      formData.append('file', file.raw);

      // 发送 POST 请求上传图片
      axios.post('http://localhost:3000/api/upload', formData)
        .then(response => {
          // 使用服务器返回的永久URL
          this.blogForm.coverImage = response.data.url;
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
      },
      formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
      },
      fetchUserBlogs() {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;

      axios.get(`http://localhost:3000/api/user-blogs/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => {
          this.userBlogs = response.data.blogs;
        })
        .catch(error => {
          console.error('Error fetching blogs:', error);
        });
      }
    }
  };
</script>
 



<style scoped>
.upload-demo i {
  font-size: 20px;
  color: #999;
}
.upload-demo .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.upload-demo .el-upload:hover {
  border-color: #2db7f5;
}
.dialog-footer {
  text-align: center;
}
  .mhy-account-center-content {
    width: 700px;
    float: right;
  }
   .mhy-container {
     background-color: #fff;
     border-radius: 4px;
   }
  p{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none;
  }
  .mhy-account-center__subheader {
    padding: 0 30px;
    line-height: 50px;
    border-bottom: 1px solid #ebebeb;
    font-size: 16px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  .mhy-account-center-collection-menu {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 14px;
  }
  .mhy-account-center-collection-menu .mhy-button {
    height: 28px;
    line-height: 28px;
    font-weight: 600;
  }
   .mhy-account-center-collection-menu__create {
     width: 88px;
   }
   .mhy-button {
     /* display: inline-block; */
     cursor: pointer;
     -ms-flex-negative: 0;
     flex-shrink: 0;
     display: flex; /* 使用flex布局 */
     align-items: center; /* 垂直居中对齐 */
     justify-content: space-around; /* 水平方向上均匀分布 */
  }
  .mhy-button-outlined .mhy-button__button {
    background-color: #fff;
    color: #00b2ff;
    border: 1px solid #00c3ff;
    border-radius: 4px;
    -webkit-transition-duration: .2s;
    -o-transition-duration: .2s;
    transition-duration: .2s;
    -webkit-transition-property: border-color,color;
    -o-transition-property: border-color,color;
    transition-property: border-color,color;
  }
   .mhy-button__button {
     display: -ms-inline-flexbox;
     display: inline-flex;
     -webkit-box-align: center;
     -ms-flex-align: center;
     align-items: center;
     -webkit-box-pack: center;
     -ms-flex-pack: center;
     justify-content: center;
     cursor: pointer;
     outline: none;
     font-size: inherit;
     color: inherit;
     width: 100%;
     height: 100%;
     background-color: transparent;
     border: none;
     border-radius: 0;
     font-weight: inherit;
     line-height: inherit;
   }
  input, button, textarea {
    color: inherit;
    font: inherit;
  }
  .mhy-account-center-collection-card {
    padding: 15px 40px 15px 30px;
  }
   .mhy-collection-card {
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
     -webkit-box-align: center;
     -ms-flex-align: center;
     align-items: center;
   }
  .mhy-collection-card__link {
    color: #333;
  }
  a {
    text-decoration: none;
  }
  .mhy-collection-card__cover {
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #ebebeb;
    width: 60px;
    height: 60px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .mhy-collection-card__info {
    display: inline-block;
    margin-left: 20px;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    overflow: hidden;
  }
  .mhy-collection-card__desc, .mhy-collection-card__name, .mhy-collection-card__info .mhy-collection-card__link {
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
   .mhy-collection-card__link {
     color: #333;
   }
  .mhy-collection-card__name {
    position: relative;
    line-height: 1;
    height: 20px;
  }
   .mhy-collection-card__desc, .mhy-collection-card__name, .mhy-collection-card__info .mhy-collection-card__link {
     overflow: hidden;
     -o-text-overflow: ellipsis;
     text-overflow: ellipsis;
     white-space: nowrap;
   }
  .mhy-collection-card__desc {
    color: #999;
    font-size: 12px;
    line-height: 1;
    height: 22px;
  }
   .mhy-collection-card__desc, .mhy-collection-card__name, .mhy-collection-card__info .mhy-collection-card__link {
     overflow: hidden;
     -o-text-overflow: ellipsis;
     text-overflow: ellipsis;
     white-space: nowrap;
   }
  .mhy-collection-card__stats {
    color: #ccc;
    font-size: 12px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .mhy-collection-card__stats span {
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .mhy-collection-card__stats span {
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
   .mhy-collection-card__stats span:not(:first-child)::before {
     content: "";
     display: inline-block;
     width: 2px;
     height: 2px;
     border-radius: 50%;
     background-color: #ccc;
     margin: 0 6px;
   }
  .mhy-container__footer {
    height: 70px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-top: 1px solid #ebebeb;
  }
  .mhy-loadmore__btn .mhy-button__button, .mhy-loadmore__nomore {
    color: #ccc;
    font-size: 16px;
  }
  .blog-time {
  font-size: 0.8em; /* 较小的字号 */
  color: #999;
  margin-right: 10px; /* 适当的间距 */
  } 
  .blog-actions {
  /* 按钮样式 */
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.blog-actions button {
  /* 更具体的按钮样式 */
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
}

.blog-actions button:hover {
  /* 按钮悬停效果 */
  background-color: #0056b3;
}
</style>