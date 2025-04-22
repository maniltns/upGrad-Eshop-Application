const { setupWorker, rest } = require('msw');

const worker = setupWorker(
  rest.post('https://dev-project-ecommerce.upgrad.dev/api/auth', (req, res, ctx) => {
    const { email, password } = req.body;
    
    if (email === 'admin@example.com' && password === 'admin123') {
      return res(
        ctx.json({
          token: 'mock-admin-token',
          user: { id: 1, name: 'Admin', email, role: 'admin' }
        })
      );
    }
    
    if (email === 'user@example.com' && password === 'user123') {
      return res(
        ctx.json({
          token: 'mock-user-token',
          user: { id: 2, name: 'User', email, role: 'user' }
        })
      );
    }
    
    return res(
      ctx.status(401),
      ctx.json({ message: 'Invalid credentials' })
    );
  }),
  
  rest.get('https://dev-project-ecommerce.upgrad.dev/api/products', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: "Premium Headphones",
          price: 299.99,
          category: "electronics",
          image: "/images/headphones.jpg"
        },
        // More mock products...
      ])
    );
  })
);

module.exports = worker;