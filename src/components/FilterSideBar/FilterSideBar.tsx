import { useEffect, useState } from 'react';
import { Col, Flex, Layout, Menu, Row, Typography, theme } from 'antd';
import { ProductCard } from '../ProductCard/ProductCard';
import nutrilon from '../../assets/card/nutrilon.png';
import FilterMenuSideBar from './FilterMenuSideBar';

const { Content } = Layout;

function FilterSideBar() {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 660);

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
                    <Row gutter={[16, 16]}>
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                            <Col span={12}>

                                <ProductCard
                                    key={index}
                                    price={2600}
                                    rating={5}
                                    title={"Смесь сухая Nutrilon Пепти Аллергия 800г с 0 месяцев"}
                                    image={nutrilon}
                                    tags={['800г', 'с 0 месяцев', 'new']}
                                />
                            </Col>
                        ))}
                    </Row>

                </Content>
            </Content>
        </Layout>
    );
}

export default FilterSideBar;
