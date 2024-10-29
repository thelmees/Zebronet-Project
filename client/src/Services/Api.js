import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// export const fetchSuppliers = () => API.get('/suppliers');
// export const createSupplier = (newSupplier) => API.post('/suppliers', newSupplier);

// export const fetchItems = () => API.get('/items');
// export const createItem = (newItem) => API.post('/items', newItem);

// export const fetchPurchaseOrders = () => API.get('/purchaseOrders');
// export const createPurchaseOrder = (newOrder) => API.post('/purchaseOrders', newOrder);

export default  API