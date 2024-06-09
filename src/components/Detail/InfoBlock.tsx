import { useEffect, useState } from 'react';
import { Flex, Layout, Typography } from 'antd';
import { formatNumberAndAddCurrency, truncateTextAfterWords } from '../../helpers/functions/helperFunctions';
import { ReactComponent as Star } from "../../assets/svgs/card/star.svg"
import { Button } from '../Button/Button';
import { CheckOutlined, HeartOutlined } from '@ant-design/icons';
import { API_URL } from '../../utils/consts';
import useWindowSize from '../../hooks/useWindowSize';
import styles from "../../components/Detail/detail.module.scss"
import { useAppSelector } from '../../hooks/hooks';
import { addFavorites } from '../../store/features/favorite/favoriteSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../store/features/cart/cartSlice';
import openNotification from '../Notification/Notification';
import Loading from '../Loader/Loading';
const { Content } = Layout;
const { Text, Title, Paragraph } = Typography;

function InfoBlock({ product }: any) {
    const initialText = product.description;
    const navigate = useNavigate()
    const [text, setText] = useState(initialText);
    const isAuth = useAppSelector((store) => store.auth.user !== null);
    const windowSize = useWindowSize();
    const dispatch: AppDispatch = useDispatch();
    const favorites = useAppSelector((state) => state.favorites.favorites)
    const isTablet = windowSize.width && windowSize.width < 990;
    const [addedToCart, setAddedToCart] = useState(false);
    const isProductInFavorites = favorites.some((fav) => fav.id === product?.id);

    const handleClickFavorite = (product_id: number) => {
        if (isAuth) {
            dispatch(addFavorites(product_id));
        } else if (!isAuth) {
            navigate("/register");
            openNotification('error', 'Ошибка', 'Вы не авторизованы', 2)
        }
    }

    const handleAddToCart = (productId: number) => {
        if (isAuth) {
            dispatch(addToCart({ count: 1, product_id: productId }));
            setAddedToCart(true);
        } else {
            navigate("/register");
            openNotification('error', 'Ошибка', 'Вы не авторизованы', 2)
        }

    };
    useEffect(() => {
        const addedProducts = JSON.parse(localStorage.getItem('AddedProducts') || '[]');
        const addedToCart = addedProducts.includes(product?.id);
        setAddedToCart(addedToCart);
    }, [product]);

    if (!product) {
        return <Loading />
    }

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
                <Flex className={styles.CustomUtilsFlex} >
                    <Flex
                        gap={4}
                        className={styles.CustomFlexInfoBlock}
                    >
                        <Star />
                        {product.rating}
                    </Flex>
                    <Flex
                        justify={'center'}
                        className={styles.CustomFlexInfoBlock}
                    >
                        <img style={{ objectFit: 'contain', width: 'auto', height: 40 }} src={`${API_URL}${product.brand_image}`} />
                    </Flex>
                    <Button
                        appearance='lightBlue'
                        className={`${styles.CustomButtonInfoBlock} ${isProductInFavorites ? styles.clickedHeart : styles}`}
                        onClick={() => handleClickFavorite(product.id)}
                    >
                        <HeartOutlined style={{ display: `${isProductInFavorites ? 'none' : 'initial'}` }} />
                        {isProductInFavorites ? <CheckOutlined color={'red'} /> : "В избранное"}
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
                    {formatNumberAndAddCurrency(product.price, 'сом')}
                </Text>
                <Button
                    style={{
                        fontSize: '18px',
                        fontWeight: '1000',
                        width: '320px',
                        height: '60px',
                        borderRadius: '80px'
                    }}
                    appearance='yellow'
                    className={styles.CustomButtonCart}
                    onClick={() => addedToCart ? openNotification('warning', 'Предупреждение', 'Вы уже добавили в корзину', 2) : handleAddToCart(product.id)}
                >
                    {addedToCart ? "Добавлено в корзину" : 'В корзину'}
                </Button>


            </Flex>
        </Content >
    );
}

export default InfoBlock;
