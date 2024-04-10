import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Flex, Layout, Menu } from 'antd';
import PriceRangeSelector from '../PriceRangeSelector/PriceRangeSelector';
import NewProductsList from '../NewProductsList';
import styles from "./filterSideBar.module.scss";
import { ProductCard } from '../ProductCard/ProductCard';
import nutrilon from '../../assets/card/nutrilon.png'


const { Content, Sider } = Layout;

function FilterSideBar() {
    return (
        <Layout style={{ margin: '20px 0px 20px 0px' }}>
            <Content style={{ margin: '40px 0px 40px 0px', display: 'flex' }}>
                <Layout style={{ padding: '0px', background: 'initial', display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
                    <Sider style={{ background: 'initial', borderRadius: '20px', flex: 'none', }} width={350}>
                        <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['drop1', "drop5"]} style={{ height: '100%', borderRadius: '20px' }}>
                            <Menu.SubMenu key="drop1" title="Каталог">
                                <Menu.SubMenu key="drop5" title="Питание с 6 месяцев">
                                    <Menu.Item style={{ fontWeight: '500', color: '#7B7B7B' }}>Пюре овощные</Menu.Item>
                                </Menu.SubMenu>
                            </Menu.SubMenu>
                        </Menu>
                    </Sider>
                    <Sider style={{ background: 'initial', borderRadius: '20px', flex: 'none', }} width={350}>
                        <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['drop2']} style={{ height: '100%', borderRadius: '20px' }}>
                            <Menu.SubMenu key="drop2" title="Цена, сом">
                                <PriceRangeSelector />
                            </Menu.SubMenu>
                        </Menu>
                    </Sider>
                    <Sider style={{ background: 'initial', borderRadius: '20px', flex: 'none', }} width={350}>
                        <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['drop3', 'drop6']} style={{ height: '100%', borderRadius: '20px' }}>
                            <Menu.SubMenu key="drop3" title="Бренд"  >
                                <Menu.SubMenu key="drop6" title="Агуша">
                                    <Menu.Item style={{ fontWeight: '500', color: '#7B7B7B' }}>Пюре овощные</Menu.Item>
                                </Menu.SubMenu>
                            </Menu.SubMenu>
                        </Menu>
                    </Sider>
                </Layout>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <Flex wrap={'wrap'} justify={'space-between'} style={{ rowGap: '15px' }}>
                        {[1, 2, 3, 4, 5, 6].map((index: number) => (
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