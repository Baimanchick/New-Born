import React from 'react'
import CategoryCard from './CategoryCard/CategoryCard'
import img from "../assets/card/image.png";

function CategoryCardList() {
    return (
        <div>
            <CategoryCard
                title='Искусственное вскармливание'
                image={img}
            />
        </div>
    )
}

export default CategoryCardList