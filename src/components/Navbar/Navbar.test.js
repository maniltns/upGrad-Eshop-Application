import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Navbar from './Navbar';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([]);

describe('Navbar Component', () => {
  it('shows login/signup when not authenticated', () => {
    const store = mockStore({ auth: { isLoggedIn: false } });
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('shows logout when authenticated', () => {
    const store = mockStore({ 
      auth: { 
        isLoggedIn: true,
        isAdmin: false 
      } 
    });
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});