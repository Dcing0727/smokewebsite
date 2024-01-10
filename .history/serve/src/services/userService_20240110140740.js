// services/userService.js

const User = require('../models/user'); 
const bcrypt = require('bcryptjs');
const DailyRecord = require('../models/DailyRecord');
const { Sequelize } = require('sequelize'); 
const { type } = require('express/lib/response');
const res = require('express/lib/response');
const CheckinRecord = require('../models/CheckinRecord');
const Blog = require('../models/Blog'); // 确保路径正确
//const sequelize = require('./db');

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

// const recordDaily = async (account, date, smokingType, smokingAmount, smokingExpenses) => {
//   try {
//     // 创建新戒烟记录
//     const newRecord = await DailyRecord.create({
//       account,
//       date,
//       smokingType,
//       smokingAmount,
//       smokingExpenses
//       // 其他用户信息字段...
//     });
//     return newRecord;
//   } catch (error) {
//     // 处理错误，比如用户名重复等
//     console.error('Error in recordDaily from userService.js:', error);
//     throw new Error('Error in recordDaily from userService.js:');
//   }
// };

// const recordDaily = async (account, date, smokingType, smokingAmount, smokingExpenses) => {
//   const t = await sequelize.transaction();

//   try {
//     // 在 DailyRecord 表中创建新戒烟记录
//     const newRecord = await DailyRecord.create({
//       account,
//       date,
//       smokingType,
//       smokingAmount,
//       smokingExpenses,
//     }, { transaction: t });

//     // 查询 CheckinRecord 表中是否存在记录
//     const checkinRecord = await CheckinRecord.findOne({
//       where: {
//         account,
//         checkinDate: date,
//       },
//       transaction: t,
//     });

//     if (checkinRecord) {
//       // 如果记录存在，更新 status
//       await checkinRecord.update({ status: false }, { transaction: t });
//     } else {
//       // 如果记录不存在，创建新记录
//       await CheckinRecord.create({
//         account,
//         checkinDate: date,
//         status: false,
//       }, { transaction: t });
//     }

//     // 提交事务
//     await t.commit();

//     return newRecord;
//   } catch (error) {
//     // 如果发生错误，回滚事务
//     await t.rollback();
//     console.error('Error in recordDaily from userService.js:', error);
//     throw new Error('Error in recordDaily from userService.js:');
//   }
// };







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
  const formattedDate = new Date();
  const year = formattedDate.getFullYear();
  const month = String(formattedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(formattedDate.getDate()).padStart(2, '0');

  const date = `${year}-${month}-${day}`;
  const today = new Date(date)
    
  // 测试接口
  //const today = new Date(specificDate)
  const recentFourWeeks = [];

  for (let i = 0; i < 4; i++) {
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (i * 7 + today.getDay())); // Start from Sunday of each week

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // End on Saturday of each week

    recentFourWeeks.push({
      startDate: startDate.toISOString().split('T')[0], // Format as 'YYYY-MM-DD'
      endDate: endDate.toISOString().split('T')[0],
    });
  }

  return recentFourWeeks.reverse();  // Reverse the order to have Sunday to Saturday
}


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

// 月统计代码
// 获取最近五年内每月的起始和结束日期
const getRecentFiveYearsMonths = () => {
  const today = new Date();
  const recentFiveYearsMonths = [];

  for (let i = 0; i < 5; i++) {
    const year = today.getFullYear() - i;

    for (let month = 1; month <= 12; month++) {
      const startDate = new Date(year, month-1, 1);
      const endDate = new Date(year, month, 0);

      recentFiveYearsMonths.push({
        startMonth: startDate.toISOString().split('T')[0], // Format 'YYYY-MM-DD'
        endMonth: endDate.toISOString().split('T')[0],
      });
    }
  }

  return recentFiveYearsMonths.sort((a, b) => {
    return a.startMonth.localeCompare(b.startMonth);
  });
};


// 获取指定年份的每月起始日期
const getMonthsInYear = (yearObject) => {
  console.log('Start Month in getMonthsInYear:', yearObject.startMonth);

  const monthsInYear = [];

  console.log('Year Object in getMonthsInYear:', yearObject);

  for (let month = 0; month < 12; month++) {
    const startDate = new Date(yearObject.startMonth);

    console.log('Month:', month + 1);
    console.log('Start Date:', startDate);

    const newDate = new Date(
      yearObject.startMonth && yearObject.startMonth.getFullYear(),
      (yearObject.startMonth && yearObject.startMonth.getMonth()) + month,
      1
    );

    console.log('New Date:', newDate);

    if (!isNaN(newDate.getTime())) {
      const formattedDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-01`;
      monthsInYear.push(formattedDate);
    } else {
      console.error('Invalid date:', newDate);
    }
  }

  return monthsInYear;
};




// 获取每月吸烟量列表
const getMonthlyAmount = async (account, yearId) => {
  const recentFiveYears = getRecentFiveYearsMonths();

  // 确保 yearId 在有效范围内
  if (yearId < 1 || yearId > 5) {
    throw new Error("Invalid yearId");
  }

  // 获取指定年份的记录
  const startIndex = (yearId - 1) * 12;
  const endIndex = startIndex + 11;
  const yearObjects = recentFiveYears.slice(startIndex, endIndex + 1);

  try {
    const monthlyAmountsList = [];

    // 遍历 yearObjects，对每个记录进行查询并相加
    for (const yearObject of yearObjects) {
      const monthlyAmount = await DailyRecord.findOne({
        attributes: [
          [Sequelize.fn('DATE_FORMAT', Sequelize.col('date'), '%Y-%m-01'), 'formattedDate'], // Use formatted date in SELECT
          [Sequelize.fn('SUM', Sequelize.col('smokingAmount')), 'totalSmokingAmount'],
        ],
        where: {
          account: account,
          date: {
            [Sequelize.Op.between]: [yearObject.startMonth, yearObject.endMonth],
          },
        },
        group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('date'), '%Y-%m-01')], // Group by the formatted date
        raw: true,
      });

      // 将每月的吸烟量添加到列表中，并转换为整数
      monthlyAmountsList.push(monthlyAmount ? parseInt(monthlyAmount.totalSmokingAmount) : 0);
    }

    return monthlyAmountsList;
  } catch (error) {
    throw error;
  }
};

const getMonthlyAmountList = (dailyAmounts, yearObjects) => {
  // 初始化月统计列表，全部置为0
  const monthlyAmountsList = Array.from({ length: 12 }, () => 0);

  // 遍历数据库中的结果，将统计结果放到对应的月份位置
  for (const dailyAmount of dailyAmounts) {
    const monthIndex = findMonthIndex(yearObjects, dailyAmount.date);
    if (monthIndex !== -1) {
      monthlyAmountsList[monthIndex] = dailyAmount.totalSmokingAmount;
    }
  }

  return monthlyAmountsList;
};

const findMonthIndex = (yearObjects, date) => {
  // 根据日期查找在yearObjects中的索引
  const index = yearObjects.findIndex(obj => obj.startMonth === date);
  return index;
};

const getRecentFiveYears = () => {
  const currentYear = new Date().getFullYear();
  const recentFiveYears = [];

  for (let i = 0; i < 5; i++) {
    const startOfYear = new Date(currentYear - i, 0, 1); // 月份是从 0 开始的，0 表示一月
    const endOfYear = new Date(currentYear - i, 11, 31);

    const startDateString = startOfYear.toISOString().split('T')[0];
    const endDateString = endOfYear.toISOString().split('T')[0];

    recentFiveYears.push({
      year: currentYear - i,
      startDate: startDateString,
      endDate: endDateString
    });
  }

  return recentFiveYears;
};

// 统计一整年的吸烟量
const getYearlyAmount = async (account) => {
  const recentFiveYears = getRecentFiveYears();

  try {
    const yearlyAmountsList = [];

    // 遍历过去的五年
    for (const yearObject of recentFiveYears) {
      console.log(`Querying for year ${yearObject.year}...`);
      const yearlyAmount = await DailyRecord.findOne({
        attributes: [
          [Sequelize.fn('YEAR', Sequelize.col('date')), 'year'], // 从日期中提取年份
          [Sequelize.fn('SUM', Sequelize.col('smokingAmount')), 'totalSmokingAmount'],
        ],
        where: {
          account: account,
          date: {
            [Sequelize.Op.between]: [yearObject.startDate, yearObject.endDate],
          },
        },
        group: [Sequelize.fn('YEAR', Sequelize.col('date'))], // 添加 GROUP BY 子句
        raw: true,
      });

      // 检查 yearlyAmount 是否为 null
      const year = yearlyAmount ? parseInt(yearlyAmount.year) : parseInt(yearObject.year);
      const totalSmokingAmount = yearlyAmount ? parseInt(yearlyAmount.totalSmokingAmount) : 0;

      // 将年度吸烟量添加到列表中
      yearlyAmountsList.push({
        year,
        totalSmokingAmount,
      });
    }

    return yearlyAmountsList;
  } catch (error) {
    throw error;
  }
};

//获取当前月份的起始日期和结束日期
const getCurrentMonthDates = () => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const startDateString = firstDayOfMonth.toISOString().split('T')[0];
  const endDateString = lastDayOfMonth.toISOString().split('T')[0];

  return {
    startDate: startDateString,
    endDate: endDateString,
  };
};

const getAllSmokingTypes = () => {
  // 返回所有烟的类型的数组
  return [0, 1, 2, 3, 4, 5, 6];
};

// 7种烟
const getSpending = async(account, type) =>{
  try {
      var startDate;
      var endDate;
      if (type == 1){
        // 近一年的烟量统计
        const recentFiveYears = getRecentFiveYears();
        startDate = recentFiveYears[0].startDate;
        endDate = recentFiveYears[0].endDate;
        
      }else if (type == 2){
        // 近一个月
        const result = getCurrentMonthDates()
        startDate = result.startDate;
        endDate = result.endDate;
      }else{
        // 近一周
        const result = getRecentFourWeeks();
        startDate = result[3].startDate;
        endDate = result[3].endDate;
      }
      const allSmokingTypes = getAllSmokingTypes();

      const smokingExpensesList = await DailyRecord.findAll({
        attributes: [
          'smokingType',
          [Sequelize.fn('SUM', Sequelize.col('smokingExpenses')), 'totalExpenses'],
        ],
        where: {
          account: account,
          date: {
            [Sequelize.Op.between]: [startDate, endDate],
          },
        },
        group: ['smokingType'],
        raw: true,
      });

      const expensesMap = new Map();

      // 初始化 map，将所有烟的类型放入 map 中，初始花销设为 0
      allSmokingTypes.forEach((type) => {
        expensesMap.set(type, 0);
      });

      // 遍历查询结果，更新 map 中对应烟的花销
      smokingExpensesList.forEach((item) => {
        expensesMap.set(item.smokingType, parseInt(item.totalExpenses));
      });

      // 将 map 转换为数组，作为最终结果返回
      return Array.from(expensesMap, ([smokingType, totalExpenses]) => ({
        smokingType,
        totalExpenses,
      }));

  } catch (error) {
    throw error;
  }

};

// 在日历上显示打卡记录
const showCheckin = async (account) => {
  const period = getCurrentMonthDates();

  try {
    const checkinRecords = await CheckinRecord.findAll({
      attributes: ['checkinDate', 'status'],
      where: {
        account,
        checkinDate: {
          [Sequelize.Op.between]: ['2000-01-01', period.endDate],
        },
      },
      raw: true,
    });

    return checkinRecords;
  } catch (error) {
    console.error('Error in showCheckin:', error);
    throw error;
  }
};

const showSumofMonth = async (account) => {
  const period = getCurrentMonthDates();

  try {
    const recordCount = await CheckinRecord.count({
      where: {
        account: account,
        checkinDate: {
          [Sequelize.Op.between]: [period.startDate, period.endDate]
        },
        status: 1
      }
    });

    return recordCount;
  } catch (error) {
    console.error('查询出错：', error);
    throw error;
  }
};



// 使用示例
const updateUser = async (userId, data) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    await user.update(data);
    return user;
  } catch (error) {
    throw error;
  }
};
















// 失败打卡
const failedRecord = async (account, date) => {
  try {
    // 尝试查询 CheckinRecord 表中是否有记录
    const existingRecord = await CheckinRecord.findOne({
      where: {
        account: account,
        checkinDate: date,
      },
    });

    if (existingRecord) {
      // 如果存在记录，则更新 status 字段为 0
      await existingRecord.update({ status: 0 });
    } else {
      // 如果不存在记录，则创建新记录
      await CheckinRecord.create({
        account: account,
        checkinDate: date,
        status: 0,
      });
    }

    console.log('操作成功');
  } catch (error) {
    console.error('操作失败', error);
  }
};

const successRecoed = async (account, date) =>{
  try {
    // 尝试查询 CheckinRecord 表中是否有记录
    const existingRecord = await CheckinRecord.findOne({
      where: {
        account: account,
        checkinDate: date,
      },
    });

    if (existingRecord) {
      return 0;
    }else{
      const successrecord = await CheckinRecord.create({
        account: account,
        checkinDate: date,
        status: 1,
      });
      return successrecord;

    }
    
  } catch (error) {
    console.error('操作失败', error);
  }
};




// const recentMonths = getMonthlyAmount(1, 5);
// console.log(recentMonths);

//console.log(getRecentFiveYearsMonths());

// 单元测试代码
// const specificDate = new Date('2024-12-08'); 
// const result = getRecentFourWeeks();
// console.log(result);


const createBlog = async (blogData) => {
  try {
    const blog = await Blog.create(blogData);
    return blog;
  } catch (error) {
    throw error;
  }
};

const getUserBlogs = async (userId) => {
  try {
    const blogs = await Blog.findAll({
      where: { userId: userId },
      order: [['createdAt', 'DESC']] // 根据创建时间降序排列
    });
    return blogs;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserByAccount,
  getUserById,
  createBlog,
  //recordDaily,
  getWeeklyAmount,
  getMonthlyAmount,
  getYearlyAmount,
  getSpending,
  showCheckin,
  updateUser,
  getUserBlogs,




  failedRecord,
  successRecoed,
  showSumofMonth

  // 其他用户服务方法的导出
};