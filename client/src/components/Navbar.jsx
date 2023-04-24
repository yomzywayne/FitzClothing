import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Modal,
  Button,
} from "react-bootstrap";
import { BsCart3 } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, connect } from "react-redux";
import { loginSuccess } from "../redux/userRedux";
import { clearCart } from "../redux/cartRedux";
import { addSelectedProduct } from "../redux/selectedProductRedux";

const mapStateToProps = function (state) {
  return {
    currentUser: state.user.currentUser,
    quantity: state.cart.quantity,
  };
};

const NavigationBar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const handleSignOut = () => {
    setShowSignOutModal(true);
  };

  const handleSignOutConfirm = () => {
    dispatch(clearCart());
    dispatch(loginSuccess(null));
    dispatch(addSelectedProduct(null));
    setShowSignOutModal(false);
    navigate("/");
  };

  const handleSignOutCancel = () => {
    setShowSignOutModal(false);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            FITZ...
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {props.currentUser !== null && (
                <NavDropdown title="Profile" id="basic-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/account">
                    Account
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/body-measurement">
                    {props?.currentUser?.measurements
                      ? "Edit Body Measurement"
                      : "Add Body Measurement"}
                  </NavDropdown.Item>
                  {props.currentUser.isAdmin && (
                    <>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={NavLink} to="/admin">
                        ADMIN
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
              )}
            </Nav>
            <Nav>
              {props.currentUser === null && (
                <Nav.Link as={NavLink} to="/register">
                  REGISTER
                </Nav.Link>
              )}
              {props.currentUser === null && (
                <Nav.Link
                  as={NavLink}
                  to="/signin"
                  onClick={() => {
                    navigate("signin");
                  }}
                >
                  SIGN IN
                </Nav.Link>
              )}
              {props.currentUser !== null && (
                <Nav.Link onClick={handleSignOut}>SIGN OUT </Nav.Link>
              )}
              {props.currentUser !== null && (
                <>
                  <Nav.Link as={NavLink} to="/cart">
                    <BsCart3 size={20} />
                  </Nav.Link>
                  <span
                    style={{
                      color: "white",
                      marginLeft: "-3px",
                      borderRadius: "50%",
                      backgroundColor: "#007bff",
                      width: "1.3em",
                      height: "1.3em",
                      display: "inline-block",
                      fontSize: "0.9em",
                      textAlign: "center",
                      lineHeight: "1.3em",
                    }}
                  >
                    {props.quantity}
                  </span>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={showSignOutModal} onHide={handleSignOutCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Sign Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to sign out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSignOutCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSignOutConfirm}>
            Sign Out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps)(NavigationBar);
