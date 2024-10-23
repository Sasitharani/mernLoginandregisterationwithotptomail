const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(`mongodb+srv://sasitharan:sasi@learn.vfrd0.mongodb.net/${process.env.DBNAME}`)
.then( async (res)=>{
    app.listen(process.env.SERVER_PORT)
    console.log(process.env.SERVER_PORT)
})

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  otp: String,
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  const user = new User({ username, email, password: hashedPassword, otp });
  await user.save();

  // Send OTP email
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "sasitharani@gmail.com",
      pass: "wmypggyvjykuqhkw",
    },
  });

  const mailOptions = {
    from: 'test@gmail.com',
    to: 'sasitharani@gmail.com',
    subject: 'OTP Verification',
    text: `Your OTP is ${otp}`,
  };



  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('OTP sent');
  });
});

app.post('/verify-otp', async (req, res) => {
  const { username, otp } = req.body;
  const user = await User.findOne({ username });

  if (user && user.otp === otp) {
    res.status(200).send('User successfully created. Please login.');
  } else {
    res.status(400).send('Invalid OTP');
  }
});

  console.log('Server is running on port '+process.env.SERVER_PORT);

