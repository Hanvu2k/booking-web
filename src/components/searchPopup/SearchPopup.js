import React from "react";

import "./searchPopup.css";

const SearchPopup = () => {
    return (
        <div className="searchPopup-container mx-2 my-3">
            <h2 className="searchPopup-title my-2">Search</h2>
            <div className="searchPopup-form">
                <div className="searchPopup-destination my-2">
                    <h5 className="desitnation-title my-1">Destination</h5>
                    <input type="text" />
                </div>
                <div className="searchPopup-checkin my-2">
                    <h5 className="checkin-title my-1">Check-in Date</h5>
                    <input
                        type="text"
                        defaultValue="06/24/2022 to 06/24/2022"
                        className="no-calendar-icon"
                    />
                </div>
                <div className="searchPopup-options my-2">
                    <h5 className="options-title my-1">Options</h5>
                    <div className="option-items my-2">
                        <div className="option-item d-flex justify-content-between my-2">
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
                        </div>
                        <div className="option-item d-flex justify-content-between my-2">
                            <div className="option-item-name">Adult</div>
                            <input
                                className="option-item-input"
                                type="number"
                                defaultValue="1"
                            />
                        </div>
                        <div className="option-item d-flex justify-content-between my-2">
                            <div className="option-item-name">Children</div>
                            <input
                                className="option-item-input"
                                type="number"
                                defaultValue="0"
                            />
                        </div>
                        <div className="option-item d-flex justify-content-between my-2">
                            <div className="option-item-name">Room</div>
                            <input
                                className="option-item-input"
                                type="number"
                                defaultValue="1"
                            />
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary btn-fullwidth mt-4">
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchPopup;
