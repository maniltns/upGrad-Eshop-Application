import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Typography, Select, MenuItem } from '@material-ui/core';
import { productAPI } from '../../services/api';
import './AddProduct.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: ''
  });
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productAPI.getCategories();
        setCategories(response.data);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryToUse = formData.category === 'new' ? newCategory : formData.category;
      const productData = {
        ...formData,
        category: categoryToUse
      };
      await productAPI.createProduct(productData);
      setSuccess(true);
      setTimeout(() => {
        history.push('/products');
      }, 1500);
    } catch (err) {
      console.error('Failed to add product', err);
    }
  };

  return (
    <div className="add-product-container">
      <Typography variant="h4" gutterBottom>Add Product</Typography>
      {success && (
        <Typography color="primary">
          Product {formData.name} added successfully!
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          name="name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Select
          name="category"
          value={formData.category}
          onChange={handleChange}
          displayEmpty
          fullWidth
          variant="outlined"
          margin="dense"
          required
        >
          <MenuItem value="" disabled>Select Category</MenuItem>
          {categories.map(cat => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
          <MenuItem value="new">Add New Category</MenuItem>
        </Select>
        {formData.category === 'new' && (
          <TextField
            label="New Category Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            required
          />
        )}
        <TextField
          label="Price"
          name="price"
          type="number"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          name="description"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <TextField
          label="Image URL"
          name="image"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={{ marginTop: '20px' }}
        >
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;