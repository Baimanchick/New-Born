import React, { useState } from 'react';
import { Card, Typography, Flex } from 'antd';

import { Button } from '../Button/Button'
import { CartItemProps } from './CartItem.props';
import styles from "./productCard.module.scss";
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography


export function CartItem({  }: CartItemProps) {
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
        <Card title="Card title">

        </Card>
    );
};

