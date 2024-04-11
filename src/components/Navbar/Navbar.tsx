import { useEffect, useState } from 'react';
import { MenuItem } from './Navbar.props';
import NavbarMenu from './NavbarMenu';
import MobileNavbar from './MobileNavbar';
import SearchModal from './SearchModal';

const menuItems: MenuItem[] = [
    { label: "Главная", key: 'home' },
    { label: "Акции", key: 'stock' },
    { label: "Все Бренды", key: 'allBrands' },
    { label: "Войти", key: 'login' }
];

function Navbar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [isFilterDrawerOpen, setFilterIsDrawerOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 660);
    const [isSearchModalVisible, setIsSearchModalVisible] = useState<boolean>(false);

    const openSearchModal = () => {
        setIsSearchModalVisible(true);
    };

    const closeSearchModal = () => {
        setIsSearchModalVisible(false);
    };

    // TODO Надо потом переделать
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 660);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='container'>
            {isMobile ? (
                <>
                    <MobileNavbar
                        openSearchModal={openSearchModal}
                        setIsDrawerOpen={setIsDrawerOpen}
                        menuItems={menuItems}
                        isDrawerOpen={isDrawerOpen}
                        isFilterDrawerOpen={isFilterDrawerOpen}
                        setFilterIsDrawerOpen={setFilterIsDrawerOpen}
                    />
                    <SearchModal isVisible={isSearchModalVisible} onClose={closeSearchModal} />
                </>

            ) : (
                <NavbarMenu menuItems={menuItems} />
            )}
        </div>
    );
}





export default Navbar;
