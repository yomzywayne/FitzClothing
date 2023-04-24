import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import { clearCart } from "../redux/cartRedux";
import { v4 as uuidv4 } from "uuid";

const mapStateToProps = function (state) {
  return {
    cartItems: state?.cart?.products,
    quantity: state.cart.quantity,
    dispatch: state.dispatch,
    currentUser: state.user.currentUser,
  };
};

const PaymentSuccessfull = (props) => {
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState("");

  const removeCart = () => {
    dispatch(clearCart());
  };

  const totalPrice =
    props.cartItems === undefined
      ? 0
      : props.cartItems.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        );

  useEffect(() => {
    const orderIdFromStorage = localStorage.getItem("orderId");
    if (orderIdFromStorage) {
      setOrderId(orderIdFromStorage);
    } else {
      const newOrderId = uuidv4();
      setOrderId(newOrderId);
      localStorage.setItem("orderId", newOrderId);
    }

    return () => {
      removeCart();
      localStorage.removeItem("orderId");
    };
  }, []);

  if (props.quantity === 0) {
    window.location.href = "/";
    return null;
  }

  return (
    <Container className="p-5">
      <center>
        <h1>Payment Successfull</h1>
      </center>
      <br />
      <Row>
        <Col className="border border-1 border-secondary" md={4}>
          {props.cartItems.map((item, index) => (
            <div key={`${item._id}-${index}`} className="mb-4">
              <Row>
                <Col md={4}>
                  <Image
                    src={`/${item._id}/${item._id}.jpg`}
                    alt={item.title}
                    fluid
                    style={{ width: "100%", height: "auto" }}
                  />
                </Col>
                <Col md={8}>
                  <h5>{item.title}</h5>
                  <p>
                    Price: £{item.price} <br /> Quantity: {item.quantity} <br />{" "}
                    Total Price: £{item.price * item.quantity}
                  </p>
                </Col>
              </Row>
            </div>
          ))}
          <div>
            <hr />
            <h4>Total Price: £{totalPrice}</h4>
          </div>
        </Col>
        <Col md={8}>
          <div className="border border-1 border-secondary p-4">
            <h4>Your order was placed successfully!</h4>
            <p>Order number: {orderId}</p>
            <p>
              Thank you for your purchase. We will process your order and send
              you a confirmation email shortly.
            </p>
            <Link to="/">Return to Home Page</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default connect(mapStateToProps)(PaymentSuccessfull);
