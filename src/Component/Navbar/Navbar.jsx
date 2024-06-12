import React, { useContext, useState } from "react";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

export default function Navbar() {
    let [token, setToken] = useState('')
    let [role, setRole] = useState('')
    let [firstName, setFirstName] = useState('')
    let navigate = useNavigate();

    function logout() {
        navigate('/login')
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('firstName')
    }


    return (
        <>
            <nav className="nav  p-0 b-shadow">
                <div className="center justify-content-between w-100">
                    <div className="logo">
                        <div className="bg-img">
                        </div>
                    </div>
                    <div className="d-flex mx-5">
                        <div className="center">
                            <div className="user-data d-flex mx-5">
                                <div className="direction">
                                    <p className="m-0 text-color">{localStorage.getItem('userName')}</p>
                                    <p className="m-0">{localStorage.getItem('role')}</p>
                                </div>
                                <div className="center">
                                    <i className="fa-solid large-fs fa-user mx-3  fw-2"></i>
                                </div>
                            </div>
                            <Link onClick={() => logout()}>
                                <button className="btn font-sm">تسجيل الخروج</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
