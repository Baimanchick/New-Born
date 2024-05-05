import styles from "../styles/card.module.scss";
import { useEffect } from "react";
import { fetchCategory } from "../store/features/category/categorySlice";
import { CategoryType } from "../helpers/interfaces/CategoryCard.props";
import CategoryCard from "./CategoryCard/CategoryCard";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";

function CategoryCardList() {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.category.category);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  if (!category || !category?.length) {
    return <div> no content</div>;
  }
  return (
    <div className={styles.categoryCard_main}>
      <div className={styles.categoryCard_container}>
        {category.map((category: CategoryType, index: number) => (
          <CategoryCard category={category} key={index} />
        ))}
      </div>
    </div>
  );
}

export default CategoryCardList;
