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
const loginUser = async (account, password) => {
  try {
    // 查找用户
    const customError = new Error('登录失败');
    const user = await User.findOne({
      where: {
        account: account,
      },
    });
    if (!user) {
      // 用户不存在
      console.log('用户不存在');
      customError.name = '用户不存在';
      throw customError;
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
      customError.name = '密码不正确';
      throw customError;
    }
  } catch (error) {
    // 处理错误
    console.error('loginUser 中发生错误:', error);
    throw error; // Ensure the error is propagated after handling
  }
};
const getUserById = async (userId) => {
  try {
    const user = await User.findOne({
        where: { account: account },
        attributes: ['account', 'nickname', 'bio', 'hobby', 'gender', 'avatar'] // 确保包括需要的字段
    });
    if (!user) {
        throw new Error('用户未找到');
    }
    return user;
} catch (error) {
    throw error;
}
};
module.exports = {
  registerUser,
  loginUser,
  getUserById
  // 其他用户服务方法的导出
};
