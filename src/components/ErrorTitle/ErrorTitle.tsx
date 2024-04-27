import { Flex, Typography } from 'antd'

const { Title } = Typography

function ErrorTitle() {
    return (
        <Flex justify={'center'}>
            <Title style={{ margin: '0px', fontSize: 16 }}>
                Извините, возникла ошибка. Пожалуйста, попробуйте позже.
            </Title>
        </Flex>
    )
}

export default ErrorTitle