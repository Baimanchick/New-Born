import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import {ReactComponent as CartIcon} from "../assets/svgs/cart/cart.svg";
import {ReactComponent as CardIcon} from "../assets/svgs/cart/card.svg";
import {ReactComponent as SuccessIcon} from "../assets/svgs/cart/sucsess.svg";
import {ReactComponent as BusIcon} from "../assets/svgs/cart/bus.svg";

import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons'
import CartList from "../components/CartList/CartList";

const steps = [
    {
        title: 'Моя корзина',
        content: <CartList/>,
        icon: <CardIcon />,
    },
    {
        title: 'Доставка',
        content: 'Second-content',
        icon: <BusIcon/>
    },
    {
        title: 'Оплата',
        content: 'Last-content',
        icon: <CardIcon/>
    },
    {
        title: 'Подтверждение',
        content: 'Last-content',
        icon: <SuccessIcon/>
    },
];

function CartPage() {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title, icon: item.icon }));

    const contentStyle: React.CSSProperties = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    return (
        <div className='container'>
            <Steps className="site-navigation-steps" responsive={false}  status={"error"} labelPlacement="horizontal" type={"navigation"} current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CartPage;
