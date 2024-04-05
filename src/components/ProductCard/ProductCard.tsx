import React, {FC, useState} from 'react';
import { Card, Typography, Flex } from 'antd';
import { Tag } from "antd";
import {Button as ButtonAnt} from 'antd'

import { ReactComponent as Star } from '../../assets/svgs/card/star.svg';
import { ReactComponent as Basket } from '../../assets/svgs/card/basket.svg';
import { ReactComponent as Fav } from '../../assets/svgs/card/heart.svg';
import {Button} from '../Button/Button'
import { ProductCardProps } from './ProductCard.props';
import {formatNumberAndAddCurrency} from "../../utils/helperFunctions";
import styles from "./productCard.module.scss";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";

const {Title,Text} = Typography


export function ProductCard({ title, price, rating, image, tags}: ProductCardProps) {
    const [isClicked, setIsClicked] = useState(false);
    const [count, setCount] = useState(1);

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
        console.log('button clicked');
        setIsClicked(true);
    };


    return (
        <Card
            className={styles.cardCustom}
            classNames={{body: styles.bodyCustom,header: styles.headCustom, extra: styles.extraCustom}}
            extra={
            <Flex align={"center"}>
                <Flex className={styles.wrapper} align={"center"} wrap={"wrap"}>
                 {tags.map((tag: string)=> (
                    <Tag className={styles.tag} color={'#ABDEE9'}>{tag}</Tag>
                 ))}
                </Flex>
               <ButtonAnt className={styles.favButton} icon={<Fav/>} shape="circle" danger/>
            </Flex>
        }
            cover={<img src={image} alt={title}/>}
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
                    icon={<Basket/>}
                    appearance={"yellow"}
                    block
                >
                        В корзину
                </Button>)
            ]}
        >
            <Flex vertical align={'center'}>
            <Flex justify={'space-between'} align={'center'} style={{width: '100%'}}>
             <Title style={{margin: 0}} level={4}>{formatNumberAndAddCurrency(price, '₽')}</Title>
                <Flex align={'center'}>
                    <Star/>
                    <Text style={{fontSize: 18, marginLeft: 3}}>{rating}</Text>
                </Flex>
            </Flex>
                <Text style={{marginBottom: 20, fontSize: 14}}>{title}</Text>
                {isClicked &&
                    <Flex style={{width: '100%', backgroundColor:'#ECF5FF', borderRadius: 50, paddingInline: 3, paddingBlock: 4, marginBottom: 10}} justify={"space-between"} align={"center"}>
                    <ButtonAnt onClick={decline} icon={<MinusOutlined />} shape={"circle"} />
                        <Text style={{fontSize: 14, fontWeight:'bold', color: '#1B81E7'}}>{count}</Text>
                        <ButtonAnt onClick={increase} icon={<PlusOutlined />} shape={"circle"} />
                </Flex>}

            </Flex>
        </Card>
    );
};

