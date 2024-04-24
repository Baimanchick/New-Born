import styles from "../../styles/card.module.scss"


function AdCard({ ad }: any) {
    return (
        <div className={styles.adCard_swiper}>
            <img src={ad.image} alt='ad' />
        </div>
    )
}

export default AdCard