import React, { useState, useEffect } from 'react';
import { Flex, Typography, Menu } from 'antd';
import type { MenuProps } from 'antd';
import PriceRangeSelector from '../PriceRangeSelector/PriceRangeSelector';
import styles from './filterSideBar.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchBrand } from '../../store/features/brand/brandSlice';
import { useSearchParams, useLocation } from 'react-router-dom';
import { fetchCategory, fetchSubcategory } from '../../store/features/category/categorySlice';
import { CategoryType } from '../CategoryCard/CategoryCard.props';
import { SubCategory } from '../../helpers/interfaces/category.interface';
import "../../styles/antd.scss"

export interface BrandI {
  brand: BrandType[];
}

export type BrandType = {
  id?: number;
  name: string;
  image: string;
};

const { Title } = Typography;

const inlineStylesFlex: React.CSSProperties = {
  flexDirection: 'column',
  padding: '20px',
  background: 'white',
  borderRadius: 20,
};

interface FilterMenuProps {
  setFilterIsDrawerOpen?: (value: boolean) => void;
}

function FilterMenu({ setFilterIsDrawerOpen }: FilterMenuProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const brands = useAppSelector((state) => state.brand.brand);
  const { category, subcategories } = useAppSelector((state) => state.category);
  const [brandKey, setBrandKey] = useState(localStorage.getItem('brandKey') || '');
  const [catalogKey, setCatalogKey] = useState<number[]>(
    JSON.parse(localStorage.getItem('catalogKey') || '[]')
  );
  const [subKey, setSubKey] = useState<number[]>(
    JSON.parse(localStorage.getItem('subKey') || '[]')
  );
  useEffect(() => {
    dispatch(fetchBrand());
    dispatch(fetchCategory());
    dispatch(fetchSubcategory());

    if (location.state) {
      const { category, subcategory } = location.state;
      if (category) {
        handleFilterChange('category', category);
      }
      if (subcategory) {
        handleFilterChange('subcategory', subcategory);
      }
    }
  }, [location.state]);

  function handleFilterChange(key: string, value: string) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else if (prevParams.has(key)) {
        prevParams.delete(key);
        prevParams.append(key, value);
      } else {
        prevParams.append(key, value);
      }
      return prevParams;
    });
  }

  const closeMenu = () => {
    if (setFilterIsDrawerOpen) {
      setFilterIsDrawerOpen(false);
    }
  };

  const items = brands.map((brand: BrandType, index) => ({
    key: index.toString(),
    label: brand.name,
  }));

  const categoriesAndSubs = category.map((item: CategoryType, index: number) => ({
    key: item.id?.toString() || index.toString(),
    label: item.name,
    children: subcategories
      .filter((sub: SubCategory) => sub.category === item.id)
      .map((sub: SubCategory) => ({
        key: sub.id.toString(),
        label: sub.title,
      })),
  }));

  const onClick: MenuProps['onClick'] = (e) => {
    setBrandKey(e.key);
    localStorage.setItem('brandKey', e.key);
    const brand = items.find((item) => item.key === e.key);
    if (brand) {
      handleFilterChange('brand', brand.label);
    }
    closeMenu();
  };

  const catalogHandler: MenuProps['onClick'] = (e) => {
    const selectedCategory: CategoryType | undefined = category.find(
      (item: CategoryType) => item.id === Number(e.keyPath[1])
    );
    const selectedSub: SubCategory | undefined = subcategories.find(
      (item: SubCategory) => item.id === Number(e.key)
    );
    if (selectedCategory && selectedSub) {
      handleFilterChange('category', selectedCategory.name);
      handleFilterChange('subcategory', selectedSub.title);
    }
    const selectedCategorykey = [selectedCategory?.id].filter(Boolean) as number[];
    const selectedSubkey = [selectedSub?.id].filter(Boolean) as number[];
    localStorage.setItem("catalogKey", JSON.stringify(selectedCategorykey));
    localStorage.setItem("subKey", JSON.stringify(selectedSubkey));
    setCatalogKey(selectedCategorykey);
    setCatalogKey(selectedSubkey);
    closeMenu();
  };


  const onPriceTo = (value: number) => {
    handleFilterChange('max_price', value.toString());
    closeMenu();
  };

  const onPriceFrom = (value: number) => {
    handleFilterChange('min_price', value.toString());
    closeMenu();
  };

  return (
    <Flex gap={20} vertical>
      <Flex style={inlineStylesFlex}>
        <Title
          style={{
            color: '#1B81E7',
            fontWeight: '1000',
            fontSize: '22px',
            cursor: 'pointer',
          }}
        >
          Каталог
        </Title>
        <Menu
          theme={'light'}
          onClick={catalogHandler}
          style={{ width: '100%' }}
          defaultSelectedKeys={subKey.map(String)}
          defaultOpenKeys={catalogKey.map(String)}
          mode="inline"
          items={categoriesAndSubs}
          className={styles.menuCustomFilter}
        />
      </Flex>

      <Flex style={inlineStylesFlex}>
        <Title style={{ color: '#1B81E7', fontWeight: '1000', fontSize: '22px' }}>Цена, сом</Title>
        <PriceRangeSelector onPriceTo={onPriceTo} onPriceFrom={onPriceFrom} />
      </Flex>

      <Flex style={inlineStylesFlex}>
        <Title style={{ color: '#1B81E7', fontWeight: '1000', fontSize: '22px', cursor: 'pointer' }}>
          Бренд
        </Title>
        <Menu
          onClick={onClick}
          theme={'light'}
          style={{ width: '100%' }}
          selectedKeys={[brandKey]}
          mode="inline"
          items={items}
        />
      </Flex>
    </Flex>
  );
}

export default FilterMenu;
