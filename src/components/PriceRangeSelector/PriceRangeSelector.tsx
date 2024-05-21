import { Flex, Select, Space, Typography } from "antd";
import { useState } from "react";
import styles from "./priceRange.module.scss";

const { Title } = Typography;

interface PriceRangeSelectorProps {
  onPriceFrom?: (value: number) => void;
  onPriceTo?: (value: number) => void;
}
function PriceRangeSelector({
  onPriceFrom,
  onPriceTo,
}: PriceRangeSelectorProps) {
  const PRICE_RANGE = [
    2000, 1000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
  ];

  PRICE_RANGE.sort((a, b) => a - b);

  const [priceFrom, setPriceFrom] = useState<number>(PRICE_RANGE[0]);
  const [priceTo, setPriceTo] = useState<number>(
    PRICE_RANGE[PRICE_RANGE.length - 1]
  );

  const handlePriceTo = (value: number) => {
    setPriceTo(value);
    if (onPriceTo) {
      onPriceTo(value);
    }
  };
  const handlePriceFrom = (value: number) => {
    setPriceFrom(value);
    if (onPriceFrom) {
      onPriceFrom(value);
    }
  };

  return (
    <div className={styles.priceRangeSelector_main}>
      <Flex justify={"space-between"} gap={40}>
        <Title
          style={{
            color: "#7B7B7B",
            fontWeight: "500",
            fontSize: "16px",
            cursor: "pointer",
          }}
          level={5}
        >
          Цена от
        </Title>
        <Title
          style={{
            marginTop: "initial",
            marginBottom: "initial",
            color: "#7B7B7B",
            fontWeight: "500",
            fontSize: "16px",
            cursor: "pointer",
          }}
          level={5}
        >
          Цена до
        </Title>
      </Flex>
      <Space direction="horizontal" size={12}>
        <Select
          value={priceFrom}
          onChange={handlePriceFrom}
          options={PRICE_RANGE.map((salary) => {
            return {
              label: `${salary}`,
              value: salary,
            };
          })}
        />
        <Select
          value={priceTo}
          onChange={handlePriceTo}
          options={PRICE_RANGE.map((salary) => {
            return {
              label: `${salary}`,
              value: salary,
            };
          }).filter((salary) => salary.value > priceFrom)}
        />
      </Space>
    </div>
  );
}

export default PriceRangeSelector;
