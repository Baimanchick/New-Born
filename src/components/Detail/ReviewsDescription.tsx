import React, { useState } from 'react';
import { Flex, Layout, Menu, Typography, Button } from 'antd';
import styles from "./detail.module.scss";
import { truncateTextAfterWords } from '../../helpers/functions/helperFunctions';
import { ReactComponent as Star } from '../../assets/svgs/card/star.svg';

const { Content, Header } = Layout;
const { Paragraph, Title } = Typography;

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

function ReviewsDescription() {
    const initialText =
        'Специализированный пищевой продукт детского диетического лечебного питания для детей раннего возраста, смесь сухая на основе полностью гидролизованных белков молочной сыворотки “Nutrilon Пепти Аллергия с пребиотиками”. Для вскармливания детей спищевой аллергией Облегчает симптомы аллергии Белки коровьего молока— частая причина пищевой аллергии у детей первого года жизни. Поэтому в случае, если у ребенка имеется аллергия к белкам коровьего молока и грудного молока матери недостаточно, важно подобрать питание со сниженными аллергенными свойствами, и, вместе с тем, способствующее здоровому и правильному развитию. Ведь нередко аллергия мешает малышу правильно развиваться.Детская смесь Nutrilon Пепти Аллергия разработана на основе международных рекомендаций специально для детей, страдающих аллергией к белкам коровьего молока.Благодаря глубоко расщепленному сывороточному белку, аминокислотный спектр которого соответствует спектру грудного молока, Nutrilon Пепти Аллергия эффективно облегчает симптомы аллергии, втом числе такие, как атопический';

    const [isExpanded, setIsExpanded] = useState(false);
    const [text, setText] = useState(initialText);
    const [reviewsToShow, setReviewsToShow] = useState(3);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleShowMoreReviews = () => {
        const remainingReviews = reviewsToShow + 2;
        setReviewsToShow(remainingReviews > 10 ? 10 : remainingReviews);
    };

    const shouldShowMoreButton = text.split(' ').length > 100;

    return (
        <Flex justify={'space-between'} gap={15}>
            <Content style={{ width: '100%', backgroundColor: '#fff', padding: '20px', borderRadius: '20px' }}>
                <Header style={{ background: '#fff', padding: '0px' }}>
                    <Menu mode="horizontal" defaultSelectedKeys={['1']} items={item1} className={styles.CustomRewDesMenu} />
                </Header>
                <Title style={{ fontSize: '32px', color: '#1B81E7', fontWeight: '1000', marginTop: '20px' }}>О товаре</Title>
                <Paragraph style={{ fontSize: '16px', fontWeight: '600', color: '#000' }}>
                    {isExpanded ? text : truncateTextAfterWords(text, 100)}
                    {shouldShowMoreButton && !isExpanded && (
                        <span className={styles.showMore} onClick={toggleExpand}>
                            больше
                        </span>
                    )}
                </Paragraph>
            </Content>
            <Content style={{ width: '100%', backgroundColor: '#fff', padding: '20px', borderRadius: '20px' }}>
                <Header style={{ background: '#fff', padding: '0px' }}>
                    <Menu mode="horizontal" defaultSelectedKeys={['2']} items={item2} className={styles.CustomRewDesMenu} />
                </Header>
                <Flex style={{ flexDirection: 'column', rowGap: '15px', marginTop: '20px' }}>
                    {[0, 1, 2, 3, 4, 5].slice(0, reviewsToShow).map((index: number) => (
                        <Flex key={index} style={{ flexDirection: 'column', rowGap: '10px' }}>
                            <Flex align={'center'} justify={'space-between'}>
                                <Flex align={'center'} gap={8}>
                                    <Title style={{ fontSize: '18px', margin: '0px', fontWeight: '1000', color: '#4B4E51' }}>Ирина</Title>
                                    <Title style={{ fontSize: '18px', margin: '0px', fontWeight: '1000', color: '#4B4E51' }}>В.</Title>
                                    <Star />
                                    <Title style={{ fontSize: '16px', margin: '0px', fontWeight: '600', color: '#1B81E7' }}>4.8</Title>
                                </Flex>
                                <Flex>
                                    <Title style={{ color: '#7B7B7B', fontSize: '16px', fontWeight: '400' }}>05.10.2021</Title>
                                </Flex>
                            </Flex>
                            <Paragraph style={{ fontWeight: '600', fontSize: '16px', color: '#2A2A2A' }}>
                                Смесь хорошая, кормили ей первого ребёнка, также из-за аллергии пришлось кормить второго. Единственный минус это цена, она космическая. Это питание необходимое ребёнку по состоянию здоровья, почему оно не может быть по адекватной цене?
                            </Paragraph>
                        </Flex>
                    ))}
                </Flex>
                {reviewsToShow < 10 && (
                    <Flex >
                        <Title style={{ color: '#1B81E7', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }} onClick={toggleShowMoreReviews}>Больше…</Title>
                    </Flex>
                )}
            </Content>
        </Flex>
    );
}

export default ReviewsDescription