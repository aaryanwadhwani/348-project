// models/Product.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  sku: { type: String, unique: true, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier' },
  unitPrice: { type: Number, required: true },
  reorderLevel: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

// Unique lookup by SKU
productSchema.index({ sku: 1 }, { unique: true });

// Filtering by category for dropdowns & reports
productSchema.index({ category: 1 });

// Filtering by supplier for dropdowns & reports
productSchema.index({ supplier: 1 });

// Quickly find “below reorder” products
productSchema.index({ quantity: 1, reorderLevel: 1 });

module.exports = mongoose.model('Product', productSchema);
