import { createContext, useContext, useState } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    const signup = async (name, email, password) => {
        const res = await API.post('/auth/signup', { name, email, password });
        return res.data;
    };

    const login = async (email, password) => {
        const res = await API.post('/auth/login', { email, password });
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
        return res.data;
    };

    const logout = async () => {
        await API.post('/auth/logout');
        setUser(null);
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);