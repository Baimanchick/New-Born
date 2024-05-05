import AdCard from "./AdCard/AdCard";
import styles from "../styles/card.module.scss";
import { useEffect, useState } from "react";
import { fetchAd } from "../store/features/ad/adSlice";
import { AdType } from "../helpers/interfaces/AdCard.props";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

function AdCardList() {
  const dispatch = useAppDispatch();
  const ad = useAppSelector((state) => state.ad.ad);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchAd())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className={styles.adCardList_main}>
      <div className={styles.adCardList_container}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          ad
            .slice(0, 4)
            .map((ad: AdType, index: number) => <AdCard key={index} ad={ad} />)
        )}
      </div>
    </div>
  );
}

export default AdCardList;
