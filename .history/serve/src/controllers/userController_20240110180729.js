// controllers/userController.js
const userService = require('../services/userService');
const bcrypt = require('bcryptjs');  
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // 假设你有一个 User 模型
const DailyRecord = require('../models/DailyRecord');
const res = require('express/lib/response');
const CheckinRecord = require('../models/CheckinRecord');
const sequelize = require('../models/db');
const req = require('express/lib/request');


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
  const t = await sequelize.transaction();

  try {
    // 从请求中获取用户提供的注册信息
    const { account, date, smokingType, smokingAmount, smokingExpenses } = req.body;

    // 查询是否存在具有相同 date 和 smokingType 的记录
    const existingRecord = await DailyRecord.findOne({
      where: { account, date, smokingType },
    }, { transaction: t });
    // 转为浮点型变量
    const smokingAmountFloat = parseFloat(smokingAmount); 
    if (existingRecord) {
      // 如果记录已存在，将新记录的 smokingAmount 和 smokingExpenses 添加到旧记录中
      existingRecord.smokingAmount += smokingAmountFloat;
      existingRecord.smokingExpenses += smokingExpenses;
      // 保存更新后的记录
      await existingRecord.save();
      // 返回成功响应
      res.status(201).json({
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
      }, { transaction: t });

      res.status(201).json({
        success: true,
        message: 'User record successfully',
        record: newRecord,
      });
    }

    // 查询 CheckinRecord 表中是否存在记录
    const checkinRecord = await CheckinRecord.findOne({
      where: {
        account,
        checkinDate: date,
      },
      transaction: t,
    });

    if (checkinRecord) {
      // 如果记录存在，更新 status
      await checkinRecord.update({ status: false }, { transaction: t });
    } else {
      // 如果记录不存在，创建新记录
      await CheckinRecord.create({
        account,
        checkinDate: date,
        status: false,
      }, { transaction: t });
    }

    // 提交事务
    await t.commit();
  } catch (error) {
    // 处理错误情况，返回适当的错误响应
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Record failed',
      error: error.message,
    });
    await t.rollback();
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

const yearlyAmount = async (req, res) => {
  try {
    const account = req.body.account;
    const yearlySum = await userService.getYearlyAmount(account);

    res.status(200).json({
      success: true,
      yearlySum: yearlySum
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Record failed',
      error: error.message, 
    }); 
  }
};

const Spending = async (req, res) => {
  try {
    const {account, type} = req.body;
    const SpendingNumber = await userService.getSpending(account, type);

    res.status(200).json({
      success: true,
      SpendingNumber: SpendingNumber
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Record failed',
      error: error.message, 
    }); 
    
  }
}

const getshowCheckin = async (req, res) => {

  try {
    const account = req.body.account;
    const checkinRecords = await userService.showCheckin(account);
    res.status(200).json({
      success: true,
      checkinRecords: checkinRecords
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Record failed',
      error: error.message, 
    }); 
    
  }

};

const getfailedRecord = async(req, res) =>{
  try {
    const {account, date} = req.body;
    const result = await userService.failedRecord(account, date);
    res.status(200).json({
      success: true,
      result:result
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Record failed',
      error: error.message, 
    }); 
    
  }
};

const getsuccessRecord = async(req, res) =>{
  try {
    const {account, date} = req.body;
    const result = await userService.successRecoed(account, date);
    if(result == 0){
      res.status(200).json({
        success: true,
        result:0
      });
    }else{
      res.status(200).json({
        success: true,
        result:1
      });

    }
    
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Record failed',
      error: error.message, 
    }); 
    
  }
};

const createBlogPost = async (req, res) => {
  try {
    const blogData = req.body;
    const blog = await userService.createBlog(blogData);
    res.status(201).json({ success: true, message: '博客创建成功', blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = req.body;
    // 可以在这里添加更多的数据验证逻辑
    const updatedUser = await userService.updateUser(userId, data);
    res.json({ success: true, message: '用户信息更新成功', user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getsumofMonth = async (req, res) => {
  try {
    const account = req.body.account;
    const sum = await userService.showSumofMonth(account);

    res.status(200).json({
      success: true,
      sum: sum
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Record failed',
      error: error.message, 
    }); 
    
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId); // 获取URL中的用户ID
    const blogs = await userService.getUserBlogs(userId);
    res.json({ success: true, blogs: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await userService.getAllBlogs();
    res.json({ success: true, blogs: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const uploadImage = (req, res) => {
  upload.single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // 发生错误时的处理
      return res.status(500).json({ success: false, message: err.message });
    } else if (err) {
      // 发生未知错误时的处理
      return res.status(500).json({ success: false, message: err.message });
    }

    // 文件上传成功，处理后续逻辑
    // 假设文件保存在本地 'uploads/' 目录
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ success: true, url: fileUrl });
  });
};
const getBlogDetail = async (req, res) => {
  try {
    const blogId = req.params.blogId; // 从URL参数中获取blogId
    const blog = await userService.getBlogById(blogId);
    res.json(blog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
  
module.exports = {
  register,
  login,
  authenticateToken,
  getUserByAccount,
  getUserById,
  record,
  getBlogDetail,
  weeklyAmount,   // 统计周烟量
  monthlyAmount,   
  yearlyAmount,   // 年统计量
  Spending,
  updateUser,   
  createBlogPost,  
  getshowCheckin,
  getUserBlogs,
  getAllBlogs,
  uploadImage,




  getfailedRecord,
  getsuccessRecord,
  getsumofMonth

};
