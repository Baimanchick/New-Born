import { Input } from 'antd';
import { SearchModalProps } from './Navbar.props';
import styles from "./navbar.module.scss";
import "../../styles/antd.scss";

function SearchModal({ isVisible, onClose }: SearchModalProps) {
    const handleSearch = (value: string) => {
        onClose();
    };
    return (
        <div className={styles.modalBackground} style={{ display: isVisible ? 'flex' : 'none' }}>
            <Input.Search style={{ width: '300px', marginTop: '80px' }} className={styles.input_modal} placeholder="Я ищу…" onSearch={handleSearch} enterButton />
            <div className={styles.dropdown_modal__main}>
                <div className={styles.dropdown_modal__container}>
                    <div className={styles.dropdown_modal}>
                        <p>Смесь сухая Nutrilon Пепти Аллергия</p>
                    </div>
                    <div className={styles.dropdown_modal}>
                        <p>Смесь сухая Nutrilon Пепти Аллергия</p>
                    </div>
                    <div className={styles.dropdown_modal}>
                        <p>Смесь сухая Nutrilon Пепти Аллергия</p>
                    </div>
                    <div className={styles.dropdown_modal}>
                        <p>Смесь сухая Nutrilon Пепти Аллергия</p>
                    </div>
                    <div className={styles.dropdown_modal}>
                        <p>Смесь сухая Nutrilon Пепти Аллергия</p>
                    </div>
                    <div className={styles.dropdown_modal}>
                        <p>Смесь сухая Nutrilon Пепти Аллергия</p>
                    </div>
                    <div className={styles.dropdown_modal}>
                        <p>Смесь сухая Nutrilon Пепти Аллергия</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SearchModal