import React, { useContext, useEffect, useState } from "react";
import { ContextInfo } from "../../store/ContextInfo";

import "./Transaction.css";

function Transaction() {
    const { token } = useContext(ContextInfo);

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `https://bookingweb-server.onrender.com/api/v1/transaction/getBooking?token=${token}`
                );

                const data = await res.json();

                setTableData(data.transactions);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [token]);

    return (
        <div className="container my-4">
            <h3 className="my-4">Your transactions</h3>
            <table>
                <thead>
                    <tr className="table-head">
                        <td>#</td>
                        <td>Hotel</td>
                        <td>Room</td>
                        <td>Date</td>
                        <td>Price</td>
                        <td>Payment Method</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {tableData?.map((item, index) => {
                        return (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.hotel}</td>
                                <td>{item.room.join(",")}</td>
                                <td>
                                    {item.dateStart}-{item.dateEnd}
                                </td>
                                <td>${item.price}</td>
                                <td>{item.payment}</td>
                                <td className="status booked">
                                    <span>{item.status}</span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Transaction;
