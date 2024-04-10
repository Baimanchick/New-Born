import React from 'react'
import "../styles/main.scss"
import FilterSideBar from '../components/FilterSideBar/FilterSideBar'

function FilterPage() {
    return (
        <div className='container-gray'>
            <div className='gray'>
                <FilterSideBar />
            </div>
        </div>
    )
}

export default FilterPage