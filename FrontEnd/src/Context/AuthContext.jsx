import React, { createContext } from 'react';

import useAuth from './hook/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
    const {
        loading,
        setLoading,
        authenticated, 
        handleLogin, 
        handleLogout,
        handleRegister,
        handleError,
    } = useAuth();

    return (
        <Context.Provider value={{
            loading,
            setLoading,
            authenticated,
            handleLogin,
            handleLogout,
            handleRegister,
            handleError,
        }}>
            {children}
        </Context.Provider>
    )
}

export {Context, AuthProvider};