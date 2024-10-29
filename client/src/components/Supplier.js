import React, { useState } from 'react';
import API from '../Services/Api';

const Supplier = () => {
  const [supplierData, setSupplierData] = useState({
    supplierName: '',
    address: '',
    taxNo: '',
    country: '',
    mobileNo: '',
    email: '',
    status: 'Active'
  });

  const countries = ["United States", "Canada", "India", "United Kingdom"];
  const statuses = ["Active", "Inactive", "Blocked"];

  const handleChange = (e) => {
    setSupplierData({ ...supplierData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post('/suppliers', supplierData);
      alert('Supplier added successfully');
    } catch (error) {
      console.log(error);
      alert('Supplier adding failed');
    }
  };

  return (
    <div className="container m-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
            <h2 className="mb-4 text-center">Add Supplier</h2>
            <div className="mb-3">
              <input
                name="supplierName"
                value={supplierData.supplierName}
                onChange={handleChange}
                placeholder="Supplier Name"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <input
                name="address"
                value={supplierData.address}
                onChange={handleChange}
                placeholder="Address"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                name="taxNo"
                value={supplierData.taxNo}
                onChange={handleChange}
                placeholder="TAX No"
                className="form-control"
              />
            </div>
            <div className="mb-3">
            <label className="form-label">Country</label>
              <select
                name="country"
                value={supplierData.country}
                onChange={handleChange}
                className="form-select"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <input
                name="mobileNo"
                value={supplierData.mobileNo}
                onChange={handleChange}
                placeholder="Mobile No"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                name="email"
                value={supplierData.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                className="form-control"
              />
            </div>
            <div className="mb-3">
            <label className="form-label">Status</label>
              <select
                name="status"
                value={supplierData.status}
                onChange={handleChange}
                className="form-select"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">Add Supplier</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Supplier;