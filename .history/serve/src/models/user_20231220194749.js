// models/user.js

const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // 请替换为你的数据库配置文件路径

const User = sequelize.define('users', {
  // 必须项
  account: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  //后续应该改为哈希映射形式，数据库不应当存储用户明文密码。
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    //allowNull: false,       //加上注册时会报错
  },
  // 非必须项，可后续添加
  avatar: {
    type: DataTypes.STRING,  //用户头像
  },
  nickname: {
    type: DataTypes.STRING,  //用户昵称
  },
  hobby: {
    type: DataTypes.STRING, //用户爱好
  },
  bio: {
    type: DataTypes.TEXT,//用户简介
  },
});

// 使用 await 等待同步完成
// (async () => {
//   await sequelize.sync();
//   console.log('模型同步成功');

//   // 插入数据
//   try {
//     const user = await User.create({
//       account: 'zero',
//       password: '12345',
//       gender: 'male',
//       avatar: 'url_to_avatar',
//       nickname: 'John',
//       hobby: 'programming',
//       bio: 'A passionate developer',
//     });
//     console.log('成功插入数据:', user.toJSON());
//   } catch (error) {
//     console.error('插入数据时出错:', error);
//   }
// })();

// User.sync({force:true}).then(()=>{
// 	console.log('成功');
// 	process.exit() // 成功之后退出，否则会一直在后台运行
// }) //执行并写入数据库，force是如果数据库中有user表，则删除，重新写入数据。
// // force最好不写，容易报错 表不存在

module.exports = User;


