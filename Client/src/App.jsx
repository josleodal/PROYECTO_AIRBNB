import React from 'react';
import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './Layout';
import { UserProvider } from './UserContext'; // Importa el proveedor de contexto

import axios from 'axios';
import AccountPage from './pages/AccountPage';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserProvider> {/* Utiliza el proveedor de contexto aquí */}
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account/:subpage?' element={<AccountPage />} />
          <Route path='/account/:subpage/:action' element={<AccountPage />} />
        
        </Route>
      </Routes>
    </UserProvider> 
  );
}

export default App;
