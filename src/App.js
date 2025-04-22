import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import CreateOrder from './pages/CreateOrder/CreateOrder';
import AddProduct from './pages/AddProduct/AddProduct';
import PrivateRoute from './common/components/PrivateRoute';
import AdminRoute from './common/components/AdminRoute';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/products" component={Products} />
            <PrivateRoute exact path="/products/:id" component={ProductDetails} />
            <PrivateRoute exact path="/create-order/:id" component={CreateOrder} />
            <AdminRoute exact path="/add-product" component={AddProduct} />
            <AdminRoute exact path="/edit-product/:id" component={AddProduct} />
            <Redirect from="/" to="/products" />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;