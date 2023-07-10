import React, { useState } from "react";
import { DateRange } from "react-date-range";

import "./header.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// format date functions
const formattedDate = (start, end) => {
    const startDate = start.toLocaleDateString();
    const endDate = end.toLocaleDateString();
    return `${startDate} to ${endDate}`;
};

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

    // handle select day
    const handleDateSelect = (ranges) => {
        setDateRange([ranges.selection]);
        setDateValue(
            formattedDate(ranges.selection.startDate, ranges.selection.endDate)
        );
        if (ranges.selection.endDate) {
            setIsDateRangeOpen(false);
        }
    };

    // redirect page to search page
    const handleSearchClick = () => {
        location.replace("/search");
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
            <button className="btn btn-primary">Sign in/Register</button>
            <div className="header-search d-flex justify-content-between">
                <div className="header-search-input d-flex align-items-center ml-5">
                    <i className="fa fa-bed icon-header"></i>
                    <input
                        className="search-box"
                        type="text"
                        placeholder="Where are you going?"
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
                        type="text"
                        placeholder="1 adult . 0 children . 1 room"
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
                        Selection={false}
                        showDateDisplay={false}
                    />
                )}
            </div>
        </div>
    );
};

export default Header;
