import { useState } from 'react';
import { Flex, Layout, Typography } from 'antd';
import { formatNumberAndAddCurrency, truncateTextAfterWords } from '../../helpers/functions/helperFunctions';
import styles from "./detail.module.scss"
import { ReactComponent as Star } from "../../assets/svgs/card/star.svg"
import { ReactComponent as Brand } from "../../assets/svgs/detail/nutrica.svg"
import { Button } from '../Button/Button';
import { HeartOutlined } from '@ant-design/icons';


const { Content } = Layout;
const { Text, Title, Paragraph } = Typography;

function InfoBlock() {
    const initialText = "Специализированный пищевой продукт детского диетического лечебного питания для детей раннего возраста, смесь сухая на основе полностью гидролизованных белков молочной сыворотки “Nutrilon Пепти Аллергия с пребиотиками”. ";
    const [isExpanded, setIsExpanded] = useState(false);
    const [text, setText] = useState(initialText);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Content style={{ width: '100%', backgroundColor: '#fff', borderRadius: '20px', padding: '20px' }}>
            <Flex style={{ flexDirection: 'column', rowGap: '10px' }}>
                <Title style={{ fontSize: '32px', fontWeight: '1000', color: '#1B81E7' }}>Смесь сухая Nutrilon Пепти Аллергия 800г с 0 месяцев</Title>
                <Paragraph style={{ fontSize: '18px', fontWeight: '600', color: '#7B7B7B' }}>{isExpanded ? text : truncateTextAfterWords(text, 10)} {!isExpanded && (<span className={styles.showMore} onClick={toggleExpand}>больше</span>)}</Paragraph>
                <Flex style={{ marginTop: '15px', marginBottom: '15px' }} gap={10} >
                    <Flex style={{ backgroundColor: '#ECF5FF', padding: '10px 20px 10px 20px', borderRadius: '10px', cursor: 'pointer', height: '40px' }} align={'center'} gap={4}>
                        <Star />
                        4.8
                    </Flex>
                    <Flex style={{ backgroundColor: '#ECF5FF', padding: '10px 20px 10px 20px', borderRadius: '10px', cursor: 'pointer', height: '40px' }} align={'center'} justify={'center'}>
                        <Brand />
                    </Flex>
                    <Button appearance='lightBlue' style={{ border: 'none', fontSize: '14px', fontWeight: '600', padding: '0px 15px 0px 15px', height: '40px' }}>
                        <HeartOutlined />
                        В избранное
                    </Button>
                </Flex>
                <Text style={{ fontSize: '12px', fontWeight: '400', color: '#C3C3C3' }}>Цена</Text>
                <Text style={{ fontSize: '36px', fontWeight: '600', color: '#FABC22' }}>{formatNumberAndAddCurrency(2699, '₽')} сом</Text>
                <Button style={{ fontSize: '18px', fontWeight: '1000', width: '320px', height: '60px', borderRadius: '80px' }} appearance='yellow'>В корзину</Button>

            </Flex>
        </Content >
    );
}

export default InfoBlock;
