import React, { useState, useEffect } from 'react';
import API from '../Services/Api';
import 'bootstrap/dist/css/bootstrap.min.css';

const Item = () => {
  const [itemData, setItemData] = useState({
    itemName: '',
    inventoryLocation: '',
    brand: '',
    category: '',
    supplier: '',
    stockUnit: '',
    unitPrice: '',
    images:'',
    status: 'Enabled'
  });
  const [suppliers, setSuppliers] = useState([]);
  const stockUnits = ["Box", "Piece", "Packet"];
  const statuses = ["Enabled", "Disabled"];

  useEffect(() => {
    async function loadSuppliers() {
      const response = await API.get('/suppliers');     
      setSuppliers(response.data);
    }

    loadSuppliers();
  }, []);

  const handleImageChange = (e) => {   
    setItemData({...itemData,images: e.target.files[0]});
  };

  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("images", itemData.images);
  
    Object.entries(itemData).forEach(([key, value]) => {
      if (key !== "images") { 
        formData.append(key, value);
      }
    });

    try {
      await API.post('/items', formData);
      alert('Item added successfully');
      setItemData({
        itemName: '',
        inventoryLocation: '',
        brand: '',
        category: '',
        supplier: '',
        stockUnit: '',
        unitPrice: '',
        images: null,
        status: 'Enabled'
      });
    } catch (error) {
      console.error(error);
      alert('Item adding failed');
    }
  };

  return (
    <div className="container m-10">
      <div className="row justify-content-center">
        <div className="col-md-6"> 
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
            <h2 className="mb-4 text-center">Add New Item</h2>
            <div className="mb-3">
              <input
                name="itemName"
                value={itemData.itemName}
                onChange={handleChange}
                placeholder="Item Name"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <input
                name="inventoryLocation"
                value={itemData.inventoryLocation}
                onChange={handleChange}
                placeholder="Inventory Location"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                name="brand"
                value={itemData.brand}
                onChange={handleChange}
                placeholder="Brand"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                name="category"
                value={itemData.category}
                onChange={handleChange}
                placeholder="Category"
                className="form-control"
              />
            </div>
            
            <div className="mb-3">
              <select
                name="supplier"
                value={itemData.supplier}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Supplier</option>
                {suppliers.map(supplier => (
                  <option key={supplier._id} value={supplier._id}>{supplier.supplierName}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <select
                name="stockUnit"
                value={itemData.stockUnit}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Stock Unit</option>
                {stockUnits.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <input
                name="unitPrice"
                value={itemData.unitPrice}
                onChange={handleChange}
                placeholder="Unit Price"
                type="number"
                className="form-control"
                required
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Item Images</label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                name="status"
                value={itemData.status}
                onChange={handleChange}
                className="form-select"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <button type="submit" className="btn btn-primary w-100">Add Item</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Item;