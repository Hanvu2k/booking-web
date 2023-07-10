import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";

import "./css/styles.css";
import "./css/spacing.css";
import "./css/flex.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/detail" element={<Detail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
