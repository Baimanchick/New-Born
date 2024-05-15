import { AutoComplete, Input, SelectProps } from 'antd';
import { SearchModalProps } from './Navbar.props';
import styles from "./navbar.module.scss";
import "../../styles/antd.scss";
import { useEffect, useState } from 'react';
import { Product } from '../../helpers/interfaces/product.interface';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchProducts } from '../../store/features/products/productSlice';
import { useNavigate } from 'react-router-dom';

const searchResult = (products: Product[], query: string, navigate: any, handleCloseModal: () => void) =>
    products
        .filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
        .map(product => ({
            value: product.name,
            label: (
                <div
                    key={product.id}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                    onClick={() => {
                        navigate(`/detail/${product.id}`)
                        handleCloseModal()
                    }}
                >
                    <span style={{ cursor: 'pointer' }} >
                        <strong>Найдено:</strong> {product.name}
                    </span>
                </div>
            ),
        }));

function SearchModalMobile({ isVisible, onClose }: SearchModalProps) {
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);
    const dispatch = useAppDispatch()
    const products = useAppSelector((state) => state.products.products)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchProducts({
            limit: 16,
            offset: 0,
        }))
    }, [dispatch])

    const handleSearchAntd = (value: string) => {
        if (value.trim() !== '') {
            setOptions(searchResult(products, value.trim(), navigate, handleCloseModal));
        } else {
            setOptions([]);
        }
    };

    const onSelect = (value: string) => {
        console.log('onSelect', value);
    };

    const handleSearch = (value: string) => {
        onClose();
    };

    const handleCloseModal = () => {
        onClose();
    };

    const handleStopClose = (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
    };

    return (
        <div
            className={styles.modalBackground}
            style={{ display: isVisible ? 'flex' : 'none' }}
            onClick={handleCloseModal}
        >
            <AutoComplete
                popupMatchSelectWidth={325}
                options={options}
                size="large"
                style={{ marginTop: 80, borderRadius: '20px' }}
                onSelect={onSelect}
                onSearch={handleSearchAntd}
                onClick={handleStopClose}
            >
                <Input.Search
                    style={{ width: 325, }}
                    className={styles.input_modal}
                    placeholder="Я ищу…"
                    onSearch={handleSearch}
                    enterButton
                />
            </AutoComplete>
        </div>
    );
}

export default SearchModalMobile;
