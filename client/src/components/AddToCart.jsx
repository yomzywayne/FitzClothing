import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import { addProduct } from "../redux/cartRedux";

const mapStateToProps = function (state) {
  return {
    currentUser: state?.user?.currentUser,
  };
};

const AddToCart = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false); // state for showing/hiding the modal
  const dispatch = useDispatch();

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity((prevQuantity) => prevQuantity - 1);
    } else {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleAddToCartClicked = () => {    
    const updatedProduct = { ...props.product, quantity: quantity };
    dispatch(addProduct(updatedProduct));
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  return (
    <Container className="p-4">
      <Row>        
        <Col md={6} xs={12}>
          <br />
          <center>
            <div>
              <h2>{props.product.title}</h2>
              <p>{props.product.desc}</p>
              <h4>Price: £{props.product.price}</h4>
              <br />
              <h6>Color: {props.product.color}</h6>
              <br />
              
            </div>
          </center>
        </Col>            
        <Col md={6} xs={12}>
            {props.currentUser !== null && (
            <>
                <br />
                <label htmlFor="quantity">Quantity</label>
                <br />
                <div>
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

export default connect(mapStateToProps)(AddToCart);
