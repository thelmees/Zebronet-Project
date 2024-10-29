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

PurchaseOrderSchema.pre('save', async function (next) {
    if (this.isNew) {
      const lastOrder = await this.constructor.findOne().sort({ orderNo: -1 });
      const lastOrderNo = lastOrder && lastOrder.orderNo ? parseInt(lastOrder.orderNo.slice(4)) : 0;
      this.orderNo = `ORDER${String(lastOrderNo + 1).padStart(3, '0')}`;
    }
    next();
  });

const PurchaseOrder = mongoose.model('PurchaseOrder', PurchaseOrderSchema);
module.exports = PurchaseOrder;