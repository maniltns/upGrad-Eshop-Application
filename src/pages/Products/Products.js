import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ToggleButton, ToggleButtonGroup, Card, CardContent, CardMedia, Button } from '@material-ui/core';
import ProductCard from '../../components/ProductCard/ProductCard';
import { fetchProducts, fetchCategories } from '../../redux/actions/productActions';
import './Products.css';

const Products = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { products, categories } = useSelector(state => state.products);
  const { isLoggedIn, isAdmin } = useSelector(state => state.auth);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/login');
    } else {
      dispatch(fetchCategories());
      dispatch(fetchProducts());
    }
  }, [dispatch, history, isLoggedIn]);

  const filteredProducts = () => {
    let result = [...products];
    
    // Filter by category
    if (category !== 'all') {
      result = result.filter(product => product.category === category);
    }
    
    // Sort products
    switch (sort) {
      case 'price-high':
        return result.sort((a, b) => b.price - a.price);
      case 'price-low':
        return result.sort((a, b) => a.price - b.price);
      case 'newest':
        return result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      default:
        return result;
    }
  };

  return (
    <div className="products-page">
      <div className="products-controls">
        <ToggleButtonGroup
          value={category}
          exclusive
          onChange={(e, newCategory) => setCategory(newCategory)}
        >
          <ToggleButton value="all">All</ToggleButton>
          {categories.map(cat => (
            <ToggleButton key={cat} value={cat}>{cat}</ToggleButton>
          ))}
        </ToggleButtonGroup>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Default</option>
          <option value="price-high">Price: High to Low</option>
          <option value="price-low">Price: Low to High</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts().map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;