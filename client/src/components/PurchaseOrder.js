import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import API from '../Services/Api';
import * as XLSX from 'xlsx';

const PurchaseOrder = () => {
  const [orderDate, setOrderDate] = useState(new Date());
  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedItemId, setSelectedItemId] = useState('');
  const [totals, setTotals] = useState({
    itemTotal: 0,
    discountTotal: 0,
    netAmount: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const suppliersRes = await API.get('/suppliers');
      const itemsRes = await API.get('/items');
      setSuppliers(suppliersRes.data);
      setItems(itemsRes.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const calculateTotals = () => {
      const itemTotal = orderItems.reduce((total, item) => total + item.itemAmount, 0);
      const discountTotal = orderItems.reduce((total, item) => total + parseFloat(item.discount || 0), 0);
      const netAmount = itemTotal - discountTotal;
  
      setTotals({ itemTotal, discountTotal, netAmount });
    };
    calculateTotals();
  }, [orderItems]);

  const handleAddItem = () => {
    const selectedItem = items.find(item => item._id === selectedItemId);
    if (selectedItem) {
      setOrderItems([
        ...orderItems,
        {
          ...selectedItem,
          orderQty: 1,
          packingUnit: '',
          itemAmount: selectedItem.unitPrice,
          discount: 0,
          netAmount: selectedItem.unitPrice,
        },
      ]);
      setSelectedItemId('');
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = orderItems.map((item, i) =>
      i === index ? { ...item, [field]: value, itemAmount: item.orderQty * item.unitPrice } : item
    );
    setOrderItems(updatedItems);
  };

  const handleExportExcel = () => {
    const worksheetData = orderItems.map(item => ({
        'Item No': item._id,
        'Item Name': item.itemName,
        'Stock Unit': item.stockUnit,
        'Unit Price': item.unitPrice,
        'Order Qty': item.orderQty,
        'Item Amount': item.itemAmount,
        'Discount': item.discount,
        'Net Amount': item.netAmount,
      }));
  
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "PurchaseOrder");
      XLSX.writeFile(workbook, `PurchaseOrder_${Date.now()}.xlsx`);
    alert("Exporting to Excel...");
  };

  const handlePrintOrder =async () => {
    try {
        const orderData = {
            orderDate,
            supplierName: selectedSupplier,
            itemTotal: totals.itemTotal,
            discount: totals.discountTotal,
            netAmount: totals.netAmount,
            items: orderItems,  
          };
      
          const response = await API.post('/purchase-orders', orderData);
          alert("Order saved:", response.data);
      
          window.print();
        } catch (error) {
          alert("Error saving order:", error);
        }
      };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Create Purchase Order</h2>
      <form className="border p-4 bg-light rounded">
        <div className="mb-3">
          <label>Order No</label>
          <input type="text" className="form-control" value={`PO-${Date.now()}`} readOnly />
        </div>

        <div className="mb-3">
          <label>Order Date</label>
          <DatePicker selected={orderDate} onChange={date => setOrderDate(date)} className="form-control" />
        </div>

        <div className="mb-3">
          <label>Supplier Name</label>
          <select className="form-select" value={selectedSupplier} onChange={e => setSelectedSupplier(e.target.value)}>
            <option value="">Select Supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier._id} value={supplier._id}>{supplier.supplierName}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Select Item</label>
          <div className="d-flex">
            <select
              className="form-select me-2"
              value={selectedItemId}
              onChange={e => setSelectedItemId(e.target.value)}
            >
              <option value="">Select Item</option>
              {items.map(item => (
                <option key={item._id} value={item._id}>{item.itemName}</option>
              ))}
            </select>
            <button type="button" className="btn btn-secondary" onClick={handleAddItem}>Add Item</button>
          </div>
        </div>

        <h5>Item List</h5>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Item No</th>
                <th>Item Name</th>
                <th>Stock Unit</th>
                <th>Unit Price</th>
                <th>Packing Unit</th>
                <th>Order Qty</th>
                <th>Item Amount</th>
                <th>Discount</th>
                <th>Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.itemName}</td>
                  <td>{item.stockUnit}</td>
                  <td>{item.unitPrice}</td>
                  <td>
                    <select
                      value={item.packingUnit}
                      onChange={e => handleItemChange(index, 'packingUnit', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select</option>
                      <option value="Box">Box</option>
                      <option value="Piece">Piece</option>
                      <option value="Packet">Packet</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.orderQty}
                      onChange={e => handleItemChange(index, 'orderQty', e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>{item.itemAmount || 0}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={item.discount}
                      onChange={e => handleItemChange(index, 'discount', e.target.value)}
                      className="form-control"
                    />
                  </td>
                  <td>{item.netAmount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="row">
          <div className="col-md-4">
            <label>Item Total :</label>
            <input type="text" className="form-control border border-0 bg-light" value={totals.itemTotal} readOnly />
          </div>
          <div className="col-md-4">
            <label>Discount :</label>
            <input type="text" className="form-control border border-0 bg-light" value={totals.discountTotal} readOnly />
          </div>
          <div className="col-md-4">
            <label>Net Amount :</label>
            <input type="text" className="form-control border border-0 bg-light" value={totals.netAmount} readOnly />
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button type="button" className="btn btn-success me-2" onClick={handleExportExcel}>
            Export to Excel
          </button>
          <button type="button" className="btn btn-primary" onClick={handlePrintOrder}>
            Print Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseOrder;