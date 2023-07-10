import React from "react";
import "./NavBar.css";

const NavBar = () => {
    // navbar data
    const navBarItems = [
        {
            type: "Stays",
            icon: "fa-bed",
            active: true,
        },
        {
            type: "Flights",
            icon: "fa-plane",
            active: false,
        },
        {
            type: "Car rentals",
            icon: "fa-car",
            active: false,
        },
        {
            type: "Attractions",
            icon: "fa-bed",
            active: false,
        },
        {
            type: "Airport taxis",
            icon: "fa-taxi",
            active: false,
        },
    ];

    return (
        <div className="container pb-4">
            <div className="d-flex justify-content-between py-3">
                <div>Booking Website</div>
                <div>
                    <button className="btn btn-secondary">Register</button>
                    <button className="btn btn-secondary ml-4">Login</button>
                </div>
            </div>
            <div className="d-flex my-3">
                {navBarItems?.map((item, index) => {
                    return (
                        <div
                            className={`nav-item d-flex mr-5 align-items-center ${
                                item.active ? "active" : ""
                            }`}
                            key={index}
                        >
                            <div className="nav-icon pr-2">
                                <i className={"fa " + item.icon} />
                            </div>
                            <div className="nav-type">{item.type}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NavBar;
