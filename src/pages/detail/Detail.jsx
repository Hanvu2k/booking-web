import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Card from "../../components/card/Card";
import Contact from "../../components/contact/Contact";

import "./detail.css";
import { DateRange } from "react-date-range";
import { ContextInfo } from "../../store/ContextInfo";
import { formattedDate } from "../../utils/formattedDate";
import { daysBetween } from "../../utils/daysBetween";
import { useCallback } from "react";

const Detail = () => {
    const { id } = useParams();
    const { userInfo, token } = useContext(ContextInfo);
    const [hotelData, setHotelData] = useState({});
    const [isOpenForm, setIsOpenForm] = useState(false);

    const [fullName, setFullName] = useState(userInfo?.fullName);
    const [email, setEmail] = useState(userInfo?.email);
    const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber);
    const [cardNumber, setCardNumber] = useState("");
    const [dateValue, setDateValue] = useState("");
    const [rooms, setRooms] = useState([]);
    const [select, setSelect] = useState([]);
    const [total, setTotal] = useState(0);
    const [payment, setPayment] = useState("");

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: "selection",
        },
    ]);

    const navigate = useNavigate();

    // get user info
    useEffect(() => {
        if (userInfo) {
            setFullName(userInfo?.fullName);
            setEmail(userInfo?.email);
            setPhoneNumber(userInfo?.phoneNumber);
        }
    }, [userInfo]);

    // get hotel data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    ` https://bookingweb-server.onrender.com/api/v1/hotel/detail?id=${id}`
                );
                const hotels = await response.json();
                setHotelData(hotels.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    const [startDate, endDate] = dateValue.split(" to ");

    // get room data
    useEffect(() => {
        const fetchData = async () => {
            if (!isOpenForm) return;

            if (!startDate || !endDate || startDate === endDate) {
                return;
            }

            try {
                const response = await fetch(
                    `https://bookingweb-server.onrender.com/api/v1/hotel/rooms?id=${id}&date=${dateValue}`
                );
                const rooms = await response.json();
                setRooms(rooms.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [startDate, endDate, dateValue, id, isOpenForm]);

    //   handle Date value
    const handleDateValue = (ranges) => {
        const { startDate, endDate } = ranges.selection;
        setState([ranges.selection]);
        setDateValue(formattedDate(startDate, endDate));
    };

    //   handle choose room
    const handleCheckedRoom = (e, roomNumber, roomInfo) => {
        const roomCheck = {
            id: roomInfo._id,
            name: roomInfo.title,
            room: roomNumber,
            price: roomInfo.price,
        };

        if (e.target.checked) {
            setSelect((prev) => [...prev, roomCheck]);
        } else {
            const currArr = select.filter((item) => {
                return (
                    item.name !== roomCheck.name || item.room !== roomCheck.room
                );
            });
            setSelect([...currArr]);
        }
    };

    //   handle calc total
    const handleTotal = useCallback(
        (arr) => {
            const priceDay = arr?.reduce((acc, curr) => {
                return acc + curr.price;
            }, 0);

            const dayRent = daysBetween(startDate, endDate);

            return priceDay * dayRent;
        },
        [endDate, startDate]
    );

    //   total effect
    useEffect(() => {
        setTotal(handleTotal(select) || 0);
    }, [select, dateValue, handleTotal]);

    //   handle reserve
    const handleReserve = async () => {
        if (!dateValue) {
            alert("Please select date");
            return;
        }

        if (
            !fullName ||
            !email ||
            !phoneNumber ||
            !cardNumber ||
            select.length === 0 ||
            !payment
        ) {
            alert("Please fill all fields");
            return;
        }

        const booking = {
            username: userInfo._id,
            hotelId: id,
            roomsSelected: select,
            dateStart: startDate,
            dateEnd: endDate,
            price: total,
            payment: payment,
        };

        try {
            const res = await fetch(
                `https://bookingweb-server.onrender.com/api/v1/transaction/booking?token=${token}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(booking),
                }
            );
            const data = await res.json();

            if (res.status === 400) {
                alert(data.message);
                return;
            }

            alert(data.message);
            navigate("/transaction");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {/* detail content */}
            <div className="container my-3">
                <div className="d-flex justify-content-between">
                    <div className="detail-info">
                        <h2 className="detail-title my-2">{hotelData.name}</h2>
                        <div className="detail-location d-flex my-2 align-items-center">
                            <div className="location-icon mr-2">
                                <i className="fa fa-map-marker"></i>
                            </div>
                            <div className="location-name">
                                {hotelData.address}
                            </div>
                        </div>
                        <div className="detail-distance my-2">
                            Excellent location - {hotelData.distance}m from
                            center
                        </div>
                        <div className="detail-price my-2">
                            {hotelData.price}
                        </div>
                    </div>
                    <div>
                        <button
                            className="btn btn-primary btn-br fw-6"
                            onClick={() => setIsOpenForm(true)}
                        >
                            Reserve or Book Now!
                        </button>
                    </div>
                </div>

                <div className="detail-imgs my-2">
                    {hotelData?.photos?.map((item, index) => {
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
                            {hotelData.title}
                        </div>
                        <p className="description-content">{hotelData.desc}</p>
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
                            <span>${hotelData.cheapestPrice}</span>
                            <span>(1 nights)</span>
                        </div>
                        <button
                            onClick={() => {
                                setIsOpenForm(true);
                            }}
                            className="btn btn-primary btn-br btn-fullwidth fw-6"
                        >
                            Reserve or Book Now!
                        </button>
                    </div>
                </div>
            </div>

            {isOpenForm && (
                <div className="container my-4">
                    <div className="info-booking d-flex justify-content-between">
                        <div className="date-info">
                            <h3 className="my-2">Dates</h3>
                            <DateRange
                                editableDateInputs={true}
                                minDate={new Date()}
                                moveRangeOnFirstSelection={false}
                                onChange={handleDateValue}
                                ranges={state}
                            />
                        </div>
                        <div className="reserve-info">
                            <h3 className="my-2">Reserve Info</h3>
                            <div className="user-info">
                                <form action="">
                                    <div className="input-form d-flex flex-column">
                                        <label>Your Full Name:</label>
                                        <input
                                            value={fullName}
                                            onChange={(e) =>
                                                setFullName(e.target.value)
                                            }
                                            type="text"
                                            placeholder="Full Name"
                                        />
                                    </div>
                                    <div className="input-form d-flex flex-column">
                                        <label>Your Email:</label>
                                        <input
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            type="text"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="input-form d-flex flex-column">
                                        <label>Your Phone Number:</label>
                                        <input
                                            value={phoneNumber}
                                            onChange={(e) =>
                                                setPhoneNumber(e.target.value)
                                            }
                                            type="text"
                                            placeholder="Phone Number"
                                        />
                                    </div>
                                    <div className="input-form d-flex flex-column">
                                        <label>
                                            Your Indetity Card Number:
                                        </label>
                                        <input
                                            value={cardNumber}
                                            onChange={(e) =>
                                                setCardNumber(e.target.value)
                                            }
                                            type="text"
                                            placeholder="Card Number"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="select-room">
                        <h3 className="my-3">Select Rooms</h3>
                        <div className="d-flex hotels-suitables flex-wrap">
                            {dateValue &&
                                rooms?.map((item) => {
                                    return (
                                        <div
                                            className="hotels-suitable mg-3"
                                            key={item._id}
                                        >
                                            <h4>{item.title}</h4>
                                            <div className="hotel-infos d-flex justify-content-between">
                                                <div className="info-booking-user">
                                                    <h4>
                                                        {" "}
                                                        Pay nothing until{" "}
                                                        {endDate}
                                                    </h4>
                                                    <div className="number-guest">
                                                        Max people:{" "}
                                                        <span>
                                                            {item.maxPeople}
                                                        </span>
                                                    </div>
                                                    <div className="price">
                                                        ${item.price}
                                                    </div>
                                                </div>
                                                <div className="d-flex info-rooms">
                                                    {item.roomNumbers.map(
                                                        (room) => {
                                                            return (
                                                                <div
                                                                    className="info-room d-flex flex-column mr-2"
                                                                    key={room}
                                                                >
                                                                    <label htmlFor="">
                                                                        {room}
                                                                    </label>
                                                                    <input
                                                                        type="checkbox"
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            handleCheckedRoom(
                                                                                e,
                                                                                room,
                                                                                item
                                                                            );
                                                                        }}
                                                                    />
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="total-bill pb-4">
                        <h3 className="my-2">Total Bill: ${total}</h3>
                        <div className="payments d-flex justify-content-between">
                            <div className="payment-method">
                                <select
                                    onChange={(e) => {
                                        setPayment(e.target.value);
                                    }}
                                >
                                    <option defaultValue>
                                        {" "}
                                        Select Payment Method
                                    </option>
                                    <option value="Cash">Cash</option>
                                    <option value="Credit Card">
                                        Credit Card
                                    </option>
                                </select>
                            </div>
                            <div>
                                <button
                                    onClick={handleReserve}
                                    className="btn btn-primary btn-br btn-big"
                                >
                                    Reserve Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* contact  */}
            <Card>
                <Contact />
            </Card>
        </div>
    );
};

export default Detail;
