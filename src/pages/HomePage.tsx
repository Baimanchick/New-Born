import React from 'react'
import BannerCarousel from '../components/BannerCarousel'
import CategoryCard from '../components/CategoryCard'

function HomePage() {
    return (
        <div>
            <BannerCarousel />
            <CategoryCard />
            <div style={{ paddingBottom: '200px' }}></div>
        </div>
    )
}

export default HomePage