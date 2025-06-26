// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar la aplicación
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/check-auth', { withCredentials: true });
        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
          setUserRole(response.data.userRole);
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
      }
    };

    checkAuth();
  }, []);

 const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/api/users/login', { email, password }, { withCredentials: true });
      if (response.data.accessToken) {
        setIsAuthenticated(true);
        setUserRole(response.data.role);
      }
      console.log('Inicio de sesión exitoso:', response.data);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

   const logout = async () => {
    try {
      await axios.post('http://localhost:3001/api/users/logout', {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUserRole(null);
      console.log('Cierre de sesión exitoso');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
