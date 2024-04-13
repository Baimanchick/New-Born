import { Flex, Layout } from 'antd'
import DetailCarousel from '../components/Carousel/DetailCarousel'
import InfoBlock from '../components/Detail/InfoBlock'
import ReviewsDescription from '../components/Detail/ReviewsDescription'


function DetailPage() {
    return (
        <div className='container'>
            <Layout style={{ background: 'none' }}>
                <Flex style={{ flexDirection: 'column', rowGap: '15px' }}>
                    <Flex gap={15} justify={'space-between'}>
                        <DetailCarousel />
                        <InfoBlock />
                    </Flex>
                    <ReviewsDescription />
                </Flex>
            </Layout>
        </div>
    )
}

export default DetailPage