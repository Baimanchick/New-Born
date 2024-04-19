import AdCard from "./AdCard/AdCard"
import ad from "../assets/card/ad.png"
import styles from "../styles/card.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { RootStates } from "../store/store"
import { useEffect } from "react"
import { fetchAd } from "../store/features/ad/adSlice"
import { AdType } from "./AdCard/AdCard.props"



function AdCardList() {
    const dispatch = useDispatch<any>()
    const ad = useSelector((state: RootStates) => state.ad.ad)

    useEffect(() => {
        dispatch(fetchAd())
    }, [dispatch])

    return (
        <div className={styles.adCardList_main}>
            <div className={styles.adCardList_container}>
                {ad.slice(0, 4).map((ad: AdType, index: number) => (
                    <AdCard key={index} ad={ad} />
                ))}
            </div>
        </div>
    )
}

export default AdCardList