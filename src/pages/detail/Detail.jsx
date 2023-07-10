import React from "react";

import Card from "../../components/card/Card";
import NavBar from "../../components/navBar/NavBar";
import Contact from "../../components/contact/Contact";
import Footer from "../../components/footer/Footer";

import "./detail.css";

const Detail = () => {
    // data inite
    const detailInfo = {
        name: "Tower Street Apartments",
        address: "Elton St 125 New york",
        distance: "Excellent location - 500m from center",
        price: "Book a stay over $114 at this property and get a free airport taxi",
        photos: [
            "./images/hotel_detail_1.jpg",
            "./images/hotel_detail_2.jpg",
            "./images/hotel_detail_3.jpg",
            "./images/hotel_detail_4.jpg",
            "./images/hotel_detail_5.jpg",
            "./images/hotel_detail_6.jpg",
        ],
        title: "Stay in the heart of City",
        description:
            "Located a 5-minute walk from St. Florian's Gate in Krakow, Tower Street Apartments has accommodations with air conditioning and free WiFi.The units come with hardwood floors and feature a fully equipped kitchenette with a microwave, a flat - screen TV, and a private bathroom with shower and a hairdryer.A fridge is also offered, as well as an electric tea pot and a coffee machine.Popular points of interest near the apartment include Cloth Hall, Main Market Square and Town Hall Tower.The nearest airport is John Paul II International Kraków - Balice, 16.1 km from Tower Street Apartments, and the property offers a paid airport shuttle service.",
        nine_night_price: 955,
    };

    return (
        <div>
            {/* nav bar */}
            <Card>
                <NavBar />
            </Card>
            {/* detail content */}
            <div className="container my-3">
                <div className="d-flex justify-content-between">
                    <div className="detail-info">
                        <h2 className="detail-title my-2">{detailInfo.name}</h2>
                        <div className="detail-location d-flex my-2 align-items-center">
                            <div className="location-icon mr-2">
                                <i className="fa fa-map-marker"></i>
                            </div>
                            <div className="location-name">
                                {detailInfo.address}
                            </div>
                        </div>
                        <div className="detail-distance my-2">
                            {detailInfo.distance}
                        </div>
                        <div className="detail-price my-2">
                            {detailInfo.price}
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-primary btn-br fw-6">
                            Reserve or Book Now!
                        </button>
                    </div>
                </div>

                <div className="detail-imgs my-2">
                    {detailInfo.photos.map((item, index) => {
                        return (
                            <div className="img-item" key={index}>
                                <img
                                    className="img-item-link"
                                    src={item}
                                    alt="hotel_detail"
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="d-flex my-5 ">
                    <div className="detail-description">
                        <div className="description-title mb-5">
                            {detailInfo.title}
                        </div>
                        <p className="description-content">
                            {detailInfo.description}
                        </p>
                    </div>
                    <div className="detail-nine_night_price pd-4 ml-2">
                        <h4 className="nine_night_price-title mt-2 mb-4">
                            Perfect for a 9-night stay
                        </h4>
                        <div className="nine_night_price-content my-3">
                            Located in the real heart of Krakow, this property
                            has excellent location score of 8.9!
                        </div>
                        <div className="nine_night_price-number my-3">
                            <span>${detailInfo.nine_night_price}</span>
                            <span>(9 nights)</span>
                        </div>
                        <button className="btn btn-primary btn-br btn-fullwidth fw-6">
                            Reserve or Book Now!
                        </button>
                    </div>
                </div>
            </div>
            {/* contact  */}
            <Card>
                <Contact />
            </Card>
            {/* footer */}
            <Footer />
        </div>
    );
};

export default Detail;
