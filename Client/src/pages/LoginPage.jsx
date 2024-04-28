import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect]=useState(false);

    async function handleLoginSubmit(e) {
        e.preventDefault();
        try {
            await axios.post('/login', { email, password });
            alert('Login exitoso')
            setRedirect(true)
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
        }
    }

    if(redirect){

        return <Navigate to={'/'} />
    }

    return (
        <div className="min-h-screen flex justify-center items-center pt-16">
            <div className="mb-64 max-w-lg w-full">
                <h1 className="text-4xl text-center mb-4">LOGIN</h1>
                <form onSubmit={handleLoginSubmit}>
                    <input 
                        type="email" placeholder="your@email.com" 
                        className="w-full border my-1 py-2 px-3 rounded-2xl" 
                        value={email} onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" placeholder="Contraseña" 
                        className="w-full border my-1 py-2 px-3 rounded-2xl" 
                        value={password} onChange={e => setPassword(e.target.value)}
                    />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        ¿No tienes una cuenta? <Link className="underline text-black" to={"/register"}> Regístrate</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
