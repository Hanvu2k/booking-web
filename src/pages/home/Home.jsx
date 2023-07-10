import React from "react";

import Card from "../../components/card/Card";
import NavBar from "../../components/navBar/NavBar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Contact from "../../components/contact/Contact";

import "./home.css";

const Home = () => {
    const cityArr = [
        {
            name: "Dublin",
            subText: "123 properties",
            image: "./images/city_1.webp",
        },
        {
            name: "Reno",
            subText: "533 properties",
            image: "./images/city_2.webp",
        },
        {
            name: "Austin",
            subText: "532 properties",
            image: "./images/city_3.webp",
        },
    ];

    const typeArr = [
        {
            name: "Hotels",
            count: 233,
            image: "./images/type_1.webp",
        },
        {
            name: "Apartments",
            count: 2331,
            image: "./images/type_2.jpg",
        },
        {
            name: "Resorts",
            count: 2331,
            image: "./images/type_3.jpg",
        },
        {
            name: "Villas",
            count: 2331,
            image: "./images/type_4.jpg",
        },
        {
            name: "Cabins",
            count: 2331,
            image: "./images/type_5.jpg",
        },
    ];

    const hotelsArray = [
        {
            name: "Aparthotel Stare Miasto",
            city: "Madrid",
            price: 120,
            rate: 8.9,
            type: "Excellent",
            image_url: "./images/hotel_1.webp",
        },
        {
            name: "Comfort Suites Airport",
            city: "Austin",
            price: 140,
            rate: 9.3,
            type: "Exceptional",
            image_url: "./images/hotel_2.jpg",
        },
        {
            name: "Four Seasons Hotel",
            city: "Lisbon",
            price: 99,
            rate: 8.8,
            type: "Excellent",
            image_url: "./images/hotel_3.jpg",
        },
        {
            name: "Hilton Garden Inn",
            city: "Berlin",
            price: 105,
            rate: 8.9,
            type: "Excellent",
            image_url: "./images/hotel_4.jpg",
        },
    ];

    const handleDetailClick = () => {
        location.replace("/detail");
    };

    return (
        <>
            <Card>
                <NavBar />
                <Header />
            </Card>
            {/* city */}
            <div className="img-container container d-flex justify-content-center ">
                {cityArr?.map((item, index) => {
                    return (
                        <div className="city-img" key={index}>
                            <img
                                className="city-img-link"
                                src={item.image}
                                alt={item.name}
                            />
                            <div className="city-img-info ">
                                <div className="city-img-name">{item.name}</div>
                                <div className="city-img-sub">
                                    {item.subText}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* type */}
            <div className="container">
                <h2 className="my-5">Browse by property type</h2>
                <div className="d-flex  align-items-center">
                    {typeArr?.map((item, index) => {
                        return (
                            <div className="type-item" key={index}>
                                <img
                                    className="type-img-link"
                                    src={item.image}
                                    alt={item.name}
                                />
                                <div className="type-name">{item.name}</div>
                                <div className="type-info">
                                    {item.count} hotels
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* hotels */}
            <div className="container">
                <h2 className="my-5">Homes guests love</h2>
                <div className="d-flex ">
                    {hotelsArray?.map((item, index) => {
                        return (
                            <div className="hotel-item" key={index}>
                                <img
                                    className="hotel-img-link"
                                    src={item.image_url}
                                    alt={item.name}
                                />
                                <div
                                    className="hotel-name my-2"
                                    onClick={handleDetailClick}
                                >
                                    {item.name}
                                </div>
                                <div className="hotel-city">{item.city}</div>
                                <div className="hotel-price my-2">
                                    Starting from {item.price}
                                </div>
                                <div className="d-flex align-items-center ">
                                    <div className="hotel-rate mr-2">
                                        {item.rate}
                                    </div>
                                    <div className="hotel-type">
                                        {item.type}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Card>
                <Contact />
            </Card>
            <Footer />
        </>
    );
};

export default Home;
