import { useState, useEffect } from 'react';
import { Flex, Layout, Typography } from 'antd';
import { formatNumberAndAddCurrency, truncateTextAfterWords } from '../../helpers/functions/helperFunctions';
import { ReactComponent as Star } from "../../assets/svgs/card/star.svg"
import { Button } from '../Button/Button';
import { HeartOutlined } from '@ant-design/icons';
import { API_URL } from '../../utils/consts';
import useWindowSize from '../../hooks/useWindowSize';
import styles from "../../components/Detail/detail.module.scss"
import { useAppSelector } from '../../hooks/hooks';
import { addFavorites } from '../../store/features/favorite/favoriteSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loader/Loading';


const { Content } = Layout;
const { Text, Title, Paragraph } = Typography;

function InfoBlock({ product }: any) {
    const initialText = product.description;
    const navigate = useNavigate()
    const [text, setText] = useState(initialText);
    const [favoriteLoaded, setFavoriteLoad] = useState(false);
    const isAuth = useAppSelector((store) => store.auth.user !== null);
    const favorites = useAppSelector((state) => state.favorites.favorites);
    const windowSize = useWindowSize();
    const dispatch: AppDispatch = useDispatch();
    const isTablet = windowSize.width && windowSize.width < 990;
    const [clickedHeart, setClickedHeart] = useState(() => {
        const storedValue = localStorage.getItem('clickedHeart');
        return storedValue ? JSON.parse(storedValue) : false;
    });

    const handleClickFavorite = (product_id: number) => {
        if (isAuth) {
            setFavoriteLoad(true);
            setClickedHeart((prevState: any) => !prevState);
            dispatch(addFavorites(product_id));
            localStorage.setItem('clickedHeart', JSON.stringify(!clickedHeart));
        } else if (!isAuth) {
            navigate("/auth");
            alert('Вы не авторизованы');
        }
    }

    useEffect(() => {
        setFavoriteLoad(false);
    }, [favorites])

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
                        <img width={100} src={`${API_URL}${product.brand_image}`} />
                    </Flex>
                    <Button
                        appearance='lightBlue'
                        className={`${styles.CustomButtonInfoBlock} ${clickedHeart ? styles.clickedHeart : styles}`}
                        onClick={() => handleClickFavorite(product.id)}
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
                    }}
                    appearance='yellow'
                    className={styles.CustomButtonCart}
                >
                    В корзину
                </Button>
            </Flex>
        </Content >
    );
}

export default InfoBlock;
