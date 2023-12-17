// controllers/userController.js
const userService = require('../services/userService');
const bcrypt = require('bcryptjs');  
const saltRounds = 10;

const register = async (req, res) => {
  try {
    // 从请求中获取用户提供的注册信息
    const { account, password} = req.body;
    // 在这里添加逻辑来验证和处理注册
    // 例如，检查密码是否一致，是否符合规范等
    // 调用用户服务处理注册逻辑
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // 对用户明文密码进行哈希处理
    const newUser = await userService.registerUser(account, hashedPassword);  
    // 返回成功响应
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: newUser,
    });
  } catch (error) {
    // 处理错误情况，返回适当的错误响应
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message,
    });
  }
};


//注册模块
const login = async (req, res) => {
    try {
      // 从请求中获取用户提供的登录信息
      const { account, password } = req.body;
  
      // 调用用户服务处理登录逻辑
      const user = await userService.loginUser(account, password);
  
      // 返回成功登录的响应
      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: user,
      });
    } catch (error) {
      // 处理错误情况，返回适当的错误响应


      // console.error(error);
      let errorMessage = 'Login failed';
      
      // 如果是密码错误，可以添加特定的错误信息
      if (error.name === '密码不正确') {
        errorMessage = '密码不正确';
      } else if (error.name === '用户不存在') {
        errorMessage = '用户不存在';
      }
      res.status(200).json({
        success: false,
        message: errorMessage,
        error: error.message,
      });





    }
  };
  
module.exports = {
  register,
  login,
  // 可以添加其他用户相关的控制器方法
};
