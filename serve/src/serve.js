const express = require('express');
const cors = require('cors');
const app = express();
const userController = require('./controllers/userController');  // Add this line

app.use(express.json());
app.use(cors());

app.post('/api/user/register', userController.register);
app.get('/api/data', (req, res) => {
  // Handle the request and return data
  res.json({ message: 'Backend development plan initiated!' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
