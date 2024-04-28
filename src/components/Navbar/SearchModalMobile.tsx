import { AutoComplete, Input, SelectProps } from 'antd';
import { SearchModalProps } from './Navbar.props';
import styles from "./navbar.module.scss";
import "../../styles/antd.scss";
import { useState } from 'react';

const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query: string) =>
    new Array(getRandomInt(5))
        .join('.')
        .split('.')
        .map((_, idx) => {
            const category = `${query}${idx}`;
            return {
                value: category,
                label: (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span>
                            Found {query} on{' '}
                            <a
                                href={`https://s.taobao.com/search?q=${query}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {category}
                            </a>
                        </span>
                        <span>{getRandomInt(200, 100)} results</span>
                    </div>
                ),
            };
        });

function SearchModalMobile({ isVisible, onClose }: SearchModalProps) {
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);

    const handleSearchAntd = (value: string) => {
        setOptions(value ? searchResult(value) : []);
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
                style={{ marginTop: 80 }}
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