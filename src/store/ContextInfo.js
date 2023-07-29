import React from "react";

export const ContextInfo = React.createContext({
    infor: {},
    hotels: [],
    message: "",
    token: "",
    userInfo: {},
    userInfoHandler: (userInfo) => {},
    hotelsHandler: (arr) => {},
    inputHandler: (info) => {},
    tokenHandler: (token) => {},
    logOutHandler: () => {},
});
