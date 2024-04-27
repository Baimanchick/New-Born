import { Flex, Layout } from 'antd'
import DetailCarousel from '../components/Carousel/DetailCarousel'
import InfoBlock from '../components/Detail/InfoBlock'
import DetailReviewsDescription from '../components/Detail/DetailReviewsDescription'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { useEffect, useState } from 'react'
import { fetchOneProducts } from '../store/features/products/oneProductSlice'
import Loading from '../components/Loader/Loading'


function DetailPage() {
    const { id } = useParams()
    const dispatch = useAppDispatch();
    const product = useAppSelector((state) => state.oneProduct.product);
    const numberId = Number(id)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchOneProducts(numberId))
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [dispatch, id]);

    if (!product) {
        return <Loading />
    }


    return (
        <div className='container'>
            <Layout style={{ background: 'none' }}>
                <Flex style={{ flexDirection: 'column', rowGap: '15px' }}>
                    <Flex gap={15} justify={'space-between'}>
                        <DetailCarousel product={product} />
                        <InfoBlock product={product} />
                    </Flex>
                    <DetailReviewsDescription product={product} />
                </Flex>
            </Layout>
        </div>
    )
}

export default DetailPage