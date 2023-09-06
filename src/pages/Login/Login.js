import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContextInfo } from "../../store/ContextInfo";

import "./Login.css";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { tokenHandler } = useContext(ContextInfo);

    const navigate = useNavigate();

    const validated = () => {
        if (!emailRef?.current?.value || !passwordRef?.current?.value) {
            alert("Please enter valid value");
            return false;
        }
        if (!emailRef?.current?.value.includes("@")) {
            alert("Invalid email!");
            return false;
        }
        if (passwordRef?.current?.value.length < 5) {
            alert("Password must be at least 8 characters");
            return false;
        }

        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const useInfo = {
            email: emailRef?.current?.value,
            password: passwordRef?.current?.value,
        };

        if (validated()) {
            try {
                const res = await fetch(
                    "https://bookingweb-server.onrender.com/api/v1/auth/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(useInfo),
                    }
                );

                if (res.status === 400) {
                    const error = await res.json();
                    alert(error.message);
                    return;
                }

                const data = await res.json();
                tokenHandler(data.user.token);

                alert(data.message);

                setEmail("");
                setPassword("");
                navigate("/");
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center">
            <h1 className="my-4">Login</h1>
            <form className="form-input" onSubmit={handleLogin}>
                <div className="user-input d-flex flex-column">
                    <input
                        type="text"
                        value={email}
                        ref={emailRef}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        value={password}
                        ref={passwordRef}
                        placeholder="Password"
                    />
                    <button
                        type="submit"
                        className="btn btn-primary btn-fullwidth"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
