const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  itemNo: { type: String, unique: true },
  itemName: { type: String, required: true },
  inventoryLocation: String,
  brand: String,
  category: String,
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier' },
  stockUnit: String,
  unitPrice: Number,
  images:String,
  status: { type: String, enum: ['Enabled', 'Disabled'], default: 'Enabled' }
});

ItemSchema.pre('save', async function (next) {
    if (this.isNew) {
      const lastItem = await this.constructor.findOne().sort({ itemNo: -1 });
      const lastItemNo = lastItem && lastItem.itemNo ? parseInt(lastItem.itemNo.slice(4)) : 0;
      this.itemNo = `ITEM${String(lastItemNo + 1).padStart(3, '0')}`;
    }
    next();
  });

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item ;