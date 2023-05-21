import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [openLogin, setOpenLogin] = useState(false);

  const handleLoginChange = (newValue) => {
    setOpenLogin(newValue);
  };

  

  return (
    <AppContext.Provider value={{ openLogin, setOpenLogin }}>
      {children}
    </AppContext.Provider>
  );
};
