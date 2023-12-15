// db.js用于与数据库建立连接
// 启动mysql服务 命令行 net start mysql
// 停止mysql服务 命令行 net stop mysql 
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test', 'root', '20185774', {  //三个参数分别为数据库名称、用户名、密码
  host: 'localhost',
  dialect: 'mysql',
});

// 测试数据库连接
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('连接数据库 successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  sequelize,
  testConnection,
};
