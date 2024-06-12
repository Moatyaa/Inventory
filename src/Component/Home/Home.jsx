import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <Navbar />
            <div className='d-flex'>
                <Sidebar />
                <div className='home-content'>
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}
