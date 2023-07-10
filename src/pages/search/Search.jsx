import React from "react";

import Card from "../../components/card/Card";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";

import SearchPopup from "../../components/searchPopup/SearchPopup";
import SearchList from "../../components/searchList/SearchList";
import Contact from "../../components/contact/Contact";

const Search = () => {
    return (
        <>
            {/* nav bar */}
            <Card>
                <NavBar />
            </Card>
            {/* search content */}
            <div className="container d-flex">
                <SearchPopup />
                <SearchList />
            </div>
            {/* contact  */}
            <Card>
                <Contact />
            </Card>
            {/* footer */}
            <Footer />
        </>
    );
};

export default Search;
