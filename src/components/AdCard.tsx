import { Card } from "antd"
import styles from "../styles/card.module.scss"

function AdCard() {
    return (
        <div className={styles.adCard_main}>
            <div className={styles.adCard_container}>
                <Card>
                    <div>01</div>
                </Card>
                <Card>
                    <div>01</div>
                </Card>
                <Card>
                    <div>01</div>
                </Card>
                <Card>
                    <div>01</div>
                </Card>
            </div>
        </div>
    )
}

export default AdCard