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
                <img style={{ width: '120px', height: '120px', objectFit: 'contain' }} src={category.image} alt={category.name} />
                <Title style={{ margin: '0px', fontSize: '22px', fontWeight: '1000' }}>{truncateTextAfterWords(category.name, 4)}</Title>
            </Flex>
        </Card>
    );
}

export default CategoryCard;
