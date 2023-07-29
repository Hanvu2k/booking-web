import { useContext, useEffect } from "react";
import "./NavBar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ContextInfo } from "../../store/ContextInfo";

const NavBar = ({ home, search, flight, carRent, taxi, login, register }) => {
    const {
        token,
        logOutHandler,
        userInfoHandler,
        userInfo: userData,
    } = useContext(ContextInfo);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;

            try {
                const res = await fetch(
                    ` http://localhost:5000/api/v1/auth/user?token=${token}`
                );

                const data = await res.json();
                userInfoHandler(data.user);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [token, userInfoHandler]);

    return (
        <div className="container pb-4">
            <div className="d-flex justify-content-between py-3">
                <Link className="home" to="/">
                    Booking Website
                </Link>
                <div className="d-flex align-items-center">
                    {Object.keys(userData).length !== 0 && (
                        <div className="mr-4">{userData?.email}</div>
                    )}
                    {Object.keys(userData).length === 0 ? (
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                navigate("/register");
                            }}
                        >
                            Register
                        </button>
                    ) : (
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                navigate("/transaction");
                            }}
                        >
                            Transactions
                        </button>
                    )}
                    {Object.keys(userData).length === 0 ? (
                        <button
                            className="btn btn-secondary ml-4"
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            className="btn btn-secondary ml-4"
                            onClick={() => {
                                logOutHandler();
                            }}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
            {!login && !register && (
                <div className="d-flex my-3">
                    <NavLink
                        to="/"
                        className={
                            home
                                ? `nav-item d-flex mr-5 align-items-center nav-bar active`
                                : "nav-item d-flex mr-5 align-items-center nav-bar "
                        }
                    >
                        <div className="nav-icon pr-2">
                            <i className="fa fa-bed" />
                        </div>
                        <div className="nav-type">Stays</div>
                    </NavLink>
                    <NavLink
                        to="/flight"
                        className={
                            flight
                                ? `nav-item d-flex mr-5 align-items-center nav-bar active`
                                : "nav-item d-flex mr-5 align-items-center nav-bar "
                        }
                    >
                        <div className="nav-icon pr-2">
                            <i className="fa fa-plane" />
                        </div>
                        <div className="nav-type">Flights</div>
                    </NavLink>
                    <NavLink
                        to="/carRent"
                        className={
                            carRent
                                ? `nav-item d-flex mr-5 align-items-center nav-bar active`
                                : "nav-item d-flex mr-5 align-items-center nav-bar "
                        }
                    >
                        <div className="nav-icon pr-2">
                            <i className="fa fa-car" />
                        </div>
                        <div className="nav-type">Car rentals</div>
                    </NavLink>
                    <NavLink
                        to="/search"
                        className={
                            search
                                ? `nav-item d-flex mr-5 align-items-center nav-bar active`
                                : "nav-item d-flex mr-5 align-items-center nav-bar"
                        }
                    >
                        <div className="nav-icon pr-2">
                            <i className="fa fa-bed" />
                        </div>
                        <div className="nav-type">Attractions</div>
                    </NavLink>
                    <NavLink
                        to="/taxi"
                        className={
                            taxi
                                ? `nav-item d-flex mr-5 align-items-center nav-bar active`
                                : "nav-item d-flex mr-5 align-items-center nav-bar"
                        }
                    >
                        <div className="nav-icon pr-2">
                            <i className="fa fa-taxi" />
                        </div>
                        <div className="nav-type">Airport taxis</div>
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default NavBar;
