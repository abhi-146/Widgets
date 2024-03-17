const axios = require("axios");
const nodemailer = require("nodemailer")
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
require("dotenv").config();
const sharp = require('sharp');

// Create method for setting password
exports.setPassword = function(model, password) {
    model.salt = crypto.randomBytes(16).toString('hex');
    model.hash = crypto.pbkdf2Sync(password, model.salt, 10000, 512, 'sha512').toString('hex');
}

// Create method to validate password
exports.validatePassword = function(model, password) {
    var hash = crypto.pbkdf2Sync(password, model.salt, 10000, 512, 'sha512').toString('hex');
    return model.hash === hash;
}

exports.fftmjTimeElapsedString = (datetime) => {
    const now = new Date();
    const ago = new Date(datetime * 1000);
    const elapsedMilliseconds = now - ago;

    const seconds = Math.floor(elapsedMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
        return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    } else if (days > 0) {
        return days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (hours > 0) {
        return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (minutes > 0) {
        return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else {
        return 'Just now';
    }
}

exports.transformUrl = (url) => {
    const p = url.split('/');
    let t = '';
    for (let i = 0; i < p.length; i++) {
      if (i === 2) {
        t += p[i].replaceAll('-', '--').replaceAll('.', '-') + atob('LnRyYW5zbGF0ZS5nb29n') + '/';
      } else {
        if (i !== p.length - 1) {
          t += p[i] + '/';
        } else {
          t += p[i];
        }
      }
    }
    return encodeURI(t);
};

exports.getHtmlFromUrl = async (url) => {

    var data = "";
    await axios.get(url)
    .then(response => {
        data = response.data;

    })
    .catch(error => {
       throw error;
    });

    return data;
}

exports.sendMail = (mailData) => {

    const transporter = nodemailer.createTransport({
        port: process.env.MAIL_PORT,
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        },
        secure: true,
    });

    transporter.sendMail(mailData, function (err, info) {
        if(err) {
            throw err
        }
        else {
           return true;
        }
     });
}

exports.getMulter = () => {

    let upload = null;

    if(upload === null) {
        // Multer storage configuration
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, process.env.DESTINATION);
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        });
        
        // Initialize Multer with the configured storage engine
        upload = multer({ storage: storage });
    }
    return upload;
}

exports.resize = async (file) => {

    const thumbnailName = path.parse(file.filename).name + '-thumbnail.jpg'
    const thumbnailPath = process.env.DESTINATION + 'thumbnails/' + thumbnailName;

    await sharp(file.path)
    .resize(150, 150)
    .toFile(thumbnailPath);

    return thumbnailName;

}