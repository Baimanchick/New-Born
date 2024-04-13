import AdCard from "./AdCard/AdCard"
import ad from "../assets/card/ad.png"
import styles from "../styles/card.module.scss"



function AdCardList() {
    return (
        <div className={styles.adCardList_main}>
            <div className={styles.adCardList_container}>
                {[1, 2, 3, 4].map((index: number) => (
                    <AdCard key={index} image={ad} />
                ))}
            </div>
        </div>
    )
}

export default AdCardList