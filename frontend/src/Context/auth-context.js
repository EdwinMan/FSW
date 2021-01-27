import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {},

    UserID: -1,
    setUserID: () => {},

    orders: [0,0],
    setOrdersContext: () => {},

    Token: "not set yet",
    setToken: () => {}
});


