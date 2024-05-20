import { Flex, Select, Space, Typography } from 'antd'
import { useState } from 'react'
import styles from "./priceRange.module.scss"

const { Title } = Typography

function PriceRangeSelector() {
    const SALARY_RANGE = [2000, 1000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]

    SALARY_RANGE.sort((a, b) => a - b);

    const [salaryFrom, setSalaryFrom] = useState<any>(SALARY_RANGE[0])
    const [salaryTo, setSalaryTo] = useState<any>(SALARY_RANGE[SALARY_RANGE.length - 1])

    return (
        <div className={styles.priceRangeSelector_main}>
            <Flex justify={'space-between'} gap={40}>
                <Title style={{ color: '#7B7B7B', fontWeight: '500', fontSize: '16px', cursor: 'pointer' }} level={5}>Цена от</Title>
                <Title style={{ marginTop: 'initial', marginBottom: 'initial', color: '#7B7B7B', fontWeight: '500', fontSize: '16px', cursor: 'pointer' }} level={5}>Цена до</Title>
            </Flex>
            <Space direction='horizontal' size={12}>
                <Select
                    value={salaryFrom}
                    onChange={(value: any) => {
                        setSalaryFrom(value)
                        if (value > salaryTo) {
                            setSalaryTo(null)
                        }
                    }}
                    options={SALARY_RANGE.map(salary => {
                        return {
                            label: `${salary}`,
                            value: salary
                        }
                    })}
                />
                <Select
                    value={salaryTo}
                    onChange={(value: any) => { setSalaryTo(value) }}
                    options={SALARY_RANGE.map(salary => {
                        return {
                            label: `${salary}`,
                            value: salary
                        }
                    }).filter(salary => salary.value >= salaryFrom)}
                />
            </Space>
        </div>
    )
}

export default PriceRangeSelector;
