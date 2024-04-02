// import { Drawer } from 'antd';
import { Drawer } from 'antd';

function MobileNavbarFilterSideBar({ isFilterDrawerOpen, setFilterIsDrawerOpen }: { isFilterDrawerOpen: boolean, setFilterIsDrawerOpen: (isOpen: boolean) => void }) {
    return (
        <div>
            <Drawer width="100%" open={isFilterDrawerOpen} onClose={() => setFilterIsDrawerOpen(false)}>
                <h1>Здесь все будет</h1>
            </Drawer>
        </div>
    );
}

export default MobileNavbarFilterSideBar;
