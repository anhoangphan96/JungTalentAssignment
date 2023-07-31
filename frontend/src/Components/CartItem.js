import React from "react";
import { useState } from "react";
import styles from "./CartItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/reduxStore";
const CartItem = (props) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(0);
  const inputQuantityHandler = (event) => {
    setQuantity(event.target.value);
    dispatch(
      cartActions.updateCart({
        _id: props.product._id,
        quantity: event.target.value,
        price: props.product.price,
      })
    );
  };
  return (
    <tr className="cartRow">
      <td className={styles.nameProduct}>{props.product.name}</td>
      <td className={styles.priceProduct}>
        {props.product.price} <br /> {props.product.currency}
      </td>
      <td className={styles.quantityProduct}>
        <input type="number" onChange={inputQuantityHandler} />
      </td>
      <td className={styles.priceProduct}>
        {(props.product.price * quantity).toFixed(2)}
        <br />
        {props.product.currency}
      </td>
    </tr>
  );
};
export default React.memo(CartItem);
