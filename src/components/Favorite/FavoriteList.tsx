import ProductList from "../ProductList/ProductList"

function FavoriteList({ favoriteProducts }: any) {

    return (
        <>
            <ProductList
                products={favoriteProducts}
                grid={{
                    gutter: 16,
                    column: 6,
                    xxl: 6,
                    xl: 6,
                    lg: 4,
                    md: 3,
                    sm: 2,
                    xs: 2,
                }}
            />
        </>
    )
}

export default FavoriteList