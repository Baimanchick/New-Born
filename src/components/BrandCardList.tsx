import { useEffect } from "react";
import styles from "../styles/card.module.scss";
import BrandCard from "./BrandCard/BrandCard";
import { Flex, List, Typography } from "antd";
import { fetchBrand } from "../store/features/brand/brandSlice";
import { BrandType } from "./BrandCard/BrandCard.props";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import Loading from "./Loader/Loading";

const { Title } = Typography;

function BrandCardList() {
  const dispatch = useAppDispatch();
  const brand = useAppSelector((state) => state.brand.brand);

  useEffect(() => {
    dispatch(fetchBrand());
  }, [dispatch]);
  if (!brand || !brand?.length) {
    return <Loading />;
  }

  return (
    <div className={styles.brandCard_main}>
      <div className={styles.brandCard_container}>
        <Title
          style={{
            fontSize: "24px",
            fontWeight: "1000",
            color: "rgba(119, 134, 146, 1)",
          }}
        >
          Бренды с которыми сотрудничаем
        </Title>
        <Flex
          justify={"space-between"}
          wrap={"wrap"}
          style={{ rowGap: "15px" }}
          gap={15}
        >
          <List
            grid={{
              gutter: 16,
              column: 6,
              xxl: 6,
              xl: 6,
              lg: 4,
              md: 3,
              sm: 2,
              xs: 2,
            }}
            dataSource={brand}
            renderItem={(brand: BrandType, index: number) => (
              <List.Item style={{ backgroundColor: 'initial', display: 'flex', justifyContent: 'center' }}>
                <BrandCard key={index} brand={brand} />
              </List.Item>
            )}
          />

        </Flex>
      </div>
    </div>
  );
}

export default BrandCardList;
