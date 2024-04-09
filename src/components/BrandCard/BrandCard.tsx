import styles from "../../styles/card.module.scss"
import { BrandCardProps } from "./BrandCard.props"

function BrandCard({ image }: BrandCardProps) {
    return (
        <div className={styles.brandCard}>
            <img src={image} />
        </div>
    )
}

export default BrandCard