import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import { useAppSelector } from "../hooks/hooks";
const HomePage = lazy(() => import("../pages/HomePage"));
const FilterPage = lazy(() => import("../pages/FilterPage"));
const DetailPage = lazy(() => import("../pages/DetailPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const NotFoundedPage = lazy(() => import("../pages/NotFoundedPage"));

function MainRoutes() {
  const isAuth = useAppSelector((store) => store.auth.user !== null);
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/auth"
          element={isAuth ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuth ? <Navigate to={"/"} /> : <Register />}
        />
        <Route path="/*" element={<NotFoundedPage />} />
      </Route>
    </Routes>
  );
}

export default MainRoutes;
