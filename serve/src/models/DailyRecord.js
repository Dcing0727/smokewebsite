// 用于创建用户戒烟记录表

// 导入 User 模型
const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./user');


// account与smokingType联合主键
const DailyRecord = sequelize.define('daily_record', {
  account: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  smokingType: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  smokingAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  smokingExpenses: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  additionalNotes: {
    type: DataTypes.TEXT,
  },
}, {
  // 创建唯一索引以模拟联合主键
  indexes: [
    {
      unique: true,
      fields: ['account', 'smokingType'],
    },
  ],
});

// 在 User 和 DailyRecord 之间建立外键关系
// 在 User 模型中
User.hasMany(DailyRecord, { foreignKey: 'account', sourceKey: 'id' });
// 在 DailyRecord 模型中
DailyRecord.belongsTo(User, { foreignKey: 'account', targetKey: 'id' });


module.exports = DailyRecord;



// DailyRecord.sync({force:true}).then(()=>{
// 	console.log('成功');
// 	process.exit() // 成功之后退出，否则会一直在后台运行
// }) //执行并写入数据库，force是如果数据库中有user表，则删除，重新写入数据。
