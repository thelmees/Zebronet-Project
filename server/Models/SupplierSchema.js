const mongoose = require('mongoose');
const Schema = mongoose.Schema

const SupplierSchema = new Schema({
  supplierNo: { type: String, unique: true },
  supplierName: { type: String, required: true },
  address: String,
  taxNo: String,
  country: String,
  mobileNo: String,
  email: String,
  status: { type: String, enum: ['Active', 'Inactive', 'Blocked'], default: 'Active' }
});

SupplierSchema.pre('save', async function (next) {
    if (this.isNew) {
      const lastSupplier = await this.constructor.findOne().sort({ supplierNo: -1 });
      const lastSupplierNo = lastSupplier && lastSupplier.supplierNo ? parseInt(lastSupplier.supplierNo.slice(3)) : 0;
      this.supplierNo = `SUP${String(lastSupplierNo + 1).padStart(3, '0')}`;
    }
    next();
  });

  const Supplier = mongoose.model('Supplier', SupplierSchema);

  module.exports = Supplier;