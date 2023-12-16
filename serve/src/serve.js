const express = require('express');
const cors = require('cors');
const app = express();
const userController = require('./controllers/userController');  // Add this line


app.use(express.json());
app.use(cors());

app.post('/api/user/register', userController.register);  // 注册
app.post('/api/user/login', userController.login);    //登录

app.get('/api/data', (req, res) => {
  // Handle the request and return data
  res.json({ message: '前后端连接成功' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
