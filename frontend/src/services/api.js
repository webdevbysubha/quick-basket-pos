import axios from 'axios';

const api = axios.create({
  baseURL: "https://quick-basket-pos.onrender.com/api"
});

export const productAPI = {
  getAll: () => api.get('/products').then(res => res.data),
  getByBarcode: (barcode) => api.get(`/products/barcode/${barcode}`).then(res => res.data),
  create: (data) => api.post('/products', data).then(res => res.data),
  update: (id, data) => api.put(`/products/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/products/${id}`).then(res => res.data),
};

export const saleAPI = {
  getAll: () => api.get(`/sales?t=${new Date().getTime()}`).then(res => res.data),
  create: (data) => api.post('/sales', data).then(res => res.data),
};

export default api;
