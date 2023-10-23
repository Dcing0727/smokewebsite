
    var element1 = document.getElementById("register");
        element1.onclick=function(){
       var element2 = document.getElementsByClassName('box2');     // 打开注册窗口
       element2[0].style.display = "block";

    }

    var close = document.getElementsByClassName("close");
        close[0].onclick = function(){
        var element2 = document.getElementsByClassName('box2');    //点击叉号 关闭注册窗口
        element2[0].style.display = "none";
    }
    

    var element3 = document.getElementsByClassName("box2"); 
    element3[0].onmousedown = function(event){
       var event = event || window.event; 
       var diffX = event.clientX - element3[0].offsetLeft;        //注册窗口拖动效果
       var diffY = event.clientY - element3[0].offsetTop;
       if(typeof element3[0].setCapture !== 'undefined'){
        element3[0].setCapture(); 
       }
    document.onmousemove = function(event){
        var event = event || window.event;
        var moveX = event.clientX - diffX;
        var moveY = event.clientY - diffY;
        if(moveX < 0){
            moveX = 0
        }else if(moveX > window.innerWidth - element3[0].offsetWidth){
            moveX = window.innerWidth - element3[0].offsetWidth
        }
        if(moveY < 0){
            moveY = 0
        }else if(moveY > window.innerHeight - element3[0].offsetHeight){
            moveY =  window.innerHeight - element3[0].offsetHeight
        }
        element3[0].style.left = moveX + 'px';
        element3[0].style.top = moveY + 'px'
    }
    document.onmouseup = function(event){
        this.onmousemove = null;
        this.onmouseup = null; 
        if(typeof element3[0].releaseCapture!='undefined'){  
            element3[0].releaseCapture();  
        }  
    }
}


    //注意：以下内容可能需要修改
    //注册模块
    $("#button2").click(function(){
        var userName = $('#inName').val();
        var passWord = $("#inPassword").val();
        var passWord2 = $("#inPassword2").val();
            //注册的前端验证
        if (userName == "" || passWord == "" || passWord2 == ""){
            alert("用户名和密码均不能为空！");
        }else if (passWord != passWord2){
            alert("两次输入不一致！")
        }else{
            $("#box2").css('display','none');  
            //注册成功后 注册框消失、提交
            $.post("      ",        //后端URL           
            {
                "username":userName,
                "password":passWord 

            },function(data,status){
                alert(data+"状态"+status); 
                //加入回调函数
            });
        } 
    })
    
    
    //登录模块
    $("#loginButton").click(function(){
        var loginname = $('#loginName').val();
        var log_password = $('#loginPassword').val();
         $.ajax({
                type:'post',
                url:"      ",       //后端接口
                data:{  
                    "loginname":loginname,
                    "log_password":log_password
                },
                async:true,
                dataType:'text',
                success:function(data){
                    // console.log(data);
                    // alert(data,status);
                    if(data == "登录成功!"){
                        window.location.href = "http://127.0.0.1:8080/home/xxx.html";  //主页网址
                    }else{
                        alert(data);
                    }
                },
                error:function(response){ alert("error"); }
                });
    })





         

    

  




