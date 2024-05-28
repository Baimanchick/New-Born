import { squircle } from 'ldrs'
import { Flex } from 'antd'


function Loading() {
    squircle.register()

    return (
        <Flex align={'center'} justify={'center'} style={{ height: '490px' }}>
            <l-squircle
                size="37"
                stroke="5"
                stroke-length="0.15"
                bg-opacity="0.1"
                speed="0.9"
                color="#FABC22"
            ></l-squircle>
        </Flex>
    )
}

export default Loading