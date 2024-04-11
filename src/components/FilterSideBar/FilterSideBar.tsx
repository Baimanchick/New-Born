import { useEffect, useState } from 'react';
import { Flex, Layout, Menu, Typography, theme } from 'antd';
import { ProductCard } from '../ProductCard/ProductCard';
import nutrilon from '../../assets/card/nutrilon.png';
import FilterMenuSideBar from './FilterMenuSideBar';

const { Content } = Layout;

function FilterSideBar() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [isTablet, setIsTablet] = useState<boolean>(window.innerWidth < 1000);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 510);



    useEffect(() => {
        const handleTabletResize = () => setIsTablet(window.innerWidth < 1000);
        const handleMobileResize = () => setIsMobile(window.innerWidth < 510)
        window.addEventListener('resize', handleTabletResize);
        window.addEventListener('resize', handleMobileResize);
        return () => {
            window.removeEventListener('resize', handleTabletResize);
            window.removeEventListener('resize', handleMobileResize);
        };
    }, []);

    return (
        <Layout style={{ margin: '20px 0px 20px 0px' }}>
            <Content style={{
                display: 'flex',
                flexDirection: `${isTablet ? 'column' : 'initial'}`,
                gap: '20px',
                maxWidth: '1700px',
                margin: '40px auto'
            }}
            >
                <Layout style={{ padding: '0px', background: 'initial', display: `${isMobile ? 'none' : 'flex'}`, flexDirection: 'column', rowGap: '20px' }}>
                    <FilterMenuSideBar />
                </Layout>
                <Content style={{ minHeight: 280, marginTop: `${isTablet ? '20px' : '0px'}` }}>
                    <Flex wrap={'wrap'} justify={'space-between'} style={{ rowGap: '15px' }}>
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                            <ProductCard
                                key={index}
                                price={2600}
                                rating={5}
                                title={"Смесь сухая Nutrilon Пепти Аллергия 800г с 0 месяцев"}
                                image={nutrilon}
                                tags={['800г', 'с 0 месяцев', 'new']}
                            />
                        ))}
                    </Flex>
                </Content>
            </Content>
        </Layout>
    );
}

export default FilterSideBar;
