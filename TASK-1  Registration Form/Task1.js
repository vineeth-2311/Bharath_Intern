const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// User model
const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String
});

// Route to serve HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route to handle form submission
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  
  // Create a new user
  const newUser = new User({
    username,
    email,
    password
  });

  // Save the user to the database
  newUser.save()
    .then(() => {
      res.send('Registration successful!');
    })
    .catch(err => {
      res.status(400).send('Registration failed!');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
