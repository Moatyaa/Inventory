import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Login from "../Login/Login";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";


export default function Layout() {
    let [token, setToken] = useState('')

    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            setToken(localStorage.getItem("token"));
        }
    }, []);
    return <>
        <Outlet></Outlet>
    </>
}