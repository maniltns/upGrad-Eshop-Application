import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core';
import { orderAPI } from '../../services/api';
import ProductStep from './ProductStep';
import AddressStep from './AddressStep';
import ReviewStep from './ReviewStep';
import './CreateOrder.css';

const steps = ['Product Details', 'Address', 'Review Order'];

const CreateOrder = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const product = useSelector(state => 
    state.products.products.find(p => p.id === parseInt(id))
  );

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await orderAPI.getAddresses();
        setAddresses(response.data);
      } catch (err) {
        console.error('Failed to fetch addresses', err);
      }
    };
    fetchAddresses();
  }, []);

  const handleNext = () => {
    if (activeStep === 1 && !selectedAddress) {
      alert('Please select an address!');
      return;
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handlePlaceOrder = async () => {
    try {
      await orderAPI.createOrder({
        productId: product.id,
        quantity,
        addressId: selectedAddress.id
      });
      setOrderSuccess(true);
      setTimeout(() => {
        history.push('/products');
      }, 2000);
    } catch (err) {
      console.error('Failed to place order', err);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ProductStep 
            product={product} 
            quantity={quantity} 
            setQuantity={setQuantity} 
          />
        );
      case 1:
        return (
          <AddressStep 
            addresses={addresses}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        );
      case 2:
        return (
          <ReviewStep 
            product={product}
            quantity={quantity}
            address={selectedAddress}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <div className="create-order-container">
      <Stepper activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {orderSuccess ? (
        <div className="order-success">
          <Typography variant="h5">Your order is confirmed!</Typography>
          <Typography>Order placed successfully!</Typography>
        </div>
      ) : (
        <>
          {getStepContent(activeStep)}
          <div className="stepper-buttons">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CreateOrder;