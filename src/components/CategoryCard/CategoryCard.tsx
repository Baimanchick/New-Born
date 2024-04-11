import React, { useEffect, useState } from 'react';
import styles from "../../styles/card.module.scss";
import { Card } from 'antd';
import { CategoryCardProps } from './CategoryCard.props';
import { abbreviateTitle } from '../../helpers/functions/helperFunctions';

function CategoryCard({ title, image }: CategoryCardProps) {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 880);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 880);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={styles.categoryCard_main}>
            <div className={styles.categoryCard_container}>
                {[1, 2, 3, 4, 5].map((index) => (
                    <Card key={index}>
                        <img src={image} alt="Category" />
                        <span>{isMobile ? abbreviateTitle(title, isMobile ? 1 : 2) : abbreviateTitle(title, 3)} {isMobile ? '..' : ''}</span>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default CategoryCard;
