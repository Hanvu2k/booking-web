import React, { useRef, useState, useContext } from "react";
import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";

import { ContextInfo } from "../../store/ContextInfo";
import { formattedDate } from "../../utils/formattedDate";
import "./header.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// format date functions

const Header = () => {
    // useState
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: "selection",
        },
    ]);
    const [dateValue, setDateValue] = useState(
        formattedDate(new Date(), new Date())
    );
    const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
    const { token } = useContext(ContextInfo);

    const { inputHandler } = useContext(ContextInfo);

    // user input state
    const [place, setPlace] = useState();
    const [adult, setAdult] = useState();
    const [children, setChildren] = useState();
    const [room, setRoom] = useState();
    const placeRef = useRef();
    const adultRef = useRef();
    const childrenRef = useRef();
    const roomRef = useRef();

    const navigate = useNavigate();

    // handle select day
    const handleDateSelect = (ranges) => {
        const { startDate, endDate } = ranges.selection;
        setDateRange([ranges.selection]);
        setDateValue(formattedDate(startDate, endDate));
        if (startDate !== endDate) {
            setIsDateRangeOpen(false);
        }
    };

    // redirect page to search page
    const handleSearchClick = () => {
        if (
            placeRef?.current?.value &&
            adultRef?.current?.value &&
            childrenRef?.current?.value &&
            roomRef?.current?.value
        ) {
            const dataUserInput = {
                city: placeRef?.current?.value,
                adult: adultRef?.current?.value,
                children: childrenRef?.current?.value,
                room: roomRef?.current?.value,
                date: dateValue,
            };
            inputHandler(dataUserInput);
        }

        setPlace(undefined);
        setAdult(undefined);
        setChildren(undefined);
        setRoom(undefined);

        navigate("/search");
    };

    return (
        <div className="container header-container pb-2">
            <div className="header-title">
                <h1>A lifetime of discounts? It's Genius.</h1>
            </div>
            <div className="header-description my-4">
                <p>
                    Get rewarded for your travels - unlock instant savings of
                    10% or more with a free account.
                </p>
            </div>
            {!token && (
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        navigate("/login");
                    }}
                >
                    Sign in/Register
                </button>
            )}
            <div className="header-search d-flex justify-content-between">
                <div className="header-search-input d-flex align-items-center ml-5">
                    <i className="fa fa-bed icon-header"></i>
                    <input
                        className="search-box"
                        type="text"
                        placeholder="Where are you going?"
                        ref={placeRef}
                        value={place}
                        defaultValue={""}
                    />
                </div>
                <div className="header-search-input d-flex align-items-center">
                    <i className="fa fa-calendar icon-header"></i>
                    <input
                        className="search-box"
                        type="text"
                        value={dateValue}
                        readOnly
                        onClick={() => setIsDateRangeOpen(!isDateRangeOpen)}
                    />
                </div>
                <div className="header-search-input d-flex align-items-center">
                    <i className="fa fa fa-female icon-header"></i>
                    <input
                        className="search-box"
                        type="number"
                        min={0}
                        placeholder="0 adult"
                        value={adult}
                        ref={adultRef}
                        defaultValue={undefined}
                    />
                    <input
                        className="search-box"
                        type="number"
                        min={0}
                        placeholder=". 0 children"
                        value={children}
                        ref={childrenRef}
                        defaultValue={undefined}
                    />
                    <input
                        className="search-box"
                        type="number"
                        min={0}
                        placeholder=". 0 room"
                        value={room}
                        ref={roomRef}
                        defaultValue={undefined}
                    />
                </div>
                <button
                    className="btn btn-primary btn-search"
                    onClick={handleSearchClick}
                >
                    Search
                </button>
                {/* open date box */}
                {isDateRangeOpen && (
                    <DateRange
                        editableDateInputs={true}
                        className="date-position"
                        minDate={new Date()}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                        onChange={handleDateSelect}
                        showDateDisplay={false}
                    />
                )}
            </div>
        </div>
    );
};

export default Header;
