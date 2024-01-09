const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // 替换为您的数据库配置文件路径
const User = require('./user'); // 导入User模型

const Blog = sequelize.define('blogs', {
  // 博客ID
  blogId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 关联的用户ID
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id' // 确保这是用户表的主键
    }
  },
  // 博客标题
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // 博客内容
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  // 博客封面图片URL
  coverImage: {
    type: DataTypes.STRING
  },
  // 博客简介
  description: {
    type: DataTypes.TEXT
  },
  // 创建时间和更新时间可以自动管理
  // 其他字段如浏览量和点赞量可以根据需求添加
});

User.hasMany(Blog, { foreignKey: 'userId' });
Blog.belongsTo(User, { foreignKey: 'userId' });

module.exports = Blog;
DailyRecord.sync({force:true}).then(()=>{
	console.log('成功');
	process.exit() // 成功之后退出，否则会一直在后台运行
}) //执行并写入数据库，force是如果数据库中有user表，则删除，重新写入数据。