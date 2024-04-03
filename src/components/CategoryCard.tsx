import React, { useEffect, useState } from 'react';
import styles from "../styles/card.module.scss";
import { Card } from 'antd';
import img from "../assets/card/image.png";

function CategoryCard() {
    const title = 'Искусственное вскармливание';
    const words = title.split(' ');
    const abbreviatedTitle = words.slice(0, 3).join(' ');
    const abbreviatedTitleSpecail = words.slice(0, 1).join(' ');
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 880);


    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 880);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div className={styles.categoryCard_main}>
            <div className={styles.categoryCard_container}>
                <Card>
                    <img src={img} alt="Category" />
                    <span>{isMobile ? abbreviatedTitleSpecail : abbreviatedTitle}</span>
                </Card>
                <Card>
                    <img src={img} alt="Category" />
                    <span>{isMobile ? abbreviatedTitleSpecail : abbreviatedTitle}</span>
                </Card>
                <Card>
                    <img src={img} alt="Category" />
                    <span>{isMobile ? abbreviatedTitleSpecail : abbreviatedTitle}</span>
                </Card>
                <Card>
                    <img src={img} alt="Category" />
                    <span>{isMobile ? abbreviatedTitleSpecail : abbreviatedTitle}</span>
                </Card>
                <Card>
                    <img src={img} alt="Category" />
                    <span>{isMobile ? abbreviatedTitleSpecail : abbreviatedTitle}</span>
                </Card>
            </div>
        </div>
    );
}

export default CategoryCard;
