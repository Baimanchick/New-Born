import React, { lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
const HomePage = lazy(() => import("../pages/HomePage"))
const FilterPage = lazy(() => import("../pages/FilterPage"))
const DetailPage = lazy(() => import("../pages/DetailPage"))




function MainRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/filter' element={<FilterPage />} />
                <Route path='/detail' element={<DetailPage />} />
            </Route>
        </Routes>
    )
}

export default MainRoutes