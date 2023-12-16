// services/userService.js

const User = require('../models/user'); // 假设你有一个 User 模型

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

module.exports = {
  registerUser,
  // 其他用户服务方法的导出
};
