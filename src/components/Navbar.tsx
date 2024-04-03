import { useEffect, useState } from 'react';
import { Button, Menu, Input, Drawer } from 'antd';
import { MenuItem, MobileNavbarProps, NavbarMenuProps, SearchModalProps } from '../utils/interfacesAndTypes';
import styles from "../styles/navbar.module.scss";
import phone from "../assets/svgs/navbar/phone.svg";
import phoneWhite from "../assets/svgs/navbar/phoneWhite.svg";

import logo from "../assets/svgs/navbar/logo.svg";
import cart from "../assets/svgs/navbar/cart.svg";
import favourite from "../assets/svgs/navbar/favourites.svg";
import filter from "../assets/svgs/navbar/filter.svg"
import burger from "../assets/svgs/navbar/burgerMenu.svg"
import search from "../assets/svgs/navbar/search.svg"
import "../styles/antd.scss";
import MobileNavbarFilterSideBar from './MobileNavbarFilterSideBar';

function Navbar() {
    const menuItems: MenuItem[] = [
        { label: "Главная", key: 'home' },
        { label: "Акции", key: 'stock' },
        { label: "Блог", key: 'blog' },
        { label: "Все Бренды", key: 'allBrands' },
        { label: "Скидки", key: 'sales' },
    ];
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [isFilterDrawerOpen, setFilterIsDrawerOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 660);
    const [isSearchModalVisible, setIsSearchModalVisible] = useState<boolean>(false);

    const openSearchModal = () => {
        setIsSearchModalVisible(true);
    };

    const closeSearchModal = () => {
        setIsSearchModalVisible(false);
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 660);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            {isMobile ? (
                <>
                    <MobileNavbar
                        openSearchModal={openSearchModal}
                        setIsDrawerOpen={setIsDrawerOpen}
                        menuItems={menuItems}
                        isDrawerOpen={isDrawerOpen}
                        isFilterDrawerOpen={isFilterDrawerOpen}
                        setFilterIsDrawerOpen={setFilterIsDrawerOpen}
                    />
                    <SearchModal isVisible={isSearchModalVisible} onClose={closeSearchModal} />
                </>

            ) : (
                <NavbarMenu menuItems={menuItems} />
            )}
        </div>
    );
}

function NavbarMenu({ menuItems }: NavbarMenuProps) {
    return (
        <div className={styles.navbar}>
            <div className={styles.nav_up}>
                <div className={styles.phone}>
                    <img src={phone} alt="Телефон" />
                    <span>Горячая линия +01 112 352 566</span>
                </div>
                <Menu style={{ background: 'none', boxShadow: 'initial', borderBottom: "initial" }} mode='horizontal' >
                    {menuItems.map((item: MenuItem) => (
                        <Menu.Item style={{ fontSize: '12px', width: 'auto' }} key={item.key}>{item.label}</Menu.Item>
                    ))}
                </Menu>
            </div>
            <div className={styles.nav_down}>
                <div className={styles.logo}>
                    <img src={logo} alt="Логотип" />
                </div>
                <div className={styles.form}>
                    <Button icon={<img src={filter} style={{ width: '24px', height: '24px' }} />} className={styles.btn} type='default'>
                        Фильтр
                    </Button>
                    <Input.Search style={{ height: '50px' }} className={styles.input} placeholder="Я ищу…" enterButton />
                </div>
                <div className={styles.icon}>
                    <img src={favourite} className={styles.icon__item} alt="Избранное" />
                    <img src={cart} className={styles.icon__item} alt="Корзина" />
                </div>
            </div>
        </div>
    );
}

function MobileNavbar({ setIsDrawerOpen, menuItems, isDrawerOpen, openSearchModal, isFilterDrawerOpen, setFilterIsDrawerOpen }: MobileNavbarProps) {
    return (
        <div className={styles.navbar_mobile}>
            <div className={styles.nav_up__mobile}>
                <div className={styles.logo_mobile}>
                    <img src={logo} className={styles.logo_mobile__image} />
                </div>
                <div className={styles.icon_mobile}>
                    <img src={favourite} className={styles.icon_mobile__item} alt="Избранное" />
                    <img src={cart} className={styles.icon_mobile__item} alt="Корзина" />
                    <img src={burger} className={styles.icon_mobile__item} alt="Меню" onClick={() => setIsDrawerOpen && setIsDrawerOpen(true)} />
                </div>
            </div>
            <div className={styles.nav_down__mobile}>
                <div className={styles.form_mobile}>
                    <Button
                        className={styles.search}
                        type='default'
                        onClick={openSearchModal}
                    >
                        Я ищу…
                    </Button>
                    <Button
                        className={styles.btn}
                        type='default'
                        icon={<img src={filter} style={{ width: '24px', height: '24px' }} />}
                        onClick={() => setFilterIsDrawerOpen && setFilterIsDrawerOpen(true)}
                    >
                        Фильтр
                    </Button>
                </div>
            </div>
            <Drawer
                closable={false}
                bodyStyle={{ backgroundColor: "rgba(27, 129, 231, 1)" }}
                width={300}
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                placement='right'
            >
                <ul className={styles.sideBar_navigation}>
                    {menuItems.map((item: MenuItem) => (
                        <li key={item.key}>{item.label}</li>
                    ))}
                </ul>
                <div className={styles.navbar_mobile__footer}>
                    <img src={phoneWhite} />
                    <div>Горячая линия  <a href="#">+01 112 352 566</a></div>
                </div>
            </Drawer>
            <MobileNavbarFilterSideBar isFilterDrawerOpen={isFilterDrawerOpen} setFilterIsDrawerOpen={setFilterIsDrawerOpen} />
        </div>
    );
}

function SearchModal({ isVisible, onClose }: SearchModalProps) {
    const handleSearch = (value: string) => {
        onClose();
    };
    return (
        <div className={styles.modalBackground} style={{ display: isVisible ? 'flex' : 'none' }}>
            <Input.Search style={{ width: '300px', marginTop: '80px' }} className={styles.input_modal} placeholder="Я ищу…" onSearch={handleSearch} enterButton />
            <div className={styles.dropdown_modal__main}>
                <div className={styles.dropdown_modal__container}>
                    <div className={styles.dropdown_modal}>
                        <p>Смесь сухая Nutrilon Пепти Аллергия</p>
                    </div>
                    <div className={styles.dropdown_modal}>
                        <p>Смесь сухая Nutrilon Пепти Аллергия</p>
                    </div>
                    <div className={styles.dropdown_modal}>
                        <p>Смесь сухая Nutrilon Пепти Аллергия</p>
                    </div>
                    <div className={styles.dropdown_modal}>
                        <p>Смесь сухая Nutrilon Пепти Аллергия</p>
                    </div>
                    <div className={styles.dropdown_modal}>
                        <p>Смесь сухая Nutrilon Пепти Аллергия</p>
                    </div>
                    <div className={styles.dropdown_modal}>
                        <p>Смесь сухая Nutrilon Пепти Аллергия</p>
                    </div>
                    <div className={styles.dropdown_modal}>
                        <p>Смесь сухая Nutrilon Пепти Аллергия</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
