import { replaceUrl } from "../../helpers/functions/helperFunctions"
import styles from "../../styles/card.module.scss"

function BrandCard({ brand }: any) {
    return (
        <div className={styles.brandCard}>
            <img src={replaceUrl(brand.images)} />
        </div>
    )
}

export default BrandCard