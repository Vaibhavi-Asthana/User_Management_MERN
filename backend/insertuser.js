require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./model/user');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const newUser = new User({
  username: 'myNAME',
  email: 'myemail@gmail.com',
  password: '123'
});

newUser.save()
.then(() => {
  console.log('User inserted successfully');
  mongoose.connection.close();
})
.catch((error) => {
  console.error('Error inserting user:', error);
  mongoose.connection.close();
});
