// Create a basic server setup:
/*const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});*/


// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const User = require('./model/user');
const bcrypt = require('bcrypt');

const app = express();

par=app.use(bodyParser.json());
console.log(par)
app.get('/', (req, res) => {
  // res.send('Hello World!');
  res.json(req.body)
});

//const mongoose = require('mongoose');

//mongoose.connect('mongodb+srv://<username>:<password>@<cluster>/<database>', {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
//})


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
  // Example route to test User model
app.post('/test', async (req, res) => {
  try {
    const newUser = new User({ username: 'Hi Doe', email: 'hidoe@gmail.com', password: 'newtest' });
    await newUser.save();
    res.status(200).send('User saved successfully');
    res.status(201).json(newUser); // Respond with the created user object
  } catch (error) {
    res.status(500).send('YOU HAVE REACHED THE ERROR CATCH OF newUser Create !!!' + error.message);
  }
});
app.post('/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const user = new User({ username, email, password: hashedPassword, otp });
    await user.save();
    // await sendEmail(email, 'Email Confirmation', `Your OTP is ${otp}`);
    res.status(201).json({ message: 'User registered. Check your email for OTP.' });
  } catch (error) {
    // res.status(400).json({ error: 'User registration failed.' });
    res.status(500).send('YOU HAVE REACHED THE ERROR CATCH AUTH_SIGNUP Create !!!' + error.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
},debug=true);
