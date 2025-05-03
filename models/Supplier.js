// models/Supplier.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  name: { type: String, required: true },
  contactInfo: String
});

module.exports = mongoose.model('Supplier', supplierSchema);
