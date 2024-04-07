import React from 'react'
import BannerCarousel from '../components/Carousel/BannerCarousel'
import CategoryCardList from '../components/CategoryCardList'
import AdCardList from '../components/AdCardList'
import NewProductsList from '../components/NewProductsList'
import RecommendedProductsList from '../components/RecommendedProductsList'
import PopularProductsList from '../components/PopularProductsList'

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
                    <NewProductsList />
                    <div className='turquoise'>
                        <RecommendedProductsList />
                    </div>
                    <PopularProductsList />
                </div>
            </div>
            <div style={{ paddingBottom: '200px' }}></div>
        </>
    )
}

export default HomePage
