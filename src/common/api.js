import axios from 'axios';

const API_BASE_URL = 'https://dev-project-ecommerce.upgrad.dev/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('auth', credentials),
  register: (userData) => api.post('users', userData)
};

export const productAPI = {
  getProducts: () => api.get('products'),
  getCategories: () => api.get('products/categories'),
  getProduct: (id) => api.get(`products/${id}`),
  createProduct: (productData) => api.post('products', productData),
  updateProduct: (id, productData) => api.put(`products/${id}`, productData),
  deleteProduct: (id) => api.delete(`products/${id}`)
};

export const orderAPI = {
  createOrder: (orderData) => api.post('orders', orderData),
  getAddresses: () => api.get('addresses'),
  createAddress: (addressData) => api.post('addresses', addressData)
};

export default api;