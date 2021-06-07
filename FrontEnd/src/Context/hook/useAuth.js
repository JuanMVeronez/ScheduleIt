import {useState, useEffect} from 'react';
import {toast} from 'react-toastify';

import history from '../../history';
import api from '../../server/api'

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }
        
        setLoading(false)
    }, [])

    const handleLogin = async ({ email, password }) => {
        try {
            const { data: {token} } = await api.post('auth/authentication', {
                email,
                password,
            })
    
            localStorage.setItem('token', JSON.stringify(token))
            api.defaults.headers.Authorization = `Bearer ${token}`;
            
            setAuthenticated(true);

            history.push('/')
        } catch ({response: {data: {error}}}) {
            toast.error(error, {
                toastId: 'only one',
                autoClose: 3000,
                closeOnClose: true
            });
            setError(true);
        }
    }
    
    const handleLogout = () => {
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined;

        setAuthenticated(false);
        history.push('/auth');
    }
    
    const handleRegister = async ({name, lastName, email, password}) => {
        try {
            const {data : { token }} = await api.post('/auth/register', {
                name,
                lastName,
                email,
                password,
            })
            
            localStorage.setItem('token', JSON.stringify(token))
            api.defaults.headers.Authorization = `Bearer ${token}`;
            
            setAuthenticated(true);

            // TODO: create a e-mail first pass validation after that;
            history.push('/');
        } catch (err) {

        }

    }

    const handleError = () => {
        setError(!error);

        return error;
    }
    return { 
        loading,
        setLoading,
        authenticated, 
        handleLogin,
        handleLogout,
        handleRegister,
        handleError,
    }
}