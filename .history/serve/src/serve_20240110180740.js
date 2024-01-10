const express = require('express');
const cors = require('cors');
const app = express();
const userController = require('./controllers/userController');  // Add this line
// 配置静态文件服务
app.use('/uploads', express.static('uploads'));


app.use(express.json());
app.use(cors());

app.post('/api/user/register', userController.register);  // 注册
app.post('/api/user/login', userController.login);    // 登录
app.get('/api/user/id/:userId', userController.getUserById); // 新增路由
app.post('/api/user/weekly', userController.weeklyAmount);
app.post('/api/user/monthly', userController.monthlyAmount);
app.post('/api/user/yearly', userController.yearlyAmount);
app.post('/api/user/spend', userController.Spending);
app.post('/api/user/checkin', userController.getshowCheckin);
app.post('/api/user/sum', userController.getsumofMonth);
app.put('/api/user/update/:userId', userController.updateUser);
app.post('/api/blog', userController.createBlogPost);
app.get('/api/user-blogs/:userId', userController.getUserBlogs);
app.get('/api/blogs', userController.getAllBlogs);
app.post('/api/upload', userController.uploadImage);
app.get('/api/blog/:blogId', userController.getBlogDetail);


app.post('/api/user/failed', userController.getfailedRecord);
app.post('/api/user/success', userController.getsuccessRecord);

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
