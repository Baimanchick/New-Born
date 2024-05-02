import { useState, useEffect } from 'react';
import { Card, Flex, Input, Layout, Menu, Typography } from 'antd';
import styles from "./detail.module.scss";
import { formatDate, truncateTextAfterWords } from '../../helpers/functions/helperFunctions';
import { ReactComponent as Star } from '../../assets/svgs/card/star.svg';
import { ReviewType } from '../../helpers/interfaces/reviews.interface';
import { Button } from '../Button/Button';
import RateDetail from '../Rate/Rate';
import { useAppSelector } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
const { Content, Header, Footer } = Layout;
const { Paragraph, Title } = Typography;
const { TextArea } = Input

const item1 = [
    {
        key: 1,
        label: 'Описание',
    },
];

const item2 = [
    {
        key: 2,
        label: 'Отзывы',
    },
];

function DetailReviewsDescription({ product }: any) {
    const initialText = product.description;
    const [isExpanded, setIsExpanded] = useState(false);
    const [text, setText] = useState(initialText);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const isAuth = useAppSelector((store) => store.auth.user !== null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.keyCode === 27) {
                closeSearchModal();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const openSearchModal = () => {
        setIsModalVisible(true);
    };

    const closeSearchModal = () => {
        setIsModalVisible(false);
    };

    const handleStopClose = (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
    };

    return (
        <Flex onClick={closeSearchModal} justify={'space-between'} gap={15}>
            <Content style={{ width: '100%', backgroundColor: '#fff', padding: '20px', borderRadius: '20px', position: 'relative' }}>
                <Header style={{ background: '#fff', padding: '0px' }}>
                    <Menu mode="horizontal" defaultSelectedKeys={['1']} items={item1} className={styles.CustomRewDesMenu} />
                </Header>
                <Title style={{ fontSize: '32px', color: '#1B81E7', fontWeight: '1000', marginTop: '20px' }}>О товаре</Title>
                <Paragraph style={{ fontSize: '16px', fontWeight: '600', color: '#000', marginBottom: '10vh' }}>
                    {isExpanded ? <div dangerouslySetInnerHTML={{ __html: text }} /> : truncateTextAfterWords(text, 100)}
                </Paragraph>
                <Footer className={styles.CustomFooterFirst}>
                    <Flex>
                        <Title onClick={toggleExpand} style={{ color: '#1B81E7', fontSize: '14px', fontWeight: '700', cursor: 'pointer', margin: 0 }}>{!isExpanded ? "Больше..." : "Меньше"}</Title>
                    </Flex>
                </Footer>
            </Content>
            <Content style={{ width: '100%', backgroundColor: '#fff', padding: '20px', borderRadius: '20px', position: 'relative', height: '100%' }}>
                <Header style={{ background: '#fff', padding: '0px' }}>
                    <Menu mode="horizontal" defaultSelectedKeys={['2']} items={item2} className={styles.CustomRewDesMenu} />
                </Header>
                <Flex style={{ flexDirection: 'column', rowGap: '15px', marginTop: '20px', marginBottom: '10vh' }}>
                    {product.reviews.map((reviews: ReviewType, index: number) => (
                        <Flex key={index} style={{ flexDirection: 'column', rowGap: '10px' }}>
                            <Flex align={'center'} justify={'space-between'}>
                                <Flex align={'center'} gap={8}>
                                    <Title style={{ fontSize: '18px', margin: '0px', fontWeight: '1000', color: '#4B4E51' }}>{reviews.user_name}</Title>
                                    <Star />
                                    <Title style={{ fontSize: '16px', margin: '0px', fontWeight: '600', color: '#1B81E7' }}>{reviews.rating}</Title>
                                </Flex>
                                <Flex>
                                    <Title style={{ color: '#7B7B7B', fontSize: '16px', fontWeight: '400' }}>{formatDate(reviews.created_at)}</Title>
                                </Flex>
                            </Flex>
                            <Paragraph style={{ fontWeight: '600', fontSize: '16px', color: '#2A2A2A' }}>
                                {reviews.text}
                            </Paragraph>
                        </Flex>
                    ))}
                </Flex>
                <Footer className={styles.CustomFooterSecond}>
                    <Flex>
                        <Title style={{ color: '#1B81E7', fontSize: '14px', fontWeight: '700', cursor: 'pointer', margin: 0 }}>Большe...</Title>
                    </Flex>
                    <Flex onClick={handleStopClose}>
                        <Button onClick={isAuth ? openSearchModal : () => alert("Пожалуйста зарегистрируйтесь")} style={{ fontSize: '16px' }} appearance='yellow'>Оставить отзыв</Button>
                        <Button onClick={openSearchModal} style={{ fontSize: '16px' }} appearance='yellow'>Оставить отзыв</Button>
                    </Flex>
                </Footer>
            </Content>
            {isModalVisible ? (
                <Content className={styles.modalBackground}>
                    <Card
                        onClick={handleStopClose}
                        classNames={{ body: styles.ReviewsBodyCustom, header: styles.ReviewsHeaderCustom }}
                        className={styles.ReviewsCardCustom}
                        cover={
                            <Flex>
                                <Title style={{ margin: 0, fontSize: 16, fontWeight: 500, color: '#7B7B7B' }}>Отзыв</Title>
                                <TextArea placeholder='Отзыв...' rows={4} variant='filled' />
                            </Flex>
                        }
                        extra={<RateDetail />}
                    >
                        <Flex justify={'end'}>
                            <Button className={styles.ReviewsButtonCustom} appearance='yellow'>Оставить отзыв</Button>
                        </Flex>
                    </Card>
                </Content>
            ) : null}

        </Flex>
    );
}

export default DetailReviewsDescription;
