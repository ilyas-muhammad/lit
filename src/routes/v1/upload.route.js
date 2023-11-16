const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();

const catchAsync = require('../../utils/catchAsync');
const config = require('../../config/config');

const storage = multer.diskStorage({
  destination: './static/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Set file size limit if needed
}).single('profileImage');

router.post('/', (req, res) => {
  catchAsync(upload(req, res, (uploadResponse, err) => {
    if (err) {
      // Handle error (e.g., file size exceeded limit)
      res.status(400).json({ error: err.message });
    } else {
      // File uploaded successfully
      const host = `http://localhost:${config.port}/v1`
      const filePath = req.file.path;
      res.json({
        data: {
          imagePath: `${host}/${filePath}`
        },
        message: 'File uploaded successfully',
      });
    }
  }));
});

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Upload
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     tags: [Upload]
 *     summary: Upload
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     imagePath:
 *                       type: string
 *                 message:
 *                   type: string
 */
