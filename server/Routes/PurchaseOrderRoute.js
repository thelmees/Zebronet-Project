const express = require('express');
const router = express.Router();
const PurchaseOrder = require('../Models/PurchaseOrderSchema');


router.post('/', async (req, res) => {
  try {
    const newOrder = new PurchaseOrder(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
    try {
      const purchaseOrder = await PurchaseOrder.find();
      res.json(purchaseOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;