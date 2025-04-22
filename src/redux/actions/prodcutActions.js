import { productAPI } from '../../common/utils/api';
import { showSuccess, showError } from './uiActions';

export const fetchProducts = () => async dispatch => {
  try {
    const res = await productAPI.getProducts();
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch(showError('Failed to fetch products'));
  }
};

export const addProduct = (productData) => async dispatch => {
  try {
    const res = await productAPI.createProduct(productData);
    dispatch({ type: 'ADD_PRODUCT_SUCCESS', payload: res.data });
    dispatch(showSuccess(`Product ${res.data.name} added successfully`));
    return { success: true };
  } catch (err) {
    dispatch(showError('Failed to add product'));
    return { success: false };
  }
};

// Similar actions for update, delete, etc.