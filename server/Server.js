const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const supplierRoutes = require('./Routes/SupplierRoute');
const itemRoutes = require('./Routes/ItemRoute');
const purchaseOrderRoutes = require('./Routes/PurchaseOrderRoute');


const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use('/api/suppliers', supplierRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/purchase-orders', purchaseOrderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));