import { Card, Flex, Typography } from 'antd';
import styles from "../../styles/card.module.scss"
import { truncateTextAfterWords } from '../../helpers/functions/helperFunctions';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography

function CategoryCard({ category }: any) {
    const navigate = useNavigate()
    return (
        <Card onClick={() => navigate('/filter')} classNames={{ body: styles.categoryCardAntBody, }} className={styles.categoryCardAnt}>
            <Flex style={{ flexDirection: 'column', rowGap: '5px' }}>
                <img className={styles.categoryCardImage} src={category.image} alt={category.name} />
                <Title>{truncateTextAfterWords(category.name, 2)}</Title>
            </Flex>
        </Card>
    );
}

export default CategoryCard;
