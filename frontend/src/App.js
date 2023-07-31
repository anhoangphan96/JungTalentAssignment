import logo from "./logo.svg";
import "./App.css";
import OrderForm from "./Components/OrderForm";
import MainNavigation from "./Components/MainNavigation";
import { Provider } from "react-redux";
import store from "./store/reduxStore";
function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
      <OrderForm></OrderForm>
    </Provider>
  );
}

export default App;
