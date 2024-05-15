import { lazy } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import { useAppSelector } from "../hooks/hooks";
const HomePage = lazy(() => import("../pages/HomePage"));
const FilterPage = lazy(() => import("../pages/FilterPage"));
const DetailPage = lazy(() => import("../pages/DetailPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const FavoritePage = lazy(() => import("../pages/FavoritePage"));
const NotFoundedPage = lazy(() => import("../pages/NotFoundedPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const DeliveryPage = lazy(() => import("../pages/DeliveryPage"));

function MainRoutes() {
  const isAuth = useAppSelector((store) => store.auth.isAuth);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route
          path="/cart"
          element={!isAuth ? <Navigate to={"/register"} /> : <CartPage />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/profile"
          element={!isAuth ? <Navigate to={"/"} /> : <ProfilePage />}
        />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/profile" element={<FavoritePage />} />
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
