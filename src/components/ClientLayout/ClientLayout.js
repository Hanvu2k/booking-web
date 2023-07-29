import React from "react";
import NavBar from "../navBar/NavBar";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Card from "../card/Card";

import { Outlet, useMatch } from "react-router-dom";

function ClientLayout() {
    const home = useMatch("/");
    const search = useMatch("/search");
    const flight = useMatch("/flight");
    const carRent = useMatch("/carRent");
    const taxi = useMatch("/taxi");
    const login = useMatch("/login");
    const register = useMatch("/register");

    if (home) {
        return (
            <>
                <Card>
                    <NavBar
                        home={home}
                        search={search}
                        flight={flight}
                        carRent={carRent}
                        taxi={taxi}
                    />
                    <Header />
                </Card>
                <Outlet />
                <Footer />
            </>
        );
    }

    return (
        <>
            <Card>
                <NavBar
                    home={home}
                    search={search}
                    flight={flight}
                    carRent={carRent}
                    taxi={taxi}
                    login={login}
                    register={register}
                />
            </Card>
            <Outlet />
            {!login && !register && <Footer />}
        </>
    );
}

export default ClientLayout;
