const express = require('express');
const cors = require('cors');
const app = express();
const userController = require('./controllers/userController');  // Add this line


app.use(express.json());
app.use(cors());

app.post('/api/user/register', userController.register);  // 注册
app.post('/api/user/login', userController.login);    // 登录
app.get('/api/user/id/:userId', userController.getUserById); // 新增路由
app.post('/api/user/weekly', userController.weeklyAmount);

// 服务器端代码示例
app.get('/api/user/:account', userController.getUserByAccount);
app.get('/api/auth/verify', userController.authenticateToken, (req, res) => {
  // 令牌验证成功，可以在 req.user 中获取用户信息
  res.status(200).json({ success: true, user: req.user });
});
app.post('/api/user/record', userController.record);

app.get('/api/data', (req, res) => {
  // Handle the request and return data
  res.json({ message: '前后端连接成功' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
