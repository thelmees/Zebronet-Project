const express = require('express');
const router = express.Router();
const multer = require('multer');
const Item = require('../Models/ItemSchema');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/', upload.single("images"), async (req, res) => {
    const newItem = new Item({
        ...req.body,
        images: req.file.filename
      });
  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
    try {
      const item = await Item.find();
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;