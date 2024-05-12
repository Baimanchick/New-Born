import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const openNotification = (type: NotificationType, title: string, description: string, duration: number) => {
    notification[type]({
        message: title,
        description: description,
        duration: duration,
    });
};

export default openNotification;
