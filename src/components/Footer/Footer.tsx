import styles from './footer.module.scss';
import logo from "../../assets/svgs/navbar/logo.svg"
import insta from "../../assets/svgs/footer/insta.svg"
import basket from "../../assets/svgs/footer/basket.svg"
import twitter from "../../assets/svgs/footer/twitter.svg"
import youtube from "../../assets/svgs/footer/youtube.svg"
import send from "../../assets/svgs/footer/telegram.svg"
import useWindowSize from '../../hooks/useWindowSize';




function Footer() {
    const windowSize = useWindowSize();

    const isMobile = windowSize.width && windowSize.width < 755;

    return (
        <>
            {isMobile ? (
                <div className={styles.footer_main}>
                    <div className={styles.footer_items}>
                        <div className={styles.footer}>
                            <div className={styles.logos}>
                                <div className={styles.social_media}>
                                    <img src={insta} alt={'instagram'} />
                                    <img src={basket} alt={'basketball'} />
                                    <img src={twitter} alt={'twitter'} />
                                    <img src={youtube} alt={'youtube'} />
                                </div>
                            </div>
                            <div className={styles.footer_item_mobile}>
                                <div className={styles.footer_item}>
                                    <div className={styles.form}>
                                        <div className={styles.title}>
                                            Подпишитесь на рассылку
                                        </div>
                                        <div className={styles.footer_input}>
                                            <input type="text" placeholder='Your email address' />
                                            <img src={send} alt={'send'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.footer_item_mobile}>
                                <ul className={styles.navigation}>
                                    <li className={styles.bold}>Информация</li>
                                    <li>О нас</li>
                                    <li>Блог</li>
                                    <li>Контакты</li>
                                    <li>Отзывы</li>
                                </ul>
                            </div>
                            <div className={styles.footer_item_mobile}>
                                <ul className={styles.navigation}>
                                    <li className={styles.bold}>Сервисы</li>
                                    <li>Политика конфиденциальности</li>
                                    <li>Условия использования</li>
                                    <li>Возврат и обмен</li>
                                    <li>Помощь и поддержка</li>
                                </ul>
                            </div>
                            <div className={styles.footer_item_mobile}>
                                <ul className={styles.navigation}>
                                    <li className={styles.bold}>Войти</li>
                                    <li>История заказов</li>
                                    <li>Избранное</li>
                                    <li>Личный кабинет</li>
                                    <li>Стать партнером</li>
                                </ul>
                            </div>
                            <div className={styles.footer_text}>
                                <span>Все права защищены</span>
                                <span>®2024 new born</span>

                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.footer_main}>
                    <div className={styles.footer_items}>
                        <div className={styles.footer}>
                            <div className={styles.footer_item}>
                                <div className={styles.footer_social__logo}>
                                    <img className={styles.logo} src={logo} alt={'logo'} />
                                    <span>Все права защищены</span>
                                    <span>®2024 new born</span>
                                    <div className={styles.social_media}>
                                        <img src={insta} alt={'instagram'} />
                                        <img src={basket} alt={'basketball'} />
                                        <img src={twitter} alt={'twitter'} />
                                        <img src={youtube} alt={'youtube'} />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.footer_item}>
                                <ul className={styles.navigation}>
                                    <li className={styles.bold}>Информация</li>
                                    <li>О нас</li>
                                    <li>Блог</li>
                                    <li>Контакты</li>
                                    <li>Отзывы</li>
                                </ul>
                            </div>
                            <div className={styles.footer_item}>
                                <ul className={styles.navigation}>
                                    <li className={styles.bold}>Сервисы</li>
                                    <li>Политика конфиденциальности</li>
                                    <li>Условия использования</li>
                                    <li>Возврат и обмен</li>
                                    <li>Помощь и поддержка</li>
                                </ul>
                            </div>
                            <div className={styles.footer_item}>
                                <ul className={styles.navigation}>
                                    <li className={styles.bold}>Войти</li>
                                    <li>История заказов</li>
                                    <li>Избранное</li>
                                    <li>Личный кабинет</li>
                                    <li>Стать партнером</li>
                                </ul>
                            </div>
                            <div className={styles.footer_item}>
                                <div className={styles.form}>
                                    <div className={styles.title}>
                                        Подпишитесь на рассылку
                                    </div>
                                    <div className={styles.footer_input}>
                                        <input type="text" placeholder='Your email address' />
                                        <img src={send} alt={'send'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Footer;
