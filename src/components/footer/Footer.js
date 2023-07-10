import React from "react";

import "./footer.css";

const Footer = () => {
    // footer data
    const footerArr = [
        {
            col_number: 1,
            col_values: [
                "Countries",
                "Regions",
                "Cities",
                "Districts",
                "Airports",
                "Hotels",
            ],
        },
        {
            col_number: 2,
            col_values: [
                "Homes",
                "Apartments",
                "Resorts",
                "Villas",
                "Hostels",
                "Guest houses",
            ],
        },
        {
            col_number: 3,
            col_values: [
                "Unique places to stay",
                "Reviews",
                "Unpacked: Travel articles",
                "Travel communities",
                "Seasonal and holiday deals",
            ],
        },
        {
            col_number: 4,
            col_values: [
                "Car rental",
                "Flight Finder",
                "Restaurant reservations",
                "Travel Agents",
            ],
        },
        {
            col_number: 5,
            col_values: [
                "Curtomer Service",
                "Partner Help",
                "Careers",
                "Sustainability",
                "Press center",
                "Safety Resource Center",
                "Investor relations",
                "Terms & conditions",
            ],
        },
    ];

    return (
        <div className="footer-container container d-flex py-5">
            {/* render data */}
            {footerArr.map((item) => (
                <div key={item.col_number} className="footer-item">
                    <div className="footer-item-sub">
                        {item.col_values.map((value, index) => (
                            <div className="my-2 item-sub-name" key={index}>
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Footer;
