// 导入 User 模型
const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./user');


//可能存在冗余较多,暂不设置主键
const DailyRecord = sequelize.define('daily_record', {
  account: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  smokingAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  additionalNotes: {
    type: DataTypes.TEXT,
  },
});

// 在 User 和 DailyRecord 之间建立外键关系
User.hasMany(DailyRecord, { foreignKey: 'account', sourceKey: 'account' });
DailyRecord.belongsTo(User, { foreignKey: 'account', targetKey: 'account' });


DailyRecord.sync({force:true}).then(()=>{
	console.log('成功');
	process.exit() // 成功之后退出，否则会一直在后台运行
}) //执行并写入数据库，force是如果数据库中有user表，则删除，重新写入数据。
// force最好不写，容易报错 表不存在