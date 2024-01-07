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

// function getRecentFourWeeks() {
//   //const today = new Date();
//   const date = new Date();
//   const today = date.toLocaleDateString();
//   const recentFourWeeks = [];

//   for (let i = 0; i < 4; i++) {
//     const startDate = new Date(today);
//     startDate.setDate(today.getDate() - (i * 7 + today.getDay())); // Start from Sunday of each week

//     const endDate = new Date(startDate);
//     endDate.setDate(startDate.getDate() + 6); // End on Saturday of each week

//     recentFourWeeks.push({
//       startDate: startDate.toISOString().split('T')[0], // Format as 'YYYY-MM-DD'
//       endDate: endDate.toISOString().split('T')[0],
//     });
//   }

//   return recentFourWeeks.reverse();  // Reverse the order to have Sunday to Saturday
// }
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





// const recentMonths = getMonthlyAmount(1, 5);
// console.log(recentMonths);

//console.log(getRecentFiveYearsMonths());

// 单元测试代码
// const specificDate = new Date('2024-12-08'); 
// const result = getRecentFourWeeks(specificDate);
// console.log(result);

module.exports = {
  registerUser,
  loginUser,
  getUserByAccount,
  getUserById,
  recordDaily,
  getWeeklyAmount,
  getMonthlyAmount
  // 其他用户服务方法的导出
};