import BannerCarousel from "../components/Carousel/BannerCarousel";
import CategoryCardList from "../components/CategoryCardList";
import AdCardList from "../components/AdCardList";
import NewProductsList from "../components/NewProductsList";
import RecommendedProductsList from "../components/RecommendedProductsList";
import PopularProductsList from "../components/PopularProductsList";
import BrandCardList from "../components/BrandCardList";
import CustomerReviewsCarousel from "../components/Carousel/CustomerReviewsCarousel";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { fetchFavorites } from "../store/features/favorite/favoriteSlice";

function HomePage() {
  const dispatch = useAppDispatch();
  const isOnFilterPage = window.location.pathname === "/filter";
  const isAuth = useAppSelector((state) => state.auth.user !== null)

  if (!isOnFilterPage) {
    localStorage.removeItem("catalogKey");
    localStorage.removeItem("subKey");
  }

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchFavorites());
    }
  }, [isAuth, dispatch]);

  return (
    <>
      <div className="container">
        <BannerCarousel />
        <CategoryCardList />
      </div>
      <div className="container-gray">
        <div className="gray">
          <AdCardList />
          <NewProductsList />
          <RecommendedProductsList />
          <PopularProductsList />
          <CustomerReviewsCarousel />
          <BrandCardList />
        </div>
      </div>
    </>
  );
}

export default HomePage;
