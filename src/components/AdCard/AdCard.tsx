import { Card } from "antd"
import styles from "../../styles/card.module.scss"

function AdCard() {
    return (
        <div className={styles.adCard_main}>
            <div className={styles.adCard_container}>
                {[1, 2, 3, 4].map((index: number) => (
                    <Card key={index}>
                        <div>01</div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default AdCard