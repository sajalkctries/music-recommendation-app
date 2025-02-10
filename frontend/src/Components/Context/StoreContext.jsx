import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const[cart,setCart] = useState([]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    }
  }, [token, username]);

  const contextValue = {
    token,
    setToken,
    username,
    setUsername,
    cart,
    setCart
  };

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};

StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default StoreContextProvider;
