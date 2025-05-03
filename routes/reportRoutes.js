// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const { ObjectId } = mongoose.Types;

function tryCastObjectId(id) {
  // Only cast if it’s a 24-hex string
  return /^[0-9a-fA-F]{24}$/.test(id) ? new ObjectId(id) : null;
}

router.get('/inventory', async (req, res) => {
  try {
    const {
      category,
      supplier,
      name,
      minPrice,
      maxPrice,
      minQuantity,
      maxQuantity,
      belowReorder
    } = req.query;

    const match = {};

    if (category) {
      const catId = tryCastObjectId(category);
      if (catId) match.category = catId;
    }
    if (supplier) {
      const supId = tryCastObjectId(supplier);
      if (supId) match.supplier = supId;
    }
    if (name) {
      match.name = { $regex: name, $options: 'i' };
    }
    if (minPrice || maxPrice) {
      match.unitPrice = {};
      if (minPrice) match.unitPrice.$gte = parseFloat(minPrice);
      if (maxPrice) match.unitPrice.$lte = parseFloat(maxPrice);
    }
    if (minQuantity || maxQuantity) {
      match.quantity = {};
      if (minQuantity) match.quantity.$gte = parseInt(minQuantity, 10);
      if (maxQuantity) match.quantity.$lte = parseInt(maxQuantity, 10);
    }
    if (belowReorder === 'true') {
      match.$expr = { $lt: ['$quantity', '$reorderLevel'] };
    }

    const pipeline = [
      { $match: match },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'suppliers',
          localField: 'supplier',
          foreignField: '_id',
          as: 'supplier'
        }
      },
      { $unwind: { path: '$supplier', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: null,
          totalInventoryValue: { $sum: { $multiply: ['$quantity', '$unitPrice'] } },
          products: { $push: '$$ROOT' },
          belowReorderCount: {
            $sum: {
              $cond: [{ $lt: ['$quantity', '$reorderLevel'] }, 1, 0]
            }
          }
        }
      }
    ];

    const [report] = await Product.aggregate(pipeline);

    if (!report) {
      return res.json({
        products: [],
        totalInventoryValue: 0,
        belowReorderCount: 0
      });
    }

    res.json(report);
  } catch (err) {
    console.error('Report error:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
