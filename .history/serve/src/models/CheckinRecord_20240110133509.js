// 打卡记录表

const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./user');

// 定义 CheckinRecord 模型
const CheckinRecord = sequelize.define('CheckinRecord', {
    account: {
      type: DataTypes.INTEGER, // 假设账户是字符串类型
      allowNull: false,
    },
    checkinDate: {
      type: DataTypes.DATEONLY, // 只存储日期部分
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },  
  },
  {
    // 创建唯一索引以模拟联合主键
    indexes: [
      {
        unique: true,
        fields: ['account', 'checkinDate'],
      },
    ],
  }  
  );

  User.hasMany(CheckinRecord, { foreignKey: 'account', sourceKey: 'id' });
  // 在 DailyRecord 模型中
  CheckinRecord.belongsTo(User, { foreignKey: 'account', targetKey: 'id' });



  同步数据库以创建表
    CheckinRecord.sync({ force: false })
    .then(() => {
    console.log('CheckinRecord 表已创建或存在');
    })
    .catch((error) => {
    console.error('无法创建 CheckinRecord 表:', error);
    });


  module.exports = CheckinRecord;