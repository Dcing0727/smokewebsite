// services/userService.js

const User = require('../models/user'); 
const bcrypt = require('bcryptjs');
const DailyRecord = require('../models/DailyRecord');
const { Sequelize } = require('sequelize'); 

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
const getUserByAccount = async (account) => {
  try {
      const user = await User.findOne({ where: { account } });
      return user;
  } catch (error) {
      throw error;
  }
};

const recordDaily = async (account, date, smokingType, smokingAmount, smokingExpenses) => {
  try {
    // 创建新戒烟记录
    const newRecord = await DailyRecord.create({
      account,
      date,
      smokingType,
      smokingAmount,
      smokingExpenses
      // 其他用户信息字段...
    });
    return newRecord;
  } catch (error) {
    // 处理错误，比如用户名重复等
    console.error('Error in recordDaily from userService.js:', error);
    throw new Error('Error in recordDaily from userService.js:');
  }
};
const getUserById = async (userId) => {
  try {
      const user = await User.findByPk(userId);
      if (!user) {
          throw new Error('User not found');
      }
      return user;
  } catch (error) {
      throw error;
  }
};


function getRecentFourWeeks() {
  const today = new Date();
  const recentFourWeeks = [];
  for (let i = 0; i < 4; i++) {
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (i * 7 + today.getDay())); // Start from Sunday of each week
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // End on Saturday of each week

    recentFourWeeks.push({
      startDate: startDate.toISOString().split('T')[0], // 格式 'YYYY-MM-DD'
      endDate: endDate.toISOString().split('T')[0],
    });
  }

  return recentFourWeeks;
}
// const getWeeklyAmount = async (account, weekId) => {
//   const recentFourWeeks = getRecentFourWeeks();
//   const startDateOfRecentWeek = recentFourWeeks[weekId - 1].startDate;
//   const endDateOfRecentWeek = recentFourWeeks[weekId - 1].endDate;

//   try {
//     const dailyAmounts = await DailyRecord.findAll({
//       attributes: [
//         'date',
//         [Sequelize.fn('SUM', Sequelize.col('smokingAmount')), 'totalSmokingAmount'],
//       ],
//       where: {
//         account: account,
//         date: {
//           [Sequelize.Op.between]: [startDateOfRecentWeek, endDateOfRecentWeek],
//         },
//       },
//       group: ['date'],
//       raw: true, // Make sure to get raw data
//     }) || 0;

//     const dailyAmountsList = dailyAmounts.map((entry) => entry.totalSmokingAmount);
    
//     return dailyAmountsList || [];
//   } catch (error) {
//     throw error;
//   }
// };

const getWeeklyAmount = async (account, weekId) => {
  const recentFourWeeks = getRecentFourWeeks();
  const startDateOfRecentWeek = recentFourWeeks[weekId - 1].startDate;
  const endDateOfRecentWeek = recentFourWeeks[weekId - 1].endDate;

  try {
    const dailyAmounts = await DailyRecord.findAll({
      attributes: [
        'date',
        [Sequelize.fn('SUM', Sequelize.col('smokingAmount')), 'totalSmokingAmount'],
      ],
      where: {
        account: account,
        date: {
          [Sequelize.Op.between]: [startDateOfRecentWeek, endDateOfRecentWeek],
        },
      },
      group: ['date'],
      raw: true, 
    }) || [];

    const dailyAmountsList = getWeeklyAmountList(dailyAmounts, recentFourWeeks[weekId - 1]);

    return dailyAmountsList;
  } catch (error) {
    throw error;
  }
};

const getWeeklyAmountList = (dailyAmounts, week) => {
  const daysInWeek = getDaysInWeek(week.startDate, week.endDate);
  const dailyAmountsList = [];

  for (const day of daysInWeek) {
    const foundEntry = dailyAmounts.find((entry) => entry.date === day);

    if (foundEntry) {
      dailyAmountsList.push(foundEntry.totalSmokingAmount);
    } else {
      dailyAmountsList.push(0);
    }
  }

  // 转换数组中的所有值为整数类型
  const dailyAmountsListInt = dailyAmountsList.map(value => parseInt(value, 10));

  return dailyAmountsListInt;
};


const getDaysInWeek = (startDate, endDate) => {
  const daysInWeek = [];
  let currentDate = new Date(startDate);
  const finalDate = new Date(endDate); // 转换endDate为Date对象

  while (currentDate <= finalDate) {
    daysInWeek.push(currentDate.toISOString().split('T')[0]);
    currentDate = new Date(currentDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return daysInWeek;
};







module.exports = {
  registerUser,
  loginUser,
  getUserByAccount,
  getUserById,
  recordDaily,
  getWeeklyAmount
  // 其他用户服务方法的导出
};
