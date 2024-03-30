import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import "../styles/main.scss"

function MainLayout() {
    return (
        <>
            <div className='container'>
                <Navbar />
                <Outlet />
            </div>
        </>
    )
}

export default MainLayout