// import path from 'path'
// import express from 'express'
// import multer from 'multer'
// const router = express.Router()

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     )
//   },
// })

// // function checkFileType(file, cb) {
// //   const filetypes = /jpg|jpeg|png/
// //   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
// //   const mimetype = filetypes.test(file.mimetype)

// //   if (extname && mimetype) {
// //     return cb(null, true)
// //   } else {
// //     cb('Images only!')
// //   }
// // }

// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb)
//   },
// })

// router.post('/', upload.single('image'), (req, res) => {
//   res.send(`/${req.file.path}`)
// })

// export default router

import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 3000000 }, // limit file size to 3 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// error handler middleware
function handleError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    // a multer error occurred
    console.error('Multer error:', err);
    res.status(400).send(err.message);
  } else if (err) {
    // an unknown error occurred
    console.error('Unknown error:', err);
    res.status(500).send('Server Error');
  } else {
    // everything is fine
    next();
  }
}

router.post('/', upload.single('image'), handleError, (req, res) => {
  try {
    console.log('File uploaded successfully:', req.file);
    res.send(`/${req.file.path}`);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Server Error');
  }
});

export default router;
