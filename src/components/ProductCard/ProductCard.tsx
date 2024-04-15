import React, { useState } from 'react';
import { Card, Typography, Flex } from 'antd';
import { Tag } from "antd";
import { Button as ButtonAnt } from 'antd'

import { ReactComponent as Star } from '../../assets/svgs/card/star.svg';
import { ReactComponent as Basket } from '../../assets/svgs/card/basket.svg';
import { ReactComponent as Fav } from '../../assets/svgs/card/heart.svg';
import { Button } from '../Button/Button'
import { ProductCardProps } from './ProductCard.props';
import { formatNumberAndAddCurrency, truncateTitle } from "../../helpers/functions/helperFunctions";
import styles from "./productCard.module.scss";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Colors } from "../../helpers/enums/color.enum";
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography


export function ProductCard({ title, price, rating, image, tags }: ProductCardProps) {
    const [isClicked, setIsClicked] = useState(false);
    const [count, setCount] = useState(1);
    const navigate = useNavigate()

    const increase = () => {
        setCount(count + 1);
    };

    const decline = () => {
        let newCount = count - 1;
        if (newCount <= 0) {
            newCount = 1;
            setIsClicked(false)
        }
        setCount(newCount);
    };

    const handleBuyClick = () => {
        setIsClicked(true);
    };


    return (
        <Card
            className={styles.cardCustom}
            classNames={{ body: styles.bodyCustom, header: styles.headCustom, extra: styles.extraCustom }}
            extra={
                <Flex align={"center"}>
                    <Flex onClick={() => navigate('/detail')} className={styles.wrapper} align={"center"} wrap={"wrap"}>
                        {tags.map((tag: string, index: number) => (
                            <Tag key={index} className={styles.tag} color={Colors.BRAND_COLOR}>{tag}</Tag>
                        ))}
                    </Flex>
                    <ButtonAnt className={styles.favButton} icon={<Fav />} shape="circle" danger />
                </Flex>
            }
            cover={<img onClick={() => navigate('/detail')} src={image} alt={title} />}
            actions={[
                !isClicked ?
                    (<Button
                        onClick={handleBuyClick}
                        appearance={"blue"}
                        block
                    >
                        Купить
                    </Button>) :
                    (<Button
                        icon={<Basket />}
                        appearance={"yellow"}
                        block
                    >
                        В корзину
                    </Button>)
            ]}
        >
            <Flex vertical align={'center'}>
                <Flex onClick={() => navigate('/detail')} justify={'space-between'} align={'center'} style={{ width: '100%' }}>
                    <Title style={{ margin: 0 }} level={4}>{formatNumberAndAddCurrency(price, '₽')}</Title>
                    <Flex align={'center'}>
                        <Star />
                        <Text style={{ fontSize: 18, marginLeft: 3 }}>{rating}</Text>
                    </Flex>
                </Flex>
                <Text style={{ marginBottom: 20, fontSize: 14 }}>{truncateTitle(title)}</Text>
                {isClicked &&
                    <Flex className={styles.counterWrapper} justify={"space-between"} align={"center"}>
                        <ButtonAnt onClick={decline} icon={<MinusOutlined />} shape={"circle"} />
                        <Text >{count}</Text>
                        <ButtonAnt onClick={increase} icon={<PlusOutlined />} shape={"circle"} />
                    </Flex> || null
                }

            </Flex>
        </Card>
    );
};

