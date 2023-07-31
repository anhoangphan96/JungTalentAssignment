import styles from "./Cartlist.module.css";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
const Cartlist = () => {
  const [listProduct, setListProduct] = useState([]);
  const getListCart = async () => {
    const response = await fetch(`http://localhost:5000/listproduct`);
    const data = await response.json();
    setListProduct(data);
  };
  useEffect(() => {
    getListCart();
  }, []);
  // Hai hàm quản lý navigate user tới các trang khác nhau khi click vào button

  // JSX trả ra table chứa các sản phẩm theo email user chứa các thông tin sản phẩm
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr className={styles.cartTitle}>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {listProduct.map((product) => {
            return <CartItem product={product} key={product._id} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
export default React.memo(Cartlist);
