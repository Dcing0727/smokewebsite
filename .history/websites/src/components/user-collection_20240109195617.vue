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
        <div class="mhy-collection-card mhy-account-center-collection-card">
          <a class="mhy-router-link mhy-collection-card__link">
            <div class="mhy-collection-card__cover" style="background-image: url('https://upload-bbs.miyoushe.com/upload/2023/04/13/378888828/76171646a64fa87d316f7d7ddbfb8efd_4456710405302802792.jpg?x-oss-process=image/resize,s_150/quality,q_80/auto-orient,0/interlace,1/format,jpg');">
            </div>
          </a>
          <div class="mhy-collection-card__info">
            <a class="mhy-router-link mhy-collection-card__link" target="_blank">
              <p class="mhy-collection-card__name">hello</p>
              <p class="mhy-collection-card__desc">hello word</p>
            </a>
            <div class="mhy-collection-card__stats">
              <span>0浏览</span>
              <span>0点赞</span>
              <span>1分钟前</span>
            </div>
          </div>
          <!---->
        </div>
        <div class="mhy-collection-card mhy-account-center-collection-card">
          <a class="mhy-router-link mhy-collection-card__link">
            <div class="mhy-collection-card__cover" style="background-image: url('https://upload-bbs.miyoushe.com/upload/2023/04/13/378888828/76171646a64fa87d316f7d7ddbfb8efd_4456710405302802792.jpg?x-oss-process=image/resize,s_150/quality,q_80/auto-orient,0/interlace,1/format,jpg');">
            </div>
          </a>
          <div class="mhy-collection-card__info">
            <a class="mhy-router-link mhy-collection-card__link" target="_blank">
              <p class="mhy-collection-card__name">hello</p>
              <p class="mhy-collection-card__desc">hello word</p>
            </a>
            <div class="mhy-collection-card__stats">
              <span>0浏览</span>
              <span>0点赞</span>
              <span>1分钟前</span>
            </div>
          </div>
          <!---->
        </div>
        <div class="mhy-container__footer">
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
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="博客内容"> 
        <mavon-editor v-model="blogForm.content"></mavon-editor>
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
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

  export default {
    components: {
    mavonEditor,
  },
    data() {
    return {
      dialogVisible: false,
      blogForm: {
        file: null,
        title: '',
        description: '',
        content: '',
        coverImage: ''
      }
     };
    },
    mounted() {
    },
    methods: {
       /* eslint-disable */
      openDialog() {
      this.dialogVisible = true; // 打开对话框
      },
      submitBlog() {
      // 发送请求到后端API
      // 示例：axios.post('/api/blog', this.blogForm)
      // ...处理响应...
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
      handleChange(file, fileList){
        console.info(fileList);
        this.file = file;
        let URL = window.URL || window.webkitURL;
        blogForm.coverImage = URL.createObjectURL(file.raw);
      }
    }
  };
</script>
 
<style scoped>
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
     display: inline-block;
     cursor: pointer;
     -ms-flex-negative: 0;
     flex-shrink: 0;
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
</style>