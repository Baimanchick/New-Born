import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import "../styles/main.scss"
import Footer from '../components/Footer/Footer'

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function MainLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
            <ScrollToTop />
        </>
    )
}

export default MainLayout