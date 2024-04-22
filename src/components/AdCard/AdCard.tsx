import { replaceUrl } from "../../helpers/functions/helperFunctions"
import styles from "../../styles/card.module.scss"


function AdCard({ ad }: any) {
    return (
        <div className={styles.adCard_swiper}>
            <img src={replaceUrl(ad.image)} />
        </div>
    )
}

export default AdCard