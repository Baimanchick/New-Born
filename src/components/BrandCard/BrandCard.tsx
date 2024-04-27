import styles from "../../styles/card.module.scss"

function BrandCard({ brand }: any) {
    return (
        <div className={styles.brandCard}>
            <img src={brand.image} alt={brand.name} />
        </div>
    )
}

export default BrandCard
