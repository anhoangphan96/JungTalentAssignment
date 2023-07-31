import styles from "./OrderForm.module.css";
import CartList from "./CartList";
import CartTotalPrice from "./CartTotalPrice";
import { useState } from "react";
import { useSelector } from "react-redux";

const OrderForm = () => {
  const listCart = useSelector((state) => state.cart.listItem);
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [postcode, setPostcode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [line1, setLine1] = useState("");
  const firstnameHandler = (event) => {
    setFirstname(event.target.value);
  };
  const surnameHandler = (event) => {
    setSurname(event.target.value);
  };
  const phoneHandler = (event) => {
    setPhone(event.target.value);
  };
  const countryCodeHandler = (event) => {
    setCountryCode(event.target.value);
  };
  const postcodeHandler = (event) => {
    setPostcode(event.target.value);
  };
  const suburbHandler = (event) => {
    setSuburb(event.target.value);
  };
  const line1Handler = (event) => {
    setLine1(event.target.value);
  };
  const postDataCreateOrder = async () => {
    const response = await fetch(`http://localhost:5000/createorder`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: firstname,
        surname: surname,
        phone: phone,
        countryCode: countryCode,
        postcode: postcode,
        suburb: suburb,
        line1: line1,
        listCart: listCart,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      window.open(`${data.checkoutUrl}`, "_blank");
    }
  };

  const checkoutHandler = () => {
    postDataCreateOrder();
  };
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <form className={styles.orderForm}>
            <h2>Order Information</h2>
            <input
              type="text"
              id="firstname"
              placeholder="Firstname"
              onChange={firstnameHandler}
              value={firstname}
            />
            <input
              type="text"
              id="surname"
              placeholder="Surname"
              onChange={surnameHandler}
              value={surname}
            />
            <input
              type="text"
              id="phone"
              placeholder="Phone number"
              onChange={phoneHandler}
              value={phone}
            />
            <input
              type="text"
              id="countryCode"
              placeholder="CountryCode (2 digit, ex: IT)"
              onChange={countryCodeHandler}
              value={countryCode}
            />
            <input
              type="text"
              id="postcode"
              placeholder="Postcode"
              onChange={postcodeHandler}
              value={postcode}
            />
            <input
              type="text"
              id="suburb"
              placeholder="District"
              onChange={suburbHandler}
              value={suburb}
            />
            <input
              type="text"
              id="line1"
              placeholder="Address"
              onChange={line1Handler}
              value={line1}
            />
          </form>
        </div>
      </div>
      <div className={styles.cartContainer}>
        <h3>ITEMS</h3>
        <div className={styles.cartInfor}>
          <CartList></CartList>
          <CartTotalPrice></CartTotalPrice>
        </div>
        <div className={styles.navigate}>
          <button className={styles.btnbackToShop}>Continue shopping</button>
          <button onClick={checkoutHandler}>Create Order</button>
        </div>
      </div>
    </div>
  );
};
export default OrderForm;
