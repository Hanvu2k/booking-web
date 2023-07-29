import Card from "../../components/card/Card";

import SearchPopup from "../../components/searchPopup/SearchPopup";
import SearchList from "../../components/searchList/SearchList";
import Contact from "../../components/contact/Contact";

const Search = () => {
    return (
        <>
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
        </>
    );
};

export default Search;
