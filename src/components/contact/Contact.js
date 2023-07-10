import React from "react";

import "./contact.css";

const Contact = () => {
    return (
        <div className="register-form-container d-flex flex-column justify-content-center align-items-center ">
            <h1 className="title">Save time, save money</h1>
            <p className="my-4 sub-title">
                Sign up and we'll send the best deals to you
            </p>
            <div className="register-form d-flex  justify-content-center">
                <input
                    className="mr-2 register-input"
                    type="text"
                    placeholder="Your Email"
                />
                <button className="btn btn-primary btn-br">Subscribe</button>
            </div>
        </div>
    );
};

export default Contact;
