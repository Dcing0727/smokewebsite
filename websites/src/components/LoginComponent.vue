<template>
<div class="background-container">
   <div class="box">  
        <h1>登录</h1>
        <div class="inputbox">
            <div class="inputText">
            <img class="userImg" src="@/assets/user.png" alt="">  <input id="loginName" type="text" placeholder="Username" required/>
            </div>
            <div class="inputText">
            <img class="passwordImg" src="@/assets/password.png" alt="">    <input id="loginPassword" type="password" placeholder="Password" required/>
            </div>
        </div>
        <button id="loginButton" class="loginButton">LOGIN</button>
        <div id="register" @click="openBox()" >新用户，去注册！</div>
    </div>
    <div class="box2" @mousedown="dragElement" ref="box2">
        <!-- 注册窗口内容 -->
        <div class="head">注册 
            <div class="close" @click="closeBox">✖</div>
        </div>
        <div class="inputBox">
        <!-- 输入框内容 -->
            <div><p>输入用户名:</p><input class="inName" type="text" v-model="account"></div>
            <div><p>输入密码:</p><input class="inPassword" type="password" v-model="password"></div>
            <div><p>确认密码:</p><input class="inPassword" type="password" v-model="password2"></div>
            <div><input class="button2" type="button" value="完成" @click="register"></div>
        </div>
    </div>
</div>
   
</template>

<script>
import axios from 'axios';
export default {
  name: 'LoginComponent',
  data() {
    return {
      account: '',
      password: '',
      password2:'',
      loggedIn: false,
    };
  },
  methods: {
    openBox()  {
      this.$refs.box2.style.display = "block";
    },
    closeBox() {
      this.$refs.box2.style.display = "none";
    },
    dragElement(event) {
      const box = this.$refs.box2;
      const diffX = event.clientX - box.offsetLeft;
      const diffY = event.clientY - box.offsetTop;

      const moveElement = (event) => {
        let moveX = event.clientX - diffX;
        let moveY = event.clientY - diffY;
        if (moveX < 0) {
          moveX = 0;
        } else if (moveX > window.innerWidth - box.offsetWidth) {
          moveX = window.innerWidth - box.offsetWidth;
        }
        if (moveY < 0) {
          moveY = 0;
        } else if (moveY > window.innerHeight - box.offsetHeight) {
          moveY = window.innerHeight - box.offsetHeight;
        }
        box.style.left = moveX + 'px';
        box.style.top = moveY + 'px';
      };

      const releaseElement = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        if (box.releaseCapture) {
          box.releaseCapture();
        }
      };

      if (box.setCapture) {
        box.setCapture();
      }
      document.onmousemove = moveElement;
      document.onmouseup = releaseElement;
    },
    // async hashPassword() {
    //   // 使用 Web Crypto API 的 SubtleCrypto 接口来生成哈希
    //   const encoder = new TextEncoder();
    //   const data = encoder.encode(this.password);

    //   // 使用 SHA-256 算法生成哈希
    //   const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    //   // 将哈希值转换为十六进制字符串
    //   const hashArray = Array.from(new Uint8Array(hashBuffer));
    //   const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    //   this.hashedPassword = hashedPassword;
    // },
    register() {
      // 在这里处理注册逻辑
      // 使用 this.username, this.password 和 this.password2 来获取输入的值
      // 可以在这里添加逻辑来验证和处理注册
      // 之后可以关闭注册窗口，例如：this.closeBox();
       // 步骤1：获取用户输入
      const account = this.account;
      const password = this.password;
      const password2 = this.password2;
      //const hashedPassword = this.hashPassword(password);


      // 步骤2：验证输入
      if (!account || !password || !password2) {
        alert("请填写所有字段");
        return;
      }
      else if (password !== password2) {
        alert("两次输入的密码不一致");
        return;
      }else{
        fetch('http://localhost:3000/api/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            account: account,
            password: password,
          }),
        })
        .then(response => response.json())
        .then(data => {
        // 步骤4：处理注册响应
        if (data.success) {
        //console.log("注册成功");
          alert('注册成功')
        // 此处可以执行一些操作，比如关闭注册窗口
          this.closeBox();
        } else {
          console.error("注册失败，请重试");
        }
        })
        .catch(error => {
          console.error("发生错误:", error);
        });
      }
      // 步骤3：发送注册请求
    },
  },
   mounted() {
    // 在组件挂载后调用后端 API
    axios.get('http://localhost:3000/api/data')
      .then(response => {
        this.message = response.data.message;
        console.log(this.message)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  },
};
</script>

<style scoped>
  .background-container {
    background-image: url("@/assets/7.png"); 
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
    z-index: -1;

  }
  header
  {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: 0.6s;
      padding: 40px 100px;
      z-index: 100000;
  }
  header.sticky
  {
      padding: 5px 100px;
      background-color: #fff;

  }
  header .logo
  {
      position: relative;
      font-weight: 700;
      color: #fff;
      text-decoration: none;
      font-size: 2em;
      text-transform: uppercase;
      letter-spacing: 2px;
      transition: 0.6s;
  }
  header ul
  {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  header ul li
  {
      position: relative;
      list-style: none;
  }
  header ul li a
  {
      position: relative;
      margin: 0 15px;
      text-decoration: none;
      color: #fff;
      letter-spacing: 2px;
      font-weight: 500px;
      transition: 0.6px;
  }
  .banner
  {
      position: relative;
      width: 100%;
      height: 100vh;
      /* height: 100%; */
      /*background: url(1.jpg);*/
      background-size: cover;
      color: red;
      /* line-height: 100vh;
      text-align: center;
      font-size: 100px;
      font-family: Verdana, Geneva, sans-serif; */
  }
  header.sticky .logo,
  header.sticky ul li a
  {
      color: #000;
  }
  .box
  {
      text-align: center;
      color: aliceblue;
      padding: 20px 50px;
      border-radius: 40px;
      position: absolute;
      left: 50%;
      transform: translate(-50%); 
      width: 600px;
      height: 400px;
      top: 20%;
      background-color:black;
      opacity: 0.7;
      z-index: 1;
  }
  .box h1
  {
      margin-top: 20px;
  }
  .box .inputbox
  {
      margin-top: 50px;
  }
  .box .inputbox .inputText
  {
      margin-top: 20px;
  }
  .box .inputbox input
  {
      font-size: 15px;
      width: 300px;
      border: 0;
      padding: 10px 10px;
      border-bottom: 1px solid black;
      outline: none;
      background-color: #000000;
      color: white;
  }

  .inputbox input:hover
  {
      transition: 0.6s;
      border-bottom: 1px solid  white;
  }

  .box .loginButton
  {
      outline: none;
      height: 30px;
      border: 0;
      margin-top: 30px;
      width: 150px;
      border-radius: 10px;
  }

  .box .loginButton:active
  {
      background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
  }
  #register
  {
      color: white;
      position: absolute;
      margin-top: 20px;
      margin-left: 190px;
      cursor: pointer;
      /* left: 80%; */
      /* transform: translate(-50%);  */
  }
  .box2
  {
      top: 100px;
      position: absolute;
      left: 50%;
      transform: translate(-50%); 
      width: 500px;
      height: 400px;
      background-color: white;
      box-shadow: 10px 10px 20px black;
      /* overflow: hidden; */     
      cursor: move;
      display: none;
      z-index: 2;
  }
  .head
  {
      line-height: 40px;
      text-align: center;
      color: #fff;
      height: 40px;
      background-color: #000;
  }
  .head .close
  {
      cursor: pointer;
      position: absolute;
      left: 95%;
      margin-top: -40px;
      color: #fff;
      
  }
  .inName
  {
      /* margin-top: 30px; */
      width: 200px;
      outline: none;
      height: 25px;
      font-size: 20px;

  }
  .inPassword
  {
      /* margin-top: 20px; */
      width: 200px;
      height: 25px;
      font-size: 25px;
      outline: none;
  }
  .inputBox
  {
      position: absolute;
      left: 30%;
      top: 20%;

  }
  .inputBox p
  {
      margin-top: 20px;
      color: gray;
  }

  .inputBox  .button2
  {
      color: #fff;
      height: 30px;
      width: 200px;
      border: 0;
      margin-top: 20px;
      outline: none;
      background-color: dodgerblue;
      border-radius: 5px;
      
  }
  .inputBox .button2:active
  {
      background-color: rgb(30,144,200);
  }
  .userImg{
      display: inline-block;
      /* line-height: 20px; */
      margin-top: 4px;
      width: 30px;
      height: 30px;
  }
  .passwordImg{
      width: 30px;
      height: 30px;
  }
  #signIN{
      color: #0084ff;
  }
</style>




