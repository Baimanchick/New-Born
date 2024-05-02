import { useState } from 'react';
import { Flex, Layout, Typography } from 'antd';
import { formatNumberAndAddCurrency, truncateTextAfterWords } from '../../helpers/functions/helperFunctions';
import { ReactComponent as Star } from "../../assets/svgs/card/star.svg"
import { Button } from '../Button/Button';
import { HeartOutlined } from '@ant-design/icons';
import { API_URL } from '../../utils/consts';
import useWindowSize from '../../hooks/useWindowSize';
import styles from "../../components/Detail/detail.module.scss"


const { Content } = Layout;
const { Text, Title, Paragraph } = Typography;

function InfoBlock({ product }: any) {
    const initialText = product.description;
    const [text, setText] = useState(initialText);
    const windowSize = useWindowSize();
    const isTablet = windowSize.width && windowSize.width < 990;



    return (
        <Content style={{ width: '100%', backgroundColor: '#fff', borderRadius: '20px', padding: '20px' }}>
            <Flex style={{ flexDirection: 'column', rowGap: '10px' }}>
                <Title
                    style={{
                        fontSize: `${isTablet ? "24px" : '32px'}`,
                        fontWeight: '1000', color: '#1B81E7'
                    }}
                >
                    {product.name}
                </Title>
                <Paragraph
                    style={{
                        fontSize: `${isTablet ? '14px' : '18px'}`,
                        fontWeight: '600',
                        color: '#7B7B7B'
                    }}
                >
                    {truncateTextAfterWords(text, 12)}
                </Paragraph>
                <Flex style={{ marginTop: '15px', marginBottom: '15px' }} gap={10} >
                    <Flex
                        style={{
                            backgroundColor: '#ECF5FF',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            height: '40px'
                        }}
                        align={'center'}
                        gap={4}
                        className={styles.CustomFlexInfoBlock}
                    >
                        <Star />
                        {product.rating}
                    </Flex>
                    <Flex
                        style={{
                            backgroundColor: '#ECF5FF',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            height: '40px'
                        }}
                        align={'center'}
                        justify={'center'}
                        className={styles.CustomFlexInfoBlock}
                    >
                        <img width={100} src={`${API_URL}${product.brand_image}`} />
                    </Flex>
                    <Button
                        appearance='lightBlue'
                        style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            height: '40px'
                        }}
                    >
                        <HeartOutlined />
                        В избранное
                    </Button>
                </Flex>
                <Text
                    style={{
                        fontSize: '12px',
                        fontWeight: '400',
                        color: '#C3C3C3'
                    }}
                >
                    Цена
                </Text>
                <Text style={{
                    fontSize: '36px',
                    fontWeight: '600',
                    color: '#FABC22'
                }}
                >
                    {formatNumberAndAddCurrency(product.price, '₽')} сом
                </Text>
                <Button
                    style={{
                        fontSize: '18px',
                        fontWeight: '1000',
                        width: '320px',
                        height: '60px',
                        borderRadius: '80px'
                    }} appearance='yellow'
                >
                    В корзину
                </Button>
            </Flex>
        </Content >
    );
}

export default InfoBlock;
