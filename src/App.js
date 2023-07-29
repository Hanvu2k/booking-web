import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import ClientLayout from "./components/ClientLayout/ClientLayout";
import InfoProvider from "./store/InfoProvider";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Transaction from "./pages/Transaction/Transaction";

import "./css/styles.css";
import "./css/spacing.css";
import "./css/flex.css";

function App() {
    return (
        <InfoProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ClientLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/transaction" element={<Transaction />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/detail/:id" element={<Detail />} />
                        <Route path="/flight" element={<p />} />
                        <Route path="/carRent" element={<p />} />
                        <Route path="/taxi" element={<p />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </InfoProvider>
    );
}

export default App;
