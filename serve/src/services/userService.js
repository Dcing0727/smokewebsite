// services/userService.js

const User = require('../models/user'); // 假设你有一个 User 模型
const bcrypt = require('bcryptjs');

const registerUser = async (account, password) => {
  try {
    // 在这里可以添加一些额外的逻辑，比如密码加密等
    // 创建新用户
    const newUser = await User.create({
      account,
      password,
      // 其他用户信息字段...
    });
    return newUser;
  } catch (error) {
    // 处理错误，比如用户名重复等
    console.error('Error in registerUser:', error);
    throw new Error('User registration failed');
  }
};

// 可以添加其他用户服务方法，比如 loginUser、getUserInfo 等

const loginUser = async (account, password) =>{
    try {
        // 查找用户
        const user = await User.findOne({
          where: {
            account: account,
          },
        });
        if (!user) {
          // 用户不存在
          console.log('用户不存在');
          throw new Error('用户不存在');
        }
        // 比较密码
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
          // 密码匹配，允许登录
          console.log('登录成功!!!!');
          return user;
        } else {
          // 密码不匹配，拒绝访问
          console.log('密码不正确');
          throw new Error('密码不正确');
        }
      } catch (error) {
        // 处理错误
        console.error('loginUser 中发生错误:', error);
        throw new Error('登录失败');
      }

};

module.exports = {
  registerUser,
  loginUser
  // 其他用户服务方法的导出
};
