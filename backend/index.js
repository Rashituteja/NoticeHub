require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { noticeModel } = require('./model/notice');
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const app = express();


app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));

app.use(bodyParser.json());
// configure cloudianry
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


  // Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'notices',
    resource_type: 'auto'
  }
});
const upload = multer({ storage: storage });

function isAdmin(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated() && req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ error: 'Only admin can delete notices' });
}
// app.get('/notices', async(req, res)=>{
// let tempnotice  = [
//   {
//  title:"yuyu",
//     description:"yuyu yuyu yuyu",
//     date:"2025-01-23", 
//     pdf:"hjh"
//   }
// ];

// tempnotice.forEach((item)=>{
// let newNotice = new noticeModel({
//   title: item.title,
//   description: item.description,
// date: new Date(item.date),
//   pdf : item.pdf
// });
// newNotice.save();
// });
// res.send("done!");
// })

app.get("/notices", async(req,res)=>{
  let allnotices = await noticeModel.find({});
  res.json(allnotices);
});

app.post('/notices', upload.single('pdf'), async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const pdfUrl = req.file ? req.file.path : '';
 
    console.log('title:', title, 'description:', description, 'pdfUrl:', pdfUrl);
    const notice = new noticeModel({ title, description, date, pdf: pdfUrl });
    await notice.save();
    res.json({ success: true, notice });
  } catch (err) {
     console.error('Error:', JSON.stringify(err, null, 2));
    res.status(500).json({ error: 'Failed to create notice' });
  }
});


const USERS = [
  { username: 'admin', password: 'yourpassword', role: 'admin' },
  { username: 'student', password: 'kcricollege', role: 'student' }
];

passport.use(new LocalStrategy(
  function(username, password, done) {
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
      return done(null, { id: user.username, username: user.username, role: user.role });
    } else {
      return done(null, false, { message: 'Incorrect credentials.' });
    }
  }
));


passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = USERS.find(u => u.username === id);
  done(null, user ? { id: user.username, username: user.username, role: user.role } : false);
});

app.delete('/notices/:id', async (req, res) => {
    await noticeModel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: 'User already exists or invalid data' });
    }
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ success: true, user: req.user });
});

mongoose.connect(uri)
  .then(() => {
    console.log('connected to mongodb');
    app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });