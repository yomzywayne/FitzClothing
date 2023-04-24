import { useState, useEffect } from "react";
import { Container, Card, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../redux/userRedux";
import Address from "../components/Address";


const mapStateToProps = function (state) {
  return {
    currentUser: state.user.currentUser,
  };
};

const Account = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [registeredAddress, setRegisteredAddress] = useState(null);
  const [shippingAddresses, setShippingAddresses] = useState([]);

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

  const handleSignOut = () => {
    setShowModal(true);
  };

  const handleConfirmSignOut = () => {
    setShowModal(false);
    dispatch(loginSuccess(null));
    navigate("/");
  };

  const handleCancelSignOut = () => {
    setShowModal(false);
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <div className="text-center">
            {props.currentUser.img && (
              <img
                src={props.currentUser.img}
                alt="Profile"
                className="mb-3 rounded-circle"
                style={{ width: "10rem", height: "10rem" }}
              />
            )}
            <Button
              variant="primary"
              onClick={handleSignOut}
              className="position-absolute top-0 end-0 mt-3 me-3"
            >
              Sign Out
            </Button>
            <h2>
              {props.currentUser.firstname} {props.currentUser.lastname}
            </h2>
            <p>@{props.currentUser.username}</p>
            <p>{props.currentUser.email}</p>
          </div>
          <Address addressType={"Registered"} address={registeredAddress} />
          {shippingAddresses.length === 0 ? (
            <Address addressType={"Shipping"} address={null} />
          ) : (
            shippingAddresses.map((address) => (
              <Address addressType={"Shipping"} address={address} />
            ))
          )}
          <br />
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleCancelSignOut}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Sign Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to sign out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelSignOut}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirmSignOut}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default connect(mapStateToProps)(Account);