import React from 'react'
import BannerCarousel from '../components/BannerCarousel'
import CategoryCardList from '../components/CategoryCardList'
import AdCardList from '../components/AdCardList'

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
                </div>
            </div>
            <div style={{ paddingBottom: '200px' }}></div>
        </>
    )
}

export default HomePage