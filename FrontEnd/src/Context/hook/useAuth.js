import {useState, useEffect} from 'react';

import history from '../../history';
import api from '../../server/api';

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    

        useEffect(() => {
            const token = localStorage.getItem('token');
    
            if (token) {
                api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
                setAuthenticated(true);
            }
            
            console.log('ok')
            setLoading(false)
        }, [])
        
        const handleLogin = async ({email, password}) => {
            try {
                const { data: {token} } = await api.post('auth/authentication', {
                    email,
                    password,
                })
                
                console.log(email, password)
                console.log(token)
    
                localStorage.setItem('token', JSON.stringify(token));
                api.defaults.headers.Authorization = `Bearer ${token}`;
                
                setAuthenticated(true);
                
                history.push('/')
            } catch (error) {
                console.log(error.response.data.error);
            }
        }
    
        const handleLogout = () => {
            localStorage.removeItem('token')
            api.defaults.headers.Authorization = undefined;
    
            setAuthenticated(false);
            history.push('/auth');
        }
    
        
    return { 
        loading, 
        authenticated, 
        handleLogin, 
        handleLogout 
    }
}