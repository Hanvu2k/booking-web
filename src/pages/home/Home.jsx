import React, { useEffect, useState } from "react";

import Card from "../../components/card/Card";
import Contact from "../../components/contact/Contact";

import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [hotelCity, setHotelCity] = useState();
    const [hotelType, setHotelType] = useState();
    const [hotelRating, setHotelRating] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await fetch(
                    `http://localhost:5000/api/v1/hotel/places`
                );

                const data = await res.json();
                setHotelCity(data.hotels);
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await fetch(
                    `http://localhost:5000/api/v1/hotel/places?key=type`
                );

                const data = await res.json();
                setHotelType(data.hotels);
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await fetch(
                    `http://localhost:5000/api/v1/hotel/rating`
                );

                const data = await res.json();
                setHotelRating(data.hotels);
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleDetailClick = (id) => {
        navigate(`/detail/${id}`);
    };

    return (
        <>
            {/* city */}
            <div className="img-container container d-flex justify-content-center ">
                {hotelCity?.map((item, index) => {
                    return (
                        <div className="city-img" key={index}>
                            <img
                                className="city-img-link"
                                src={item?.photos[0]}
                                alt={item?.name}
                            />
                            <div className="city-img-info ">
                                <div className="city-img-name">{item._id}</div>
                                <div className="city-img-sub">
                                    {item.count} properties
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
                    {hotelType?.map((item, index) => {
                        return (
                            <div className="type-item" key={index}>
                                <img
                                    className="type-img-link"
                                    src={item.photos[0]}
                                    alt={item.name}
                                />
                                <div className="type-name">{item.type}</div>
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
                    {hotelRating?.map((item, index) => {
                        return (
                            <div className="hotel-item" key={index}>
                                <img
                                    className="hotel-img-link"
                                    src={item.photos[0]}
                                    alt={item.name}
                                />
                                <div
                                    className="hotel-name my-2"
                                    onClick={() => handleDetailClick(item._id)}
                                >
                                    {item.name}
                                </div>
                                <div className="hotel-city">{item.city}</div>
                                <div className="hotel-price my-2">
                                    Starting from ${item.cheapestPrice}
                                </div>
                                <div className="d-flex align-items-center ">
                                    <div className="hotel-rate mr-2">
                                        {item.rating}.0
                                    </div>
                                    <div className="hotel-type">Excellent</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Card>
                <Contact />
            </Card>
        </>
    );
};

export default Home;
