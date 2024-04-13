import { Flex, Layout } from 'antd'
import React from 'react'

const { Content, Sider } = Layout


function ReviewsDescription() {
    return (
        <Flex justify={'space-between'} gap={15}>
            <Content style={{ width: '100%', backgroundColor: "#fff", padding: '20px', borderRadius: '20px' }}>
                Описание
            </Content>
            <Content style={{ width: '100%', backgroundColor: "#fff", padding: '20px', borderRadius: '20px' }}>
                Отзывы
            </Content>
        </Flex>
    )
}

export default ReviewsDescription