import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
import config from '../config';
import path = require('path');

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// uploading iamges to cloudinary
export const sendImageToCloudinary = (imageName: string, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName.trim() },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);
        // delete a file asynchronously
        fs.unlink(path, err => {
          if (err) {
            console.log(err);
          } else {
            console.log('File is deleted.');
          }
        });
      },
    );
  });
};

/**
 * Multer storage configuration for file uploads
 * @constant
 * @type {multer.StorageEngine}
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

/**
 * Multer configuration for handling file uploads
 * @constant
 * @type {multer.Instance}
 */
export const uploader = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file) {
      return cb(null, true);
    }

    const supportedImage = /\.(png|jpg|jpeg|webp)$/;
    const extension = path.extname(file.originalname);

    if (file.fieldname === 'logo') {
      req.logo = true;
    }

    if (file.fieldname === 'banner') {
      req.banner = true;
    }

    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error('Must be a png/jpg image'));
    }
  },
  limits: {
    fileSize: 5000000,
  },
});

/**
 * Express middleware for handling file uploads using Multer
 * @type {multer.Instance}
 * @memberOf module:middlewares
 */

export const upload = multer({ storage: storage });
