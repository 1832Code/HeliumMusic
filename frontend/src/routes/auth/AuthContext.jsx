import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserData();
    } else {
      delete axios.defaults.headers.common["Authorization"];
      // Opcional: si no hay token, asegúrate de que el usuario esté a null
      if (user) setUser(null); 
    }
  }, [token]);

// Y en fetchUserData
const fetchUserData = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/auth/me");
    setUser(response.data); // Guarda el objeto completo
  } catch (error) {
    console.error("Error fetching user data:", error);
    logout(); 
  }
};


const login = (newToken, userDataFromBackend) => {
  localStorage.setItem("token", newToken);
  setToken(newToken);
  setUser({
    id: userDataFromBackend.id,
    username: userDataFromBackend.username,
    email: userDataFromBackend.email,
    fullName: userDataFromBackend.fullName
  });
};

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => {
  return useContext(AuthContext);
                              
};
