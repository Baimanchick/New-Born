
import { useEffect, useState } from 'react';
import { AutoComplete, Button, Flex, Input, Menu, SelectProps, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MenuItem, NavbarMenuProps } from "./Navbar.props";
import logo from "../../assets/svgs/navbar/logo.svg";
import filter from "../../assets/svgs/navbar/filter.svg"
import favourite from "../../assets/svgs/navbar/favourites.svg";
import cart from "../../assets/svgs/navbar/cart.svg";
import phone from "../../assets/svgs/navbar/phone.svg";
import styles from "./navbar.module.scss";

const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query: string) =>
    new Array(getRandomInt(5))
        .join('.')
        .split('.')
        .map((_, idx) => {
            const category = `${query}${idx}`;
            return {
                value: category,
                label: (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span>
                            Found {query} on{' '}
                            <a
                                href={`https://s.taobao.com/search?q=${query}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {category}
                            </a>
                        </span>
                        <span>{getRandomInt(200, 100)} results</span>
                    </div>
                ),
            };
        });

function NavbarMenu({ menuItems }: NavbarMenuProps) {
    const navigate = useNavigate();
    const isOnFilterPage = window.location.pathname === '/filter';
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);
    const [activeMenuItem, setActiveMenuItem] = useState<string>('');


    const handleSearch = (value: string) => {
        setOptions(value ? searchResult(value) : []);
    };

    const onSelect = (value: string) => {
        console.log('onSelect', value);
    };

    const handleFilterButtonClick = () => {
        if (isOnFilterPage) {
            alert('Вы уже на странице фильтров');
        } else {
            navigate('/filter');
        }
    };


    return (
        <div className={`${styles.navbar}`}>
            <div className={styles.nav_up}>
                <div className={styles.phone}>
                    <img src={phone} alt="Телефон" />
                    <span>Горячая линия <a href="tel:+01112352566">+01 112 352 566</a></span>
                </div>
                <ul className={styles.navbar_navigation}>
                    {menuItems.map((item: MenuItem, index: number) => (
                        <li
                            className={`${styles.menuItem} ${item.label === activeMenuItem ? styles.active : ''}`}
                            onClick={() => {
                                setActiveMenuItem(item.label);
                                navigate(item.link);
                            }}
                            key={index}
                            style={{ fontSize: 12, cursor: 'pointer', fontWeight: 400 }}
                        >
                            {item.label}
                        </li>

                    ))}
                </ul>
            </div>
            <div className={styles.nav_down}>
                <div className={styles.logo}>
                    <img onClick={() => navigate("/")} style={{ cursor: 'pointer' }} src={logo} alt="Логотип" />
                </div>
                <div className={styles.form}>
                    <Button
                        icon={<img src={filter} style={{ width: '24px', height: '24px' }} alt={'filter'} />}
                        className={styles.btn}
                        type='default'
                        onClick={handleFilterButtonClick}
                    >
                        Фильтр
                    </Button>
                    <Flex className={styles.searchNavbarMenu} style={{ flexDirection: 'column' }}>
                        <AutoComplete
                            popupMatchSelectWidth={500}
                            className={styles.dropdownCustomAntd}
                            style={{ width: 810, }}
                            options={options}
                            size="large"
                            onSelect={onSelect}
                            onSearch={handleSearch}
                        >
                            <Input.Search
                                style={{ height: '50px' }}
                                placeholder="Я ищу…"
                                enterButton
                                variant={'borderless'}
                            />
                        </AutoComplete>
                    </Flex>

                </div>
                <div className={styles.icon}>
                    <img src={favourite} className={styles.icon__item} alt="Избранное" />
                    <img src={cart} onClick={() => navigate('/cart')} className={styles.icon__item} alt="Корзина" />
                </div>
            </div>
        </div>
    );
}

export default NavbarMenu;


