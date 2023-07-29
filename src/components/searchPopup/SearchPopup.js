import React, { useContext, useState, useCallback } from "react";
import { ContextInfo } from "../../store/ContextInfo";

import "./searchPopup.css";

const SearchPopup = () => {
    const { info, hotelsHandler } = useContext(ContextInfo);

    const [city, setCity] = useState(info.city);
    const [date, setDate] = useState(info.date);
    const [adult, setAdult] = useState(info.adult);
    const [children, setChildren] = useState(info.children);
    const [room, setRoom] = useState(info.room);

    const searchHotelsHandler = useCallback(async () => {
        // Prepare the data for the POST request
        const searchData = {
            city: city,
            maxPeople: +adult + +children,
            roomNumbers: +room,
            date: date.split(" to "),
        };

        try {
            // Send the POST request to the API
            const response = await fetch(
                "http://localhost:5000/api/v1/hotel/search",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(searchData),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }

            // Parse the response data
            const data = await response.json();

            // Handle the response data, for example, set the retrieved hotels in the state
            hotelsHandler(data.data || [], data.message || "");
        } catch (error) {
            console.error("Error searching hotels:", error);
            // You can handle the error here, show an error message, etc.
        }
    }, [city, adult, children, room, date, hotelsHandler]);

    return (
        <div className="searchPopup-container mx-2 my-3">
            <h2 className="searchPopup-title my-2">Search</h2>
            <div className="searchPopup-form">
                <div className="searchPopup-destination my-2">
                    <h5 className="desitnation-title my-1">Destination</h5>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="searchPopup-checkin my-2">
                    <h5 className="checkin-title my-1">Check-in Date</h5>
                    <input
                        type="text"
                        className="no-calendar-icon"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="searchPopup-options my-2">
                    <h5 className="options-title my-1">Options</h5>
                    <div className="option-items my-2">
                        {/* <div className="option-item d-flex justify-content-between my-2">
                            <div className="option-item-name">
                                Min price per night
                            </div>
                            <input
                                className="option-item-input"
                                type="number"
                            />
                        </div>
                        <div className="option-item d-flex justify-content-between my-2">
                            <div className="option-item-name">
                                Max price per night
                            </div>
                            <input
                                className="option-item-input"
                                type="number"
                            />
                        </div> */}
                        <div className="option-item d-flex justify-content-between my-2">
                            <div className="option-item-name">Adult</div>
                            <input
                                className="option-item-input"
                                type="number"
                                value={adult}
                                onChange={(e) => setAdult(e.target.value)}
                            />
                        </div>
                        <div className="option-item d-flex justify-content-between my-2">
                            <div className="option-item-name">Children</div>
                            <input
                                className="option-item-input"
                                type="number"
                                value={children}
                                onChange={(e) => setChildren(e.target.value)}
                            />
                        </div>
                        <div className="option-item d-flex justify-content-between my-2">
                            <div className="option-item-name">Room</div>
                            <input
                                className="option-item-input"
                                type="number"
                                value={room}
                                onChange={(e) => setRoom(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <button
                    onClick={searchHotelsHandler}
                    className="btn btn-primary btn-fullwidth mt-4"
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchPopup;
