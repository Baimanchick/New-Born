import {
    Flex,
    Image,
    List,
    Typography,
} from "antd";
import styles from "./order.module.scss";
import { Colors } from "../../helpers/enums/color.enum";
import { formatNumberAndAddCurrency, truncateTextAfterWords } from "../../helpers/functions/helperFunctions";
import { Cart } from "../../helpers/interfaces/cart.interface";
const { Text, Title } = Typography;

const fontStyles: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "23px",
};

const headerItems = ["Товар", "Цена", "Количество", "Адрес", "В общем"];

export function OrderHistory({ carts }: any) {
    const sortCartsById = (carts: any) => {
        return [...carts].sort((a, b) => a.id - b.id);
    };
    const fakeCart = {
        adress: 'Исанова 33',
    }

    const sortedCarts = sortCartsById(carts);

    return (
        <>
            <List
                className={styles.list}
                header={
                    <Flex
                        align={"center"}
                        justify={"space-between"}
                        className={styles.headerItems}
                    >
                        {headerItems.map((item, index: number) => {
                            return <Text key={index} className={styles.headerItem}>{item}</Text>;
                        })}
                    </Flex>
                }
                itemLayout="horizontal"
                dataSource={sortedCarts}
                renderItem={(cart: Cart, index: number) => (
                    <Flex justify={'space-between'} align={'center'}>
                        <Flex>
                            <Image width={100} height={100} src={cart.product.default_image} />
                            <Text style={{ ...fontStyles, color: Colors.GREY, width: 214 }} >{truncateTextAfterWords(cart.product.name, 5)}</Text>
                        </Flex>
                        <Flex>
                            <Title className={styles.blackProfileFont} >{formatNumberAndAddCurrency(cart.product.price, 'сом')}</Title>
                        </Flex>
                        <Flex>
                            <Title className={styles.blackProfileFont}>{cart.count} шт</Title>
                        </Flex>
                        <Flex>
                            <Title className={styles.blackProfileFont}>{fakeCart.adress} </Title>
                        </Flex>
                        <Flex>
                            <Title className={styles.yellowProfileFont}>{formatNumberAndAddCurrency(cart.product.price * cart.count, 'сом')}</Title>
                        </Flex>
                    </Flex>
                )}
            />
        </>
    );
}

export default OrderHistory;
