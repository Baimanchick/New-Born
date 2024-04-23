import React, { useEffect, useState } from 'react';
import { Button as ButtonAnt, Flex, List, Skeleton, Typography} from 'antd';
import styles from './cartList.module.scss'
import {MinusOutlined} from "@ant-design/icons";
import {Counter} from "../Counter/Counter";
import agusha from '../../assets/card/agusha.png'
import {Colors} from "../../helpers/enums/color.enum";
const { Title,Text } = Typography

interface DataType {
    gender?: string;
    name: {
        title?: string;
        first?: string;
        last?: string;
    };
    email?: string;
    picture: {
        large?: string;
        medium?: string;
        thumbnail?: string;
    };
    nat?: string;
    loading: boolean;
}

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const fontStyles: React.CSSProperties  = {
    fontSize: '20px', fontWeight: 700, lineHeight: '23px'
}

const headerItems = [
    "Товар",
    "Цена",
    "Количество",
    "В общем",
    "Удалить"
]

export function CartList() {
    const [data, setData] = useState<DataType[]>([]);
    const [list, setList] = useState<DataType[]>([]);


    useEffect(() => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                setData(res.results);
                setList(res.results);
            });
    }, []);


    return (
        <List
            className={styles.list}
            header={
            <Flex align={"center"} justify={"space-between"} className={styles.headerItems}>
                {headerItems.map(item=>{
                    return (<Text className={styles.headerItem}>{item}</Text>)
                })}
            </Flex>
            }
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => (
                <List.Item
                    actions={[<ButtonAnt type={"primary"} danger icon={<MinusOutlined />} shape={"circle"} />]}
                >
                        <List.Item.Meta
                            className={styles.item}
                            avatar={
                            <Flex align={"center"} gap={20}>
                            <img src={agusha} width={100} height={100}/>
                               <Text style={{...fontStyles, color: Colors.GREY}}>Смесь сухая Nutrilon Пепти Аллергия 800г с 0 месяцев</Text>
                        </Flex>}/>
                        <List.Item.Meta className={styles.priceItemMeta} title={'2 699 сом'} />
                        <List.Item.Meta className={styles.counterItemMeta}title={<Counter/>}/>
                        <List.Item.Meta className={styles.priceItemMeta} title={'2 699 сом'} />
                </List.Item>
            )}
        />
    );
};

export default CartList;
