import React, { useState } from 'react';
import { Card, Divider, Flex, Layout, List, Typography, Button as ButtonAntd } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styles from "./profile.module.scss";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loading from '../Loader/Loading';
import TextArea from 'antd/es/input/TextArea';
import { Button } from '../Button/Button';
import useEscapeKey from '../../hooks/useKeyDown';
import openNotification from '../Notification/Notification';

const { Title } = Typography;
const { Content } = Layout

function ProfileList() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const navigate = useNavigate();
    const [changedName, setChangedName] = useState(user?.name);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const dispatch = useDispatch();

    const dataSource = [
        {
            title: 'E-mail',
            info: user?.email,
        },
        {
            title: 'Имя',
            info: user?.name,
        }
    ];

    const openProfileModal = () => {
        setIsModalVisible(true);
    };

    const closeProfileModal = () => {
        setIsModalVisible(false);
    };

    const handleStopClose = (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
    };

    useEscapeKey(closeProfileModal)

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={dataSource}
                renderItem={(user) => (
                    <List.Item
                        actions={user.info ? [
                            <EditOutlined
                                key="edit"
                                style={{
                                    fontSize: '18px',
                                    color: '#000',
                                    cursor: 'pointer'
                                }}
                                onClick={() => user.title === "E-mail" ? openNotification('warning', 'Предупреждение', 'Вы не можете поменять почту', 2) : openProfileModal()}
                            />
                        ] : []}
                        className={styles.item}
                    >
                        <List.Item.Meta
                            className={styles.itemMeta}
                            title={user.title}
                            description={user.info}
                        />
                    </List.Item>
                )}
            />
            <Divider style={{ margin: 0 }} />
            {isModalVisible ? (
                <Content onClick={closeProfileModal} className={styles.modalBackground}>
                    {loadingSubmit ? (
                        <Loading />
                    ) : (
                        <Card
                            onClick={handleStopClose}
                            classNames={{ body: styles.ProfileBodyCustom, header: styles.ProfileHeaderCustom, cover: styles.ProfileCoverCustom }}
                            className={styles.ProfileCardCustom}
                            cover={
                                <>
                                    <Flex>
                                        <Title style={{ margin: 0, marginBottom: 10, fontSize: 16, fontWeight: 500, color: '#7B7B7B' }}>Старое имя</Title>
                                        <ButtonAntd type="primary" className={styles.CustomButtonProfile} disabled>
                                            {user?.name}
                                        </ButtonAntd>
                                    </Flex>
                                    <Flex style={{ marginTop: 35 }}>
                                        <Title style={{ margin: 0, marginBottom: 10, fontSize: 16, fontWeight: 500, color: '#7B7B7B' }}>Новое имя</Title>
                                        <TextArea
                                            name='text'
                                            placeholder='Имя...'
                                            rows={2}
                                            variant='filled'
                                            className={styles.TextAreaAnt}
                                        />
                                    </Flex>
                                </>
                            }
                            extra={
                                <Title style={{
                                    fontSize: 40,
                                    fontWeight: 1000,
                                    color: '#1B81E7'
                                }}
                                >
                                    Изменить имя
                                </Title>
                            }
                        >
                            <Flex justify={'end'}>
                                <Button className={styles.ProfileButton} appearance='yellow'>Оставить отзыв</Button>
                            </Flex>
                        </Card>
                    )}
                </Content>
            ) : null}
        </>
    );
}

export default ProfileList;
