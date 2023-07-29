import React, { useCallback } from "react";
import { ContextInfo } from "./ContextInfo";
import { useState } from "react";

function InfoProvider({ children }) {
    const [inforBooking, setInforBooking] = useState({});
    const [Hotels, setHotels] = useState([]);
    const [message, setMessage] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [token, setToken] = useState(localStorage.getItem("token"));

    const handlerInput = (info) => {
        setInforBooking({
            ...info,
        });
    };

    const handlerHotels = (arr, mess) => {
        setHotels([...arr]);
        setMessage(mess);
    };

    const handlerTokens = (token) => {
        localStorage.setItem("token", token);
        setToken(localStorage.getItem("token", token));
    };

    const handlerLogOut = () => {
        localStorage.removeItem("token");
        setToken("");
        setUserInfo({});
    };

    const handlerUserInfo = useCallback((user) => {
        setUserInfo(user);
    }, []);

    const infoContext = {
        info: { ...inforBooking },
        hotels: [...Hotels],
        token: token,
        message: message,
        userInfo: userInfo,
        inputHandler: handlerInput,
        hotelsHandler: handlerHotels,
        tokenHandler: handlerTokens,
        logOutHandler: handlerLogOut,
        userInfoHandler: handlerUserInfo,
    };

    return (
        <ContextInfo.Provider value={infoContext}>
            {children}
        </ContextInfo.Provider>
    );
}

export default InfoProvider;
