import { Card, Flex, Typography } from 'antd';
import styles from "../../styles/card.module.scss";
import { truncateTextAfterWords } from '../../helpers/functions/helperFunctions';
import { useNavigate } from 'react-router-dom';
import { CategoryType } from './CategoryCard.props';
import { SubCategory } from '../../helpers/interfaces/category.interface';

const { Title } = Typography;

function CategoryCard({ category, subcategories }: { category: CategoryType, subcategories: SubCategory[] }) {
    const navigate = useNavigate();

    function handleCardClick() {
        const firstSubcategory = subcategories.find((sub: SubCategory) => sub.category === category.id);
        if (firstSubcategory) {
            navigate('/filter', {
                state: {
                    category: category.name,
                    subcategory: firstSubcategory.title,
                }
            });
        } else {
            navigate('/filter', {
                state: {
                    category: category.name,
                }
            });
        }
    }

    return (
        <Card
            classNames={{ body: styles.categoryCardAntBody }}
            className={styles.categoryCardAnt}
            onClick={handleCardClick}
        >
            <Flex style={{ flexDirection: 'column', rowGap: '5px' }}>
                <img className={styles.categoryCardImage} src={category.image} alt={category.name} />
                <Title>{truncateTextAfterWords(category.name, 2)}</Title>
            </Flex>
        </Card>
    );
}

export default CategoryCard;
