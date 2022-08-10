import React, { createContext, useState } from "react";

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({});

  const logout = async (e) => {
    console.log(e);
    localStorage.clear();

    setAuthState({
      accessToken: "",
      refreshToken: "",
      authenticated: "",
      username: "",
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,

        setAuthState,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
