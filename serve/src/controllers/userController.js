// controllers/userController.js
const userService = require('../services/userService');
const bcrypt = require('bcryptjs');  
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // 假设你有一个 User 模型
const DailyRecord = require('../models/DailyRecord');
const res = require('express/lib/response');
//JWT 是一种用于在网络上安全地传输信息的开放标准（RFC 7519），
//常用于身份验证和信息传递。
const secretKey = 'yourSecretKey';    //后期考虑加密处理

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

//登录模块
const login = async (req, res) => {
    try {
      // 从请求中获取用户提供的登录信息
      const { account, password } = req.body;
  
      // 调用用户服务处理登录逻辑
      const user = await userService.loginUser(account, password);
       // 生成JWT令牌
      const token = jwt.sign({ sub: user.id }, secretKey, { expiresIn: '1h' });
  
      // 返回成功登录的响应
      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: user,
        token: token,
      });
    } catch (error) {
      // 处理错误情况，返回适当的错误响应
      // console.error(error);
      let errorMessage = 'Login failed';
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

  const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      // 未提供令牌
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }
    // 验证令牌
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        // 令牌无效
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
      }else{
        req.user = decoded;
        next();
      }
    });
  };

  const getUserByAccount = async (req, res) => {
    try {
        const account = req.params.account;
        const user = await userService.getUserByAccount(account);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const record = async (req, res) => {
  try {
    // 从请求中获取用户提供的注册信息
    const { account, date, smokingType, smokingAmount, smokingExpenses } = req.body;

    // 查询是否存在具有相同 date 和 smokingType 的记录
    const existingRecord = await DailyRecord.findOne({
      where: { account, date, smokingType },
    });
    // 转为浮点型变量
    const smokingAmountFloat = parseFloat(smokingAmount); 
    if (existingRecord) {
      // 如果记录已存在，将新记录的 smokingAmount 和 smokingExpenses 添加到旧记录中
      existingRecord.smokingAmount += smokingAmountFloat;
      existingRecord.smokingExpenses += smokingExpenses;
      // 保存更新后的记录
      await existingRecord.save();
      // 返回成功响应
      return res.status(201).json({
        success: true,
        message: 'User record successfully',
        user: existingRecord,
      });
    } else {
      // 如果记录不存在，创建新记录
      // 返回成功响应
      const newRecord = await DailyRecord.create({
        account,
        date,
        smokingType,
        smokingAmount,
        smokingExpenses,
      });

      res.status(201).json({
        success: true,
        message: 'User record successfully',
        record: newRecord,
      });
    }
  } catch (error) {
    // 处理错误情况，返回适当的错误响应
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Record failed',
      error: error.message,
    });
  }
};

const weeklyAmount = async (req, res) =>{
  try {
    const { account, weekId } = req.body;
    // 返回一周内烟量
    const weeklySum = await userService.getWeeklyAmount(account, weekId);

    res.status(200).json({
      success: true,
      weekId: weekId,
      weeklySum: weeklySum
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Record failed',
      error: error.message, 
    });
  }
};

const monthlyAmount = async (req, res) =>{
  try {
    const { account, yearId } = req.body;
    const monthlySum = await userService.getMonthlyAmount(account, yearId);

    res.status(200).json({
      success: true,
      yearId: yearId,
      monthlySum: monthlySum
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Record failed',
      error: error.message, 
    }); 
  }
};



const getUserById = async (req, res) => {
  try {
      const userId = req.params.userId; // 或从令牌中获取ID
      const user = await userService.getUserById(userId);
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
  
module.exports = {
  register,
  login,
  authenticateToken,
  getUserByAccount,
  getUserById,
  record,
  weeklyAmount,   // 统计周烟量
  monthlyAmount
 
};
