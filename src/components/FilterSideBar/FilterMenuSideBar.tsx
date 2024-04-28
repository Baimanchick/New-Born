import type { MenuProps } from 'antd';
import { Flex, Layout, Menu, Typography, theme } from 'antd';
import PriceRangeSelector from '../PriceRangeSelector/PriceRangeSelector';
import styles from "./filterSideBar.module.scss"


type MenuItem = Required<MenuProps>['items'][number];

const { Sider } = Layout;
const { Title } = Typography;

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const item1: MenuProps['items'] = [
    getItem('Искусственное вскармливание', 'drop1', null, [getItem('Пюре овощные', ''),]),
];

const item2: MenuProps['items'] = [
    getItem('Агуша', 'drop2', null, [getItem('Пюре овощные', ''),]),
];

function FilterMenuSideBar() {
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };
    const {
        token: { colorBgContainer, },
    } = theme.useToken();

    return (
        <>
            <Sider style={{ background: colorBgContainer, flex: 'none', borderRadius: 20 }} width={'460'}>
                <Flex style={{ flexDirection: 'column', padding: '20px' }}>
                    <Title style={{ color: '#1B81E7', fontWeight: '1000', fontSize: '22px', cursor: 'pointer' }}>Каталог</Title>
                    <Menu
                        onClick={onClick}
                        style={{ width: '100%' }}
                        defaultOpenKeys={['drop1']}
                        mode="inline"
                        items={item1}
                        className={styles.menuCustomFilter}
                    />
                </Flex>
            </Sider>
            <Sider style={{ background: colorBgContainer, flex: 'none', borderRadius: 20 }} width={'460'}>
                <Menu mode="inline" style={{ height: '100%', borderRadius: 20 }}>
                    <Flex style={{ flexDirection: 'column', padding: '20px' }}>
                        <Title style={{ color: '#1B81E7', fontWeight: '1000', fontSize: '22px' }}>Цена, сом</Title>
                        <PriceRangeSelector />
                    </Flex>
                </Menu>
            </Sider>
            <Sider style={{ background: colorBgContainer, flex: 'none', borderRadius: 20 }} width={'460'}>
                <Flex style={{ flexDirection: 'column', padding: '20px' }}>
                    <Title style={{ color: '#1B81E7', fontWeight: '1000', fontSize: '22px', cursor: 'pointer' }}>Бренд</Title>
                    <Menu
                        onClick={onClick}
                        style={{ width: '100%' }}
                        defaultOpenKeys={['drop2']}
                        mode="inline"
                        items={item2}
                    />
                </Flex>
            </Sider>
        </>
    );
}

export default FilterMenuSideBar