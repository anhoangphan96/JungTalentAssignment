const ScalapayWidget = (props) => {
  return (
    <>
      <div id="price-container">{props.totalPrice} EUR</div>
      <scalapay-widget
        frequency-number="30"
        number-of-installments="3"
        hide="false"
        hide-price="false"
        min="5"
        max="1500"
        amount-selectors='["#price-container"]'
        currency-position="before"
        currency-display="symbol"
        logo-size="100"
        theme="primary"
        locale="en"
        show-title="true"
      ></scalapay-widget>
    </>
  );
};
export default ScalapayWidget;
