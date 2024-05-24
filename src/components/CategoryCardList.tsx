import styles from "../styles/card.module.scss";
import { useEffect } from "react";
import { fetchCategory } from "../store/features/category/categorySlice";
import { CategoryType } from "./CategoryCard/CategoryCard.props";
import CategoryCard from "./CategoryCard/CategoryCard";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import Loading from "./Loader/Loading";

function CategoryCardList() {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.category.category);
  const subcategories = useAppSelector((state) => state.category.subcategories);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  if (!category || !category?.length) {
    return <Loading />;
  }

  return (
    <div className={styles.categoryCard_main}>
      <div className={styles.categoryCard_container}>
        {category.map((category: CategoryType, index: number) => (
          <CategoryCard category={category} subcategories={subcategories} key={index} />
        ))}
      </div>
    </div>
  );
}

export default CategoryCardList;
