const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PurchaseOrderSchema = new Schema({
  orderNo: { type: String, unique: true },
  orderDate: { type: Date, default: Date.now },
  supplierName: { type: Schema.Types.ObjectId, ref: 'Supplier' },
  itemTotal: Number,
  discount: Number,
  netAmount: Number,
  items: [
    {
      itemNo: String,
      itemName: String,
      stockUnit: String,
      unitPrice: Number,
      orderQty: Number,
      itemAmount: Number,
      discount: Number,
      netAmount: Number
    }
  ]
});

const PurchaseOrder = mongoose.model('PurchaseOrder', PurchaseOrderSchema);
module.exports = PurchaseOrder;