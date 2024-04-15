import { Flex, Layout } from "antd"
import styles from "../../styles/card.module.scss"
import { AdCardProps } from "./AdCard.props"


function AdCard({ image }: AdCardProps) {
    return (
        <div className={styles.adCard_swiper}>
            <img src={image} />
        </div>
    )
}

export default AdCard