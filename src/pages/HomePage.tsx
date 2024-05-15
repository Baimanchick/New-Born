import BannerCarousel from '../components/Carousel/BannerCarousel'
import CategoryCardList from '../components/CategoryCardList'
import AdCardList from '../components/AdCardList'
import NewProductsList from '../components/NewProductsList'
import RecommendedProductsList from '../components/RecommendedProductsList'
import PopularProductsList from '../components/PopularProductsList'
import BrandCardList from '../components/BrandCardList'
import CustomerReviewsCarousel from '../components/Carousel/CustomerReviewsCarousel'

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
                    <RecommendedProductsList />
                    <PopularProductsList />
                    <CustomerReviewsCarousel />
                    <BrandCardList />
                </div>
            </div>
        </>
    )
}

export default HomePage
