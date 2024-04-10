
import React from 'react';
import { Button, Input, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { MenuItem, NavbarMenuProps } from "./Navbar.props";
import logo from "../../assets/svgs/navbar/logo.svg";
import filter from "../../assets/svgs/navbar/filter.svg"
import favourite from "../../assets/svgs/navbar/favourites.svg";
import cart from "../../assets/svgs/navbar/cart.svg";
import phone from "../../assets/svgs/navbar/phone.svg";

import styles from "./navbar.module.scss";

function NavbarMenu({ menuItems }: NavbarMenuProps) {
    const navigate = useNavigate();
    const isOnFilterPage = window.location.pathname === '/filter';

    const handleFilterButtonClick = () => {
        if (isOnFilterPage) {
            alert('Вы уже на странице фильтров');
        } else {
            navigate('/filter');
        }
    };

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
                    <Button
                        icon={<img src={filter} style={{ width: '24px', height: '24px' }} />}
                        className={styles.btn}
                        type='default'
                        onClick={handleFilterButtonClick}
                    >
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

export default NavbarMenu;
