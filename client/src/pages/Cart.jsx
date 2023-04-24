import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { removeProduct, clearCart } from "../redux/cartRedux";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { addSelectedProduct } from "../redux/selectedProductRedux";

const mapStateToProps = function (state) {
  return {
    cartItems: state?.cart?.products,
    quantity: state.cart.quantity,
    currentUser: state.user.currentUser,
  };
};

const KEY = process.env.REACT_APP_STRIPE;

const Cart = (props) => {
  const dispatch = useDispatch();
  const [stripeToken, setStripeToken] = useState(null);
  const [registeredAddress, setRegisteredAddress] = useState(null);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAddress = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/userAddress/${props.currentUser._id}`
      );

      res.data.forEach((address) => {
        if (address?.type === "Registered") {
          setRegisteredAddress(address);
        } else if (address?.type === "Shipping") {
          setShippingAddresses((prevShippingAddresses) => [
            ...prevShippingAddresses,
            address,
          ]);
        }
      });
    };
    getAddress();
  }, []);

  const redirectToAddressPage = () => {
    navigate("/account?checkingout=true");
  };

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleToken = (token) => {
    addOrder(token);
  };

  const ShowProductIn3D = async (item) => {
    try {      
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/clothemeasurements/${item._id}`);  
      const product = { ...item, measurements: res.data };
      dispatch(addSelectedProduct(product));      
      navigate(`/product3d/${item._id}`);
    } 
    catch (error) {
      console.error(error);
    }
  }

  const addOrder = async (token) => {
    const newOrderId = generateOrderNumber();
    localStorage.setItem("orderId", newOrderId);

    const products = [];
    props.cartItems.forEach((item) => {
      products.push({
        productId: item._id,
        unitPrice: item.price,
        quantity: item.quantity,
      });
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: props.currentUser._id,
          addressId: shippingAddresses[0]._id,
          cardId: token.card.id,
          cardLast4Digits: Number(token.card.last4),
          orderNumber: newOrderId,
          products: products,
        }),
      });

      const order = await response.json();
      console.log("Order added:", order);
      navigate("/payment-success");
    } catch (error) {
      console.error(error);
    }
  };

  function generateOrderNumber() {
    const min = 1111;
    const max = 9999;
    let value = (Math.random() * (max - min + 1)) + min;
    const randomNumber = Number.parseFloat(value).toFixed(0);

    return (new Date()).toISOString().replace(/-/g, "").replace(/:/g, "").replace("T", "-").replace("Z", "").replace(":", "").replace(".", "-") + randomNumber;
}

  const totalPrice =
    props.cartItems === undefined
      ? 0
      : props.cartItems.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        );

  return (
    <Container className="p-5">
      <Row>
        <Col md={4}>
          <h2>Cart Items</h2>
          <br />
          {props.quantity === 0 ? (
            <div>No item in the cart</div>
          ) : (
            props.cartItems.map((item, index) => (
              <div key={`${item._id}-${index}`} className="mb-4">
                <Row>
                  <Col md={4}>
                    <Image
                      src={`${item._id}/${item._id}.jpg`}
                      alt={item.title}
                      fluid
                      style={{ width: "100%", height: "auto" }}
                      onClick={() =>  {   
                        ShowProductIn3D(item);
                      }}
                    />
                  </Col>
                  <Col md={8}>
                    <h5>{item.title}</h5>
                    <p>
                      Price: £{item.price} x Quantity: {item.quantity} = £
                      {(item.price * item.quantity).toLocaleString("en-UK")}
                    </p>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </div>
            ))
          )}
        </Col>
        <Col md={8}>
          <div className="border border-1 border-secondary p-4">
            <Row>
              <Col>
                <h2>Total Price: £{totalPrice.toLocaleString("en-UK")}</h2>
                <br />
                <Button variant="danger" onClick={handleClearCart}>
                  Clear Cart
                </Button>{" "}
                {props.quantity === 0 || shippingAddresses.length === 0 ? (
                  <Button variant="secondary" disabled>
                    Checkout
                  </Button>
                ) : (
                  <StripeCheckout
                    name="FITZ..."
                    currency="GBP"
                    email={props.currentUser.email}
                    billingAddress={false}
                    shippingAddress={false}
                    description={`Your total is £${totalPrice}`}
                    amount={totalPrice * 100}
                    token={handleToken}
                    stripeKey={KEY}
                  >
                    <Button variant="success">Checkout</Button>
                  </StripeCheckout>
                )}
              </Col>
              <Col>
                <h4>
                  <span>Shipping Address </span>
                  {shippingAddresses.length === 0 && (
                    <Button variant="primary" onClick={redirectToAddressPage}>
                      Add
                    </Button>
                  )}
                </h4>
                <div>
                  <span>
                    <strong>Address Line 1: </strong>
                  </span>
                  <span>
                    {shippingAddresses.length > 0
                      ? shippingAddresses[0].addressLine1
                      : ""}
                  </span>
                </div>
                <div>
                  <span>
                    <strong>Address Line 2: </strong>
                  </span>
                  <span>
                    {shippingAddresses.length > 0
                      ? shippingAddresses[0].addressLine2
                      : ""}
                  </span>
                </div>
                <div>
                  <span>
                    <strong>City: </strong>
                  </span>
                  <span>
                    {shippingAddresses.length > 0
                      ? shippingAddresses[0].city
                      : ""}
                  </span>
                </div>
                <div>
                  <span>
                    <strong>Post Code: </strong>
                  </span>
                  <span>
                    {shippingAddresses.length > 0
                      ? shippingAddresses[0].postcode
                      : ""}
                  </span>
                </div>
                <div>
                  <span>
                    <strong>County: </strong>
                  </span>
                  <span>
                    {shippingAddresses.length > 0
                      ? shippingAddresses[0].country
                      : ""}
                  </span>
                </div>
                <br />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default connect(mapStateToProps)(Cart);