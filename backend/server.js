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
    try {
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
  
      const info = await transporter.sendMail({
        from: '"OTP 👻" <sasitharani@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "OTP", // Subject line
        text: "Registration details", // plain text body
        html: `<html>
                <head></head>
                <body>
                  <table border="1" cellpadding="10">
                    <tr>
                      <th>Name</th>
                      <td>${username}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>${email}</td>
                    </tr>
                    <tr>
                      <th>OTP</th>
                      <td>${otp}</td>
                    </tr>
                  </table>
                </body>
              </html>`, // html body
      });
  
      res.status(200).send('OTP sent');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending OTP email');
    }
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

