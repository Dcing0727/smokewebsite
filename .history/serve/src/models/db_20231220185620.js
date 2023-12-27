// db.js用于与数据库建立连接、设定一些数据库参数
// 启动mysql服务 命令行 net start mysql
// 停止mysql服务 命令行 net stop mysql 
const { Sequelize } = require('sequelize');     //ORM模型

// 第一个参数：连接的数据库名
// 第二个参数：数据库的用户名
// 第三个参数：数据库的密码
const mysql = new Sequelize('smoking_website', 'root', 'root', {
    dialect: 'mysql',       // 这里可以改成任意一种关系型数据库
    host: 'localhost',      // 数据库服务器
    timezone: '+08:00',     // 这里是东八区，默认为0时区
    pool: {                 // 使用连接池
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
module.exports = mysql;

测试连接是否成功
(async () => {
    try {
        await mysql.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();   // 多一个括号表示调用方法

