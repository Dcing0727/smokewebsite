<template>
<div>
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
        <div id="register" >新用户，去注册！</div>
    </div>
    <div class="box2" id="box2">
        <div class="head">注册 
            <div class="close">✖</div>
        </div>
        <div class="ipputBox">
            <div>  <p>输入用户名:</p> <input id="inName" class="inName" type="text" ></div>
            <div>  <p>输入密码:</p>  <input id="inPassword" class="inPassword" type="password"></div>
            <div>  <p>确认密码:</p>   <input id="inPassword2" class="inPassword" type="password"></div>
            <div><input id="button2" class="button2" type="button" value="完成"></div>
        </div>
    </div>
</div>
   
</template>

<script>
export default {
  name: 'LoginComponent',
  data() {
    return {
      username: '',
      password: '',
      loggedIn: false,
    };
  },
  methods: {
    login() {
      // 在这里处理登录逻辑
      if (this.username === 'your_username' && this.password === 'your_password') {
        // 模拟登录成功，显示登录成功消息
        this.loggedIn = true;
      } else {
        // 模拟登录失败，显示错误消息
        this.loggedIn = false;
        alert('用户名或密码不正确');
      }
    },
  },
};
</script>

<style scoped>

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

.box .inputbox input:hover
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
.ipputBox
{
    position: absolute;
    left: 30%;
    top: 20%;
    /* transform: translate(-50%); */
}
.ipputBox p
{
    margin-top: 20px;
    color: gray;
}

.ipputBox .button2
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
.ipputBox .button2:active
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




