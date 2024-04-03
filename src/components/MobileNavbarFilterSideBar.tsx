import { useRef, useState } from 'react';
import arrowDown from "../assets/svgs/navbar/blueArrowDown.svg";
import arrowDownBlack from "../assets/svgs/navbar/blackArrowDown.svg";
import arrowUpBlack from "../assets/svgs/navbar/blackArrowUp.svg"
import styles from "../styles/navbar.module.scss";
import { Button, Drawer, } from 'antd';
import PriceRangeSelector from './PriceRangeSelector';

function MobileNavbarFilterSideBar({ isFilterDrawerOpen, setFilterIsDrawerOpen }: { isFilterDrawerOpen: boolean, setFilterIsDrawerOpen: (isOpen: boolean) => void }) {
    const [isOpenDropdown, setIsOpenDropdown] = useState<{ [key: string]: boolean }>({});
    const [isOpenChildDropdown, setIsOpenChildDropdown] = useState<{ [key: string]: boolean }>({});
    const [activeItem, setActiveItem] = useState('');
    const SALARY_RANGE = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]

    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = (filterId: string) => {
        setIsOpenDropdown(prevState => ({
            ...prevState,
            [filterId]: !prevState[filterId]
        }));
    };

    const toggleChildDropdown = (filterId: string) => {
        setIsOpenChildDropdown(prevState => ({
            ...prevState,
            [filterId]: !prevState[filterId]
        }));
    };

    const handleItemClick = (item: string) => {
        setActiveItem(item);
    };

    return (
        <div>
            <Drawer bodyStyle={{ backgroundColor: "rgba(248, 248, 248, 1)" }} width="100%" open={isFilterDrawerOpen} onClose={() => setFilterIsDrawerOpen(false)}>
                <div className={styles.mobile_filter__main}>
                    <div className={styles.mobile_filter__container}>
                        <div className={styles.mobile_filter}>
                            <div onClick={() => toggleDropdown('catalog')} className={styles.main_title}>
                                <div>Каталог</div>
                                <img src={arrowDown} />
                            </div>
                            {isOpenDropdown['catalog'] ? (
                                <div className={styles.mobile_filter__item} tabIndex={-1}>
                                    <div onClick={() => toggleChildDropdown('meal')} className={styles.dropdown_mobile__filter}>
                                        <div>Питание с 6 месяцев</div>
                                        <img src={isOpenChildDropdown['meal'] ? arrowUpBlack : arrowDownBlack} />
                                    </div>
                                    {isOpenChildDropdown['meal'] ? (
                                        <div className={styles.dropdown_mobile_filter__item}>
                                            <div className={`${styles.dropdown_mobile_filter__title} ${activeItem === 'Пюре овощные' ? styles.active : ''}`} onClick={() => handleItemClick('Пюре овощные')}>Пюре овощные</div>
                                            <div className={`${styles.dropdown_mobile_filter__title} ${activeItem === 'Пюре фруктовые' ? styles.active : ''}`} onClick={() => handleItemClick('Пюре фруктовые')}>Пюре фруктовые</div>
                                        </div>
                                    ) : null}
                                </div>
                            ) : null}
                        </div>

                        <div className={styles.mobile_filter}>
                            <div onClick={() => toggleDropdown('price')} className={styles.main_title}>
                                <div>Цена, сом</div>
                                <img src={arrowDown} />
                            </div>
                            {isOpenDropdown['price'] ? (
                                <PriceRangeSelector />
                            ) : null}
                        </div>

                        <div className={styles.mobile_filter}>
                            <div onClick={() => toggleDropdown('brand')} className={styles.main_title}>
                                <div>Бренд</div>
                                <img src={arrowDown} />
                            </div>
                            {isOpenDropdown['brand'] ? (
                                <div className={styles.mobile_filter__item} tabIndex={-1}>
                                    <div onClick={() => toggleChildDropdown('brandMeal')} className={styles.dropdown_mobile__filter}>
                                        <div>Агуша</div>
                                        <img src={isOpenChildDropdown['brandMeal'] ? arrowUpBlack : arrowDownBlack} />
                                    </div>
                                    {isOpenChildDropdown['brandMeal'] ? (
                                        <div className={styles.dropdown_mobile_filter__item}>
                                            <div className={`${styles.dropdown_mobile_filter__title} ${activeItem === 'Пюре овощные' ? styles.active : ''}`} onClick={() => handleItemClick('Пюре овощные')}>Пюре овощные</div>
                                            <div className={`${styles.dropdown_mobile_filter__title} ${activeItem === 'Пюре фруктовые' ? styles.active : ''}`} onClick={() => handleItemClick('Пюре фруктовые')}>Пюре фруктовые</div>
                                        </div>
                                    ) : null}
                                </div>
                            ) : null}
                        </div>

                        <div className={styles.mobile_button}>
                            <Button>Показать результаты</Button>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}


export default MobileNavbarFilterSideBar;
