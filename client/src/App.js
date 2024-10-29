import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Supplier from './components/Supplier'; 
import Item from './components/Item';
import PurchaseOrder from './components/PurchaseOrder';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div className="d-flex h-full" style={{height:"100%"}}>

        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <h5 className="text-center mt-3">Procurement App</h5>
            <ul className="nav flex-column text-black">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Suppliers
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/items" className="nav-link">
                  Items
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/purchase-orders" className="nav-link">
                  Purchase Orders
                </Link>
              </li>
            </ul>
          </div>
        </nav>

       
        <main className="col-md-9 ms-sm-auto col-lg-10 px-4">
          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<Supplier/>} />
              <Route path="/items" element={<Item/>} />
              <Route path="/purchase-orders" element={<PurchaseOrder/>} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;