import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import FilterPage from '../pages/FilterPage'
import DetailPage from '../pages/DetailPage'



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