import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Button, Col, Container, Image, Row, Modal } from "react-bootstrap";
import { addProduct } from "../redux/cartRedux";
import axios from "axios";

const mapStateToProps = function (state) {
  return {
    currentUser: state?.user?.currentUser,
  };
};

const Product = (props) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false); // state for showing/hiding the modal
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity((prevQuantity) => prevQuantity - 1);
    } else {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleAddToCartClicked = () => {
    const updatedProduct = { ...product, quantity: quantity };
    dispatch(addProduct(updatedProduct));
    setShowModal(true); // show the modal when the button is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // hide the modal when it's closed
  };

  return (
    <Container className="p-5">
      <Row>
        <Col md={6} xs={12}>
          <Image
            src={product.img}
            alt={product.title}
            fluid
            style={{ width: "400px", height: "400px" }}
          />
        </Col>
        <Col md={4} xs={12}>
          <br />
          <br />
          <center>
            <div className="border border-1 border-secondary p-4">
              <h2>{product.title}</h2>
              <p>{product.desc}</p>
              <h4>Price: £{product.price}</h4>
              <br />
              <h6>Color: {product.color}</h6>
              <br />
              {props.currentUser !== null && (
                <>
                  <label htmlFor="quantity">Quantity</label>
                  <div className="d-flex justify-content-center align-items-center">
                    <FaMinus onClick={() => handleQuantity("dec")} />
                    <span className="mx-2">{quantity}</span>
                    <FaPlus onClick={() => handleQuantity("inc")} />
                  </div>
                  <br />

                  <Button variant="primary" onClick={handleAddToCartClicked}>
                    Add to Cart
                  </Button>
                </>
              )}
            </div>
          </center>
        </Col>
      </Row>
      {/* The Modal component from react-bootstrap */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Product added to cart successfully</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default connect(mapStateToProps)(Product);
