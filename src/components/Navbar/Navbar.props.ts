export interface NavbarMenuProps {
    menuItems: MenuItem[]; 
    openSearchModal: any
}

export interface SearchModalProps {
    isVisible: boolean;
    onClose: any
}

export interface MobileNavbarProps {
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setFilterIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    menuItems: MenuItem[]; 
    isDrawerOpen: boolean; 
    isFilterDrawerOpen: boolean; 
    openSearchModal: any;
}
export interface MenuItem {
    label: string;
    key: string;
}