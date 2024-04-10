import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import FilterPage from '../pages/FilterPage'

function MainRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/filter' element={<FilterPage />} />
            </Route>
        </Routes>
    )
}

export default MainRoutes