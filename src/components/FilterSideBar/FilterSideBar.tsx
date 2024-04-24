import { useEffect, useState } from 'react';
import { Col, Flex, Layout, Row, } from 'antd';
import { ProductCard } from '../ProductCard/ProductCard';
import FilterMenuSideBar from './FilterMenuSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootStates } from '../../store/store';
import { fetchProducts } from '../../store/features/products/productSlice';
import { ProductCardType } from '../ProductCard/ProductCard.props';

const { Content } = Layout;

function FilterSideBar() {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 660);
    const dispatch = useDispatch<any>()
    const products = useSelector((states: RootStates) => states.products.products)

    useEffect(() => {
        dispatch(fetchProducts({
            limit: 16,
            offset: 0
        }))
    }, [dispatch])

    useEffect(() => {
        const handleMobileResize = () => setIsMobile(window.innerWidth < 660)
        window.addEventListener('resize', handleMobileResize);
        return () => {
            window.removeEventListener('resize', handleMobileResize);
        };
    }, []);

    return (
        <Layout style={{ margin: '20px 0px 20px 0px' }}>
            <Content style={{
                display: 'flex',
                gap: '20px',
                maxWidth: '1700px',
                margin: '40px auto'
            }}
            >
                <Layout style={{ padding: '0px', background: 'initial', display: `${isMobile ? 'none' : 'flex'}`, flexDirection: 'column', rowGap: '20px' }}>
                    <FilterMenuSideBar />
                </Layout>
                <Content>
                    <Flex gap={1} wrap={'wrap'}>
                        {
                            products.map((product: ProductCardType, index: number) => (
                                <ProductCard
                                    product={product}
                                />
                            ))
                        }
                    </Flex>

                </Content>
            </Content>
        </Layout>
    );
}

export default FilterSideBar;
