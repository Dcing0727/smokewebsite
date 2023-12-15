//const { sequelize, testConnection } = require('./models/db');
//testConnection();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())

app.get('/api/data', (req, res) => {
  // 处理请求并返回数据
  res.json({ message: '后端开发计划启动!' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
