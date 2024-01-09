<template>
    <div>
  
        <div class="mhy-container mhy-account-center-content">
          <div class="mhy-account-center-content-container mhy-account-center-collection">
            <div class="mhy-account-center__subheader">
              <span>个人简介</span>
              <div class="mhy-account-center-collection-menu">
                <div class="mhy-button mhy-account-center-collection-menu__create mhy-button-outlined">
                  <button class="mhy-button__button" @click="updateModal">编辑</button>
                </div>
                <!---->
              </div>
            </div>
          </div>
          <div style="margin: 20px;">
            <el-descriptions class="margin-top" :column="3" border>
              <el-descriptions-item>
                <template v-slot:label>
                  <i class="el-icon-user"></i>
                  头像
                </template>
                <div>
                  <el-image
                    :src="userInfo.avatar || 'https://t9.baidu.com/it/u=100131377,2569675271&fm=193'" 
                    style="width: 50px; height: 50px;"></el-image>
                </div>
              </el-descriptions-item>
              <el-descriptions-item>
                <template v-slot:label>
                  <i class="el-icon-user"></i>
                  账户名
                </template>
                {{ userInfo.account }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template v-slot:label>
                  <i class="el-icon-user-solid"></i>
                  昵称
                </template>
                {{ userInfo.nickname ? userInfo.nickname : 'NULL' }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template v-slot:label>
                  <i class="el-icon-tickets"></i>
                  年龄
                </template>
                {{ userInfo.age ? userInfo.age : 'NULL' }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template v-slot:label>
                  <i class="el-icon-tickets"></i>
                  性别
                </template>
                {{ userInfo.gender ? userInfo.gender : 'NULL' }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template v-slot:label>
                  <i class="el-icon-tickets"></i>
                  邮箱Email
                </template>
                {{ userInfo.email ? userInfo.email : 'NULL' }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template v-slot:label>
                  <i class="el-icon-office-building"></i>
                  个人简介
                </template>
                {{ userInfo.bio ? userInfo.bio : 'NULL' }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
      
          
          <el-dialog
            title="修改信息"
            v-model="someValue"
            v-loading="loading"
            width="50%"
            :close-on-click-modal="true"
            center>
            <div>
              <el-form status-icon
                      :rules="rules"
                      ref="form"
                      :model="form"
                      label-width="120px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="头像：">
                      <el-upload
                        class="avatar-uploader"
                        action=""
                        ref="upload"
                        :show-file-list="false"
                        :auto-upload="false"
                        :before-upload="beforeUpload"
                        :on-change="handleChange"
                        :on-remove="handleRemove"
                      >
                        <img v-if="form.avatar" :src="form.avatar" class="avatar" alt="" style="width: 100px; height: 100px; object-fit: cover;">
                        <i v-else class="el-icon-plus avatar-uploader-icon" />
                      </el-upload>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="昵称" prop="nickname">
                      <el-input v-model="form.nickname" placeholder="请输入昵称" clearable>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="性别" prop="gender">
                      <el-radio-group v-model="form.gender">
                        <el-radio label="保密">保密</el-radio>
                        <el-radio label="男">男</el-radio>
                        <el-radio label="女">女</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="邮箱" prop="email">
                      <el-input v-model="form.email" placeholder="请输入邮箱" clearable>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="年龄" prop="age">
                      <el-input v-model="form.age" placeholder="请输入年龄" clearable>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="个人简介" prop="bio">
                      <el-input type="textarea" resize="none" v-model="form.bio" placeholder="请输入个人简介" clearable>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div style="text-align: center;">
                  <el-button type="primary" style="width: 100px;" @click="submitFun">提交</el-button>
                  <el-button type="primary" plain style="width: 100px;" @click="box=false">取消</el-button>
                </div>
              </el-form>
            </div>
          </el-dialog>
      
        </div>
    </div>
      
  </template>
   
  <script>
    import axios from 'axios';
    import { jwtDecode } from 'jwt-decode';
    export default {
      data() {
        return {
          userInfo: {}, // 确保有一个初始值
          someValue: false,
          loading: false,
          box: false,
          form: {
            avatar:'',//回显头像
            nickname: '',
            gender: '',
            file: null,
            email:'',
            age:'',
            bio: ''
          },
          rules: {
            nickname: [
              { required: true, message: '请输入昵称', trigger: 'change' }
            ],
            gender: [
              { required: true, message: '请选择性别', trigger: 'change' }
            ]
          },
        };
      },
      created(){
      this.fetchUserData();
      },
      mounted() {
      },
      methods: {
        /* eslint-disable */
        beforeUpload(file) {
        
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!')
          }
          return isLt2M
        },
      
        handleRemove(file, fileList) {
          this.form.file = null;
          console.info(this.form);
        },
       
        handleChange(file, fileList){
          console.info(fileList);
          this.form.file = file;
          let URL = window.URL || window.webkitURL;
          this.form.avatar = URL.createObjectURL(file.raw);
        },
        
      //   updateModal(){ // 打开窗口
      //     this.$nextTick(() => {
      //     if(this.$refs.form){
       
      //     this.form.gender = this.form.gender + '';
      //     console.info(this.formthis.box = true);
      //     }
      //   }
      //     )
      //  },
      updateModal() { // 打开窗口
        this.someValue = true;
        this.$nextTick(() => {
          if (this.$refs.form) {
            this.$refs.form.resetFields();
          }
        });
        this.form.gender = this.form.gender + '';
        console.info(this.form);
        this.box = true;
      },

      submitFun() {//提交
        console.info(this.form);
        const token = localStorage.getItem("token");
        const userId = jwtDecode(token).sub;
        axios.put(`http://localhost:3000/api/user/update/${userId}`, this.form, {
            headers: { 'Authorization': `Bearer ${token}` }
         })
        .then(response => {
              // 处理响应，例如显示成功消息
           this.$message.success('用户信息更新成功');
           this.someValue = false; // 关闭对话框
        })
        .catch(error => {
          console.error('Error updating user data:', error);
            // 显示错误消息
        this.$message.error('更新失败');
        });
      },
      fetchUserData() {
        // const account = localStorage.getItem('account');// 动态获取或者硬编码您的用户账户名
        // this.userInfo.account = account;
        // 假设 token 是你从 localStorage 中获取的 JWT
        const token = localStorage.getItem("token");
        // 解码 JWT
        //console.log(token)
        const decodedToken = jwtDecode(token);
        // 获取用户账号
        console.log(decodedToken)
        const userId = decodedToken.sub;
        // 现在，userAccount 包含了JWT负载中的用户账号信息
        axios.get(`http://localhost:3000/api/user/id/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
          .then(response => {
            this.userInfo = response.data;
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
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
  </style>