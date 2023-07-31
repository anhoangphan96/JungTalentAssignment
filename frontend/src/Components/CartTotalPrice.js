import styles from "./CartTotalPrice.module.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ScalapayWidget from "./ScalapayWidget";
const CartTotalPrice = (props) => {
  const cartList = useSelector((state) => state.cart);

  const totalPrice =
    cartList.listItem.length > 0
      ? cartList.listItem.reduce((total, item) => {
          return total + +item.quantity * +item.price;
        }, 0)
      : 0;
  return (
    <div className={styles.container}>
      <h3>CART TOTAL</h3>
      <h4 className={styles.subTotal}>
        SUBTOTAL
        <span> {totalPrice} EUR </span>
      </h4>
      <h4 className={styles.total}>
        TOTAL <span> {totalPrice} EUR</span>
      </h4>
      <ScalapayWidget totalPrice={totalPrice}></ScalapayWidget>
    </div>
  );
};
export default CartTotalPrice;
