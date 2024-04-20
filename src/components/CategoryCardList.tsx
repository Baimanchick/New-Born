import styles from "../styles/card.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import { RootStates } from '../store/store';
import { useEffect, useState } from 'react';
import { fetchCategory } from '../store/features/category/categorySlice';
import { CategoryType } from "./CategoryCard/CategoryCard.props";
import CategoryCard from "./CategoryCard/CategoryCard";
import ErrorTitle from "./ErrorTitle/ErrorTitle";

function CategoryCardList() {
    const dispatch = useDispatch<any>()
    const category = useSelector((state: RootStates) => state.category.category)
    const [error, setError] = useState(false)

    useEffect(() => {
        dispatch(fetchCategory())
            .catch(() => setError(true))
    }, [dispatch])

    if (!error) {
        return <ErrorTitle />
    }

    return (
        <div className={styles.categoryCard_main}>
            <div className={styles.categoryCard_container}>
                {category.map((category: CategoryType, index: number) => (
                    <CategoryCard category={category} key={index} />
                ))}
            </div>
        </div>

    )
}

export default CategoryCardList