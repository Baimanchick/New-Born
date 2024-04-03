import { Select, Space } from 'antd'
import React, { useState } from 'react'
import styles from "../styles/navbar.module.scss"

function PriceRangeSelector() {
    const [salaryFrom, setSalaryFrom] = useState<any>(null)
    const [salaryTo, setSalaryTo] = useState<any>(null)

    const SALARY_RANGE = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]
    return (
        <div className={styles.priceRangeSelector_main}>
            <ul className={styles.priceRangeSelector_title}>
                <li>Цена от</li>
                <li></li>
                <li>Цена до</li>
            </ul>
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
                            label: `$${salary}`,
                            value: salary
                        }
                    })}
                />
                <Select
                    value={salaryTo}
                    onChange={(value: any) => { setSalaryTo(value) }}
                    options={SALARY_RANGE.map(salary => {
                        return {
                            label: `$${salary}`,
                            value: salary
                        }
                    }).filter(salary => salary.value >= salaryFrom)}
                />
            </Space>
        </div>
    )
}

export default PriceRangeSelector