import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    function registerFunction(e){
        e.preventDefault();
        axios.post('/register', {

            name,
            email,
            password

        })


    }

  return (
    <div className="min-h-screen flex justify-center items-center pt-16">
      <div className="mb-64 max-w-lg w-full">
        <h1 className="text-4xl text-center mb-4">REGÍSTRATE</h1>
        <form onSubmit={registerFunction}>

          <input 
            type='text' placeholder='Nombre' 
            value={name} 
            onChange={e => setName(e.target.value)}/>

       

            <input 
                type="email" placeholder="your@email.com" value={email} 
                onChange={e=> setEmail(e.target.value)} 
                className="w-full border my-1 py-2 px-3 rounded-2xl" />
            
          
            <input 
                type="password" placeholder="Contraseña" 
                className="w-full border my-1 py-2 px-3 rounded-2xl" 
                value={password} onChange={e=>setPassword(e.target.value)}/>
            
          
          <button className="primary">Regístrate</button>
          
          <div className="text-center py-2 text-gray-500">
            
          ¿Ya tienes una cuenta? <Link className="underline text-black" to="/login"> Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
