import styles from "../ProductCard/productCard.module.scss";
import { Button as ButtonAnt, Flex, Typography } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CounterProps } from "./Counter.props";


const { Text } = Typography

export function Counter({ initialValue, onIncrement, onDecrement, ...props }: CounterProps) {
    const [count, setCount] = useState(initialValue);

    const handleIncrement = () => {
        const newCount = count + 1;
        setCount(newCount);
        if (onIncrement) {
            onIncrement(newCount);
        }
    };

    const handleDecrement = () => {
        const newCount = count - 1;
        setCount(newCount >= 0 ? newCount : 0);
        if (onDecrement) {
            onDecrement(newCount >= 0 ? newCount : 0);
        }
    };

    return (
        <Flex {...props} className={styles.counterWrapper} justify={"space-between"} align={"center"} >
            <ButtonAnt onClick={handleDecrement} icon={<MinusOutlined />} shape={"circle"} />
            <Text>{count}</Text>
            <ButtonAnt onClick={handleIncrement} icon={<PlusOutlined />} shape={"circle"} />
        </Flex>
    )
}
