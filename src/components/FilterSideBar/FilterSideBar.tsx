import React, { useEffect, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Flex, Layout, Menu, Typography, theme } from 'antd';
import PriceRangeSelector from '../PriceRangeSelector/PriceRangeSelector';
import NewProductsList from '../NewProductsList';
import styles from "./filterSideBar.module.scss";
import { ProductCard } from '../ProductCard/ProductCard';
import nutrilon from '../../assets/card/nutrilon.png';

const { Content, Sider } = Layout;
const { Title } = Typography;

const items2 = [
    {
        key: 'sub1',
        icon: <UserOutlined />,
        label: 'Питание с 6 месяцев',
        children: [
            { key: 1, label: 'Пюре овощные' }
        ]
    }
];

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
                margin: '40px 0px 40px 0px',
                display: 'flex',
                flexDirection: `${isTablet ? 'column' : 'initial'}`,
                gap: '20px'
            }}
            >
                <Layout style={{ padding: '0px', background: 'initial', display: `${isMobile ? 'none' : 'flex'}`, flexDirection: 'column', rowGap: '20px' }}>
                    <Sider style={{ background: colorBgContainer, borderRadius: borderRadiusLG, flex: 'none', }} width={`${isTablet ? '100%' : '350'}`}>
                        <Menu mode="inline" style={{ height: '100%', borderRadius: borderRadiusLG }}>
                            <Flex style={{ flexDirection: 'column', padding: '20px' }}>
                                <Title style={{ color: '#1B81E7', fontWeight: '1000', fontSize: '22px' }}>Каталог</Title>
                                {items2.map(item => (
                                    <Menu.SubMenu key={item.key} title={item.label}>
                                        {item.children.map(child => (
                                            <Menu.Item key={child.key} style={{ fontWeight: '500', color: '#7B7B7B', backgroundColor: 'none', paddingLeft: '24px' }}>{child.label}</Menu.Item>
                                        ))}
                                    </Menu.SubMenu>
                                ))}
                            </Flex>
                        </Menu>
                    </Sider>
                    <Sider style={{ background: colorBgContainer, borderRadius: borderRadiusLG, flex: 'none', }} width={`${isTablet ? '100%' : '350'}`}>
                        <Menu mode="inline" style={{ height: '100%', borderRadius: borderRadiusLG }}>
                            <Flex style={{ flexDirection: 'column', padding: '20px' }}>
                                <Title style={{ color: '#1B81E7', fontWeight: '1000', fontSize: '22px' }}>Цена, сом</Title>
                                <PriceRangeSelector />
                            </Flex>
                        </Menu>
                    </Sider>
                    <Sider style={{ background: colorBgContainer, borderRadius: borderRadiusLG, flex: 'none', }} width={`${isTablet ? '100%' : '350'}`}>
                        <Menu mode="inline" style={{ height: '100%', borderRadius: borderRadiusLG }}>
                            <Flex style={{ flexDirection: 'column', padding: '20px' }}>
                                <Title style={{ color: '#1B81E7', fontWeight: '1000', fontSize: '22px' }}>Бренд</Title>
                                {items2.map(item => (
                                    <Menu.SubMenu key={item.key} title={item.label}>
                                        {item.children.map(child => (
                                            <Menu.Item key={child.key} style={{ fontWeight: '500', color: '#7B7B7B', backgroundColor: 'none', paddingLeft: '24px' }}>{child.label}</Menu.Item>
                                        ))}
                                    </Menu.SubMenu>
                                ))}
                            </Flex>
                        </Menu>
                    </Sider>
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
