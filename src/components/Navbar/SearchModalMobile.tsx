import { Input } from 'antd';
import { SearchModalProps } from './Navbar.props';
import styles from "./navbar.module.scss";
import "../../styles/antd.scss";

function SearchModalMobile({ isVisible, onClose }: SearchModalProps) {
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
            <Input.Search
                style={{ width: 325, marginTop: 80 }}
                className={styles.input_modal}
                placeholder="Я ищу…"
                onSearch={handleSearch}
                enterButton
                onClick={handleStopClose}
            />
            <div className={styles.dropdown_modal__main}>
                <div onClick={handleStopClose} className={styles.dropdown_modal__container}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((index: number) => (
                        <div className={styles.dropdown_modal}>
                            <p>Смесь сухая Nutrilon Пепти Аллергия</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchModalMobile;
