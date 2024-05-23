import { useState, } from 'react';
import { Card, Flex, Input, Layout, Menu, Rate, Typography } from 'antd';
import styles from "./detail.module.scss";
import { formatDate, truncateTextAfterWords } from '../../helpers/functions/helperFunctions';
import { ReactComponent as Star } from '../../assets/svgs/card/star.svg';
import { ReviewType } from '../../helpers/interfaces/reviews.interface';
import { Button } from '../Button/Button';
import useWindowSize from '../../hooks/useWindowSize';
import useEscapeKey from '../../hooks/useKeyDown';
import { useDispatch } from 'react-redux';
import { addReview } from '../../store/features/reviews/reviewsSlice';
import { AppDispatch } from '../../store/store';
import Loading from '../Loader/Loading';
import { CloseOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import openNotification from '../Notification/Notification';
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
    const navigate = useNavigate()
    const [isExpanded, setIsExpanded] = useState(false);
    const [text, setText] = useState(initialText);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const windowSize = useWindowSize();
    const dispatch: AppDispatch = useDispatch();
    const isAuth = useAppSelector((state) => state.auth.user !== null)
    const isTablet = windowSize.width && windowSize.width < 870;
    const isMobile = windowSize.width && windowSize.width < 660;
    const verifiedReviews = product.reviews.filter((review: any) => review.is_verified);
    const [reviewStar] = useState(0);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [reviewData, setReviewData] = useState({
        text: "",
        rating: reviewStar,
    });

    console.log(verifiedReviews);


    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const openReviewsModal = () => {
        setIsModalVisible(true);
    };

    const closeReviewsModal = () => {
        setIsModalVisible(false);
    };

    const handleStopClose = (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
    };

    const handleRating = (rate: number) => {
        setReviewData({ ...reviewData, rating: rate })
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setReviewData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            setLoadingSubmit(true);
            if (reviewData.rating === 0 || reviewData.text.trim() === "") {
                openNotification('warning', 'Предупреждение', `${reviewData.rating === 0 ? "Выберите рейтинг" : "Введите текст отзыва"}`, 2);
                setLoadingSubmit(false);
                return;
            }
            await dispatch(addReview({ ...reviewData, product: product?.id }));
            setReviewData({ text: "", rating: reviewStar });
            closeReviewsModal();
        } catch (error) {
            console.error("Лови аптечку ->", error);
        } finally {
            setLoadingSubmit(false);
        }
    };

    const handleNavigate = () => {
        navigate('/register')
        openNotification('error', 'Ошибка', 'Вы не авторизованы', 2)
    }

    useEscapeKey(closeReviewsModal);

    return (
        <Flex onClick={closeReviewsModal} style={{ flexDirection: `${isMobile ? 'column' : 'initial'}` }} justify={'space-between'} gap={15}>
            <Content style={{ width: '100%', backgroundColor: '#fff', padding: '20px', borderRadius: '20px', position: 'relative' }}>
                <Header style={{ background: '#fff', padding: '0px' }}>
                    <Menu mode="horizontal" defaultSelectedKeys={['1']} items={item1} className={styles.CustomRewDesMenu} />
                </Header>
                <Title style={{ fontSize: '32px', color: '#1B81E7', fontWeight: '1000', marginTop: '20px' }}>О товаре</Title>
                <Paragraph style={{ fontSize: `${isTablet ? '12px' : '16px'}`, fontWeight: '600', color: '#000', marginBottom: '6vh' }}>
                    {isTablet ? isExpanded ? <div dangerouslySetInnerHTML={{ __html: text }} /> : truncateTextAfterWords(text, 40) : isExpanded ? <div dangerouslySetInnerHTML={{ __html: text }} /> : truncateTextAfterWords(text, 100)}
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
                <Flex style={{ flexDirection: 'column', rowGap: '15px', marginTop: '20px', overflowY: 'scroll', maxHeight: '320px', marginBottom: '10vh' }}>
                    {verifiedReviews.length > 0 ? (
                        verifiedReviews.map((reviews: ReviewType, index: number) => (
                            <Flex key={index} style={{ flexDirection: 'column', rowGap: '10px' }}>
                                <Flex align={'center'} justify={'space-between'}>
                                    <Flex align={'center'} gap={8}>
                                        <Title style={{ fontSize: `${isTablet ? '12px' : '18px'}`, margin: '0px', fontWeight: '1000', color: '#4B4E51' }}>{reviews.user_name}</Title>
                                        <Star />
                                        <Title style={{ fontSize: `${isTablet ? '12px' : '16px'}`, margin: '0px', fontWeight: '600', color: '#1B81E7' }}>{reviews.rating}</Title>
                                    </Flex>
                                    <Flex>
                                        <Title style={{ margin: 0, color: '#7B7B7B', fontSize: `${isTablet ? '12px' : '16px'}`, fontWeight: '400' }}>{formatDate(reviews.created_at)}</Title>
                                    </Flex>
                                </Flex>
                                <Paragraph style={{ fontWeight: '600', fontSize: `${isTablet ? '12px' : '16px'}`, color: '#2A2A2A' }}>
                                    {reviews.text}
                                </Paragraph>
                            </Flex>
                        ))
                    ) : (
                        <Flex style={{ marginLeft: 16 }} justify={'flex-start'}>
                            <Title style={{ margin: 0, fontSize: 18 }}>Нету отзывов</Title>
                        </Flex>
                    )}

                </Flex>
                <Footer className={styles.CustomFooterSecond}>
                    <Flex>
                        <Title style={{ color: '#1B81E7', fontSize: '14px', fontWeight: '700', cursor: 'pointer', margin: 0 }}>Большe...</Title>
                    </Flex>
                    <Flex onClick={handleStopClose}>
                        <Button onClick={isAuth ? openReviewsModal : handleNavigate} style={{ fontSize: '16px' }} appearance='yellow'>Оставить отзыв</Button>
                    </Flex>
                </Footer>
            </Content>
            {isModalVisible ? (
                <Content className={styles.modalBackground}>
                    {loadingSubmit ? (
                        <Loading />
                    ) : (
                        <Card
                            onClick={handleStopClose}
                            classNames={{ body: styles.ReviewsBodyCustom, header: styles.ReviewsHeaderCustom }}
                            className={styles.ReviewsCardCustom}
                            cover={
                                <Flex>
                                    <Title style={{ margin: 0, fontSize: 16, fontWeight: 500, color: '#7B7B7B' }}>Отзыв</Title>
                                    <TextArea
                                        onChange={handleChange}
                                        name='text'
                                        placeholder='Отзыв...'
                                        rows={4}
                                        variant='filled'
                                        value={reviewData.text}
                                    />
                                </Flex>
                            }
                            extra={
                                <Flex>
                                    <Rate onChange={handleRating} style={{ fontSize: 22 }} />
                                    <CloseOutlined onClick={closeReviewsModal} style={{ fontSize: 22, cursor: 'pointer' }} />
                                </Flex>
                            }
                        >
                            <Flex justify={'end'}>
                                <Button onClick={handleSubmit} className={styles.ReviewsButtonCustom} appearance='yellow'>Оставить отзыв</Button>
                            </Flex>
                        </Card>
                    )}
                </Content>
            ) : null}

        </Flex>
    );
}

export default DetailReviewsDescription;
