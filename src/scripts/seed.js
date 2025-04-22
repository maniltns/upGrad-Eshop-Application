const axios = require('axios');
const faker = require('faker');

const API_BASE = 'https://dev-project-ecommerce.upgrad.dev/api';

async function seedProducts() {
  const categories = ['electronics', 'clothing', 'books', 'home'];
  
  for (let i = 0; i < 20; i++) {
    const product = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(10, 500),
      category: categories[Math.floor(Math.random() * categories.length)],
      description: faker.commerce.productDescription(),
      image: faker.image.imageUrl()
    };
    
    try {
      await axios.post(`${API_BASE}/products`, product, {
        headers: {
          Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
        }
      });
      console.log(`Created product: ${product.name}`);
    } catch (err) {
      console.error(`Error creating product: ${err.message}`);
    }
  }
}

seedProducts();