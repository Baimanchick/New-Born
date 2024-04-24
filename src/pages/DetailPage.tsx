import { Flex, Layout } from 'antd'
import DetailCarousel from '../components/Carousel/DetailCarousel'
import InfoBlock from '../components/Detail/InfoBlock'
import DetailReviewsDescription from '../components/Detail/DetailReviewsDescription'


function DetailPage() {
    return (
        <div className='container'>
            <Layout style={{ background: 'none' }}>
                <Flex style={{ flexDirection: 'column', rowGap: '15px' }}>
                    <Flex gap={15} justify={'space-between'}>
                        <DetailCarousel />
                        <InfoBlock />
                    </Flex>
                    <DetailReviewsDescription />
                </Flex>
            </Layout>
        </div>
    )
}

export default DetailPage