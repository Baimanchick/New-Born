import React from 'react'
import BannerCarousel from '../components/BannerCarousel'
import CategoryCardList from '../components/CategoryCardList'
import AdCardList from '../components/AdCardList'

import nutrilon from '../assets/card/nutrilon.png'
import agusha from '../assets/card/agusha.png'
import {ProductCard} from '../components/'

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
                    <ProductCard
                        price={2699}
                        rating={5}
                        title={"Смесь сухая Nutrilon Пепти Аллергия 800г с 0 месяцев"}
                        image={nutrilon}
                        tags={['800г', 'с 0 месяцев', 'new']}
                    />
                </div>
            </div>
            <div style={{ paddingBottom: '200px' }}></div>
        </>
    )
}

export default HomePage
