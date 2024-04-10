import React from 'react'
import BannerCarousel from '../components/Carousel/BannerCarousel'
import CategoryCardList from '../components/CategoryCardList'
import AdCardList from '../components/AdCardList'
import NewProductsList from '../components/NewProductsList'
import RecommendedProductsList from '../components/RecommendedProductsList'
import PopularProductsList from '../components/PopularProductsList'
import { ReviewsCarousel } from '../components/Carousel/ReviewsCarousel'
import BrandCardList from '../components/BrandCardList'

function HomePage() {
    return (
        <>
            <div className='container'>
                <BannerCarousel />
                <CategoryCardList />
            </div>
            <div className='container-gray'>
                <div className='gray'>
                    <AdCardList />
                    <PopularProductsList />
                    <div className='turquoise'>
                        <RecommendedProductsList />
                    </div>
                    <NewProductsList />
                    <ReviewsCarousel />
                    <BrandCardList />
                </div>
            </div>
        </>
    )
}

export default HomePage
