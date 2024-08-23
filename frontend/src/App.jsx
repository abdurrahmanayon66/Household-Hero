import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout'
import HireHelperForm from './pages/HireHelperForm';
import OrderForm from './pages/OrderForm'
import Contracts from './pages/Contracts'
import Signup from './pages/Signup';
import Login from './pages/Login';

const App = () => {
  return (
    <BrowserRouter>
      <div className='bg-white'>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/*" 
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/hireHelperForm/:helperId" element={<HireHelperForm />} />
                  <Route path="/orderForm/:helperId" element={<OrderForm />} />
                  <Route path="/contracts" element={<Contracts/>} />
                </Routes>
              </Layout>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
