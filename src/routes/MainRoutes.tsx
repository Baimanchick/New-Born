import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
const HomePage = lazy(() => import("../pages/HomePage"))
const FilterPage = lazy(() => import("../pages/FilterPage"))
const DetailPage = lazy(() => import("../pages/DetailPage"))
const CartPage = lazy(() => import("../pages/CartPage"))
const NotFoundedPage = lazy(() => import("../pages/NotFoundedPage"))

function MainRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/filter' element={<FilterPage />} />
                <Route path='/detail/:id' element={<DetailPage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/*' element={<NotFoundedPage />} />
            </Route>
        </Routes>
    )
}

export default MainRoutes
