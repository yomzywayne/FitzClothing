import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAppConfig } from "./redux/appConfigRedux";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import BodyMeasurement from "./pages/BodyMeasurement";
import NavigationBar from "./components/Navbar";
import Announcement from "./components/Announcement";
import Newsletter from "./components/Newsletter";
import Admin from "./admin/Admin";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Product3D from "./pages/Product3D";
import Cart from "./pages/Cart";
import { useEffect } from "react";
import PaymentSuccessfull from "./pages/PaymentSuccessfull";
import appConfig from "./appConfig.json";


function App() {  
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Version", process.env.REACT_APP_VERSION);
    console.log("SERVER URL", process.env.REACT_APP_SERVER_URL);
    console.log("appConfig", appConfig);
    dispatch(setAppConfig(appConfig));
  });

  return (
    <BrowserRouter>
      <Announcement />
      <NavigationBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/body-measurement" element={<BodyMeasurement />} />        
        <Route path="/cart" element={<Cart />} />        
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/product3d/:id" element={<Product3D />} /> 
        <Route path="/payment-success" element={<PaymentSuccessfull />} />       
      </Routes>
      <br />
      <br />
      <Newsletter />
      <div style={{padding:'10px', color: 'green', float:'right'}}>
          <span>Environment: {process.env.REACT_APP_ENV}</span>
            &nbsp;|&nbsp;
          <span>Version: {process.env.REACT_APP_VERSION}</span></div>
    </BrowserRouter>
  );
}

export default App;
