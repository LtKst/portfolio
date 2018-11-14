// #region variables
require('dotenv').config();

const express = require('express');
const app = express();

const fs = require('fs');
const request = require('request');
const bodyParser = require('body-parser');

const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

const secretKey = process.env.CAPTCHA_SECRET

const PORT = process.env.PORT || 3000;
// #endregion

// #region file reads
// author info
fs.readFile('assets/json/author_info.json', 'utf8', function (err, data) {
  if (err) throw err; // we'll not consider error handling for now

  let parsedData = JSON.parse(data);
  app.locals.author_info = parsedData;
});
// #endregion

// app setup
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());

// #region pages
// Home page
app.get('/', function (req, res) {
  fs.readFile('assets/json/projects.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
  
    let parsedData = JSON.parse(data);

    res.render('pages/home', {
      title: 'Home',
      projects: parsedData
    });
  });
});

// About page
app.get('/about', (function (req, res) {
  res.render('pages/about', {
    title: 'About'
  });
}));

// Skills page - this page sucked
/*app.get('/skills', (function (req, res) {
  fs.readFile('assets/json/skills.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
  
    let parsedData = JSON.parse(data);
    
    res.render('pages/skills', {
      title: 'Skills',
      skills: parsedData
    });
  });
}));*/

// Contact page
app.get('/contact', (function (req, res) {
  res.render('pages/contact', {
    title: 'Contact'
  });
}));

app.post('/mail', function (req, res) {
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
  {
    return res.render('pages/message', {
      title: 'Captcha required',
      message: 'Please select Captcha',
      info: ''
    });
  }

  const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

  request(verificationURL,function(error,response,body) {
    body = JSON.parse(body);

    if(body.success !== undefined && !body.success) {
      return res.json({"responseError" : "Failed captcha verification"});
    }
    let mail = req.body.mail;

  let mailOptions = {
    from: mail.email,
    to: 'koensparreboom@gmail.com',
    subject: mail.subject,
    text: `Name: ${mail.first_name} ${mail.last_name}\nEmail: ${mail.email}\n\n` + mail.message
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.render('pages/message', {
        title: 'Email response',
        message: 'Error sending mail',
        info: 'Sorry, an error accured while trying to email'
      });
      console.log(error);
    } else {
      res.render('pages/message', {
        title: 'Email response',
        message: 'Email sent successfully!',
        info: 'Thank you'
      });
        console.log('Email sent: ' + info.response);
      }
    });
    //res.json({"responseSuccess" : "Sucess"});
  });
});
// #endregion

// #region admin stuff
app.get('/admin', function (req, res) {
  res.render('pages/admin/login', {
    title: 'Admin'
  });
});

app.post('/admin', function (req, res) {
  if (req.body.user.username === process.env.ADMIN_USERNAME && req.body.user.password === process.env.ADMIN_PASSWORD) {
    res.render('pages/admin/control-panel', {
      title: 'Admin'
    });
  } else {
    res.status(401).end('wrong, noob');
  }
});
// #endregion

// project/404 page
app.use(function (req, res, next) {
  fs.readFile('assets/json/projects.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now

    let parsedData = JSON.parse(data);
    let pageExists = false;

    parsedData.forEach((e) => {
      if ('/' + e.title.toLowerCase().replace(/ /g, "-") === req.originalUrl) {
        res.render('pages/project', {
          title: e.title,
          project: e
        });

        pageExists = true;
      }
    });

    if (!pageExists) {
      res.status(404).render('pages/message', {
        title: '404',
        message: '404',
        info: 'This page wasn\'t found...',
        image: {
          src: 'https://media.giphy.com/media/jWexOOlYe241y/giphy.gif',
          alt: 'Confused John Travolta'
        }
      });
    }
  });
});

// Listen
app.listen(PORT, function () {
  console.log('Listening on port 3000!');
});