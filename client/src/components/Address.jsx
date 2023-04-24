import { useState, useEffect } from "react";
import { Container, Card, Button, Modal, Form } from "react-bootstrap";
import { connect } from "react-redux";
import {useNavigate} from "react-router"
import {useSearchParams} from "react-router-dom";
import axios from "axios";

const mapStateToProps = function (state) {
  return {
    currentUser: state.user.currentUser,    
  };
};

const Address = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [addressId, setAddressId] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    populateFormValues(props.address);
  }, [props.address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/userAddress`,
        formValues
      );
      populateFormValues(res.data);
      setShowModal(false);

      const checkingout = searchParams.get("checkingout");
      if (checkingout) {
        navigate("/cart"); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("handleEditSubmit - addressId", addressId);
      const res = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/userAddress/${addressId}`,
        formValues
      );
      populateFormValues(res.data);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const populateFormValues = (address) => {
    setAddressId(address ? address?._id : "");
    setFormValues({
      userId: props.currentUser._id,
      addressLine1: address ? address?.addressLine1 : "",
      addressLine2: address?.addressLine2 ? address.addressLine2 : "",
      city: address ? address?.city : "",
      postcode: address ? address?.postcode : "",
      country: address ? address?.country : "United Kingdom",
      type: props.addressType,
    });
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditAddress = () => {
    setShowModal(true);
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <div className="text-center">
            <h2>{formValues.type} Address</h2>
            {formValues.addressLine1 ? (
              <div>
                <p>{formValues.addressLine1}</p>
                <p>{formValues.addressLine2}</p>
                <p>
                  {formValues.city}, {formValues.postcode}
                </p>
                <p>{formValues.country}</p>
                <Button variant="primary" onClick={handleEditAddress}>
                  Edit {formValues.type} Address
                </Button>
              </div>
            ) : (
              <Button variant="primary" onClick={handleShowModal}>
                Add {formValues.type} Address
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {formValues.addressLine1 ? "Edit" : "Add"} {formValues.type} Address
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addressId ? handleEditSubmit : handleSubmit}>
            <Form.Group>
              <Form.Label>Address Line 1</Form.Label>
              <Form.Control
                type="text"
                name="addressLine1"
                value={formValues.addressLine1}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address Line 2</Form.Label>
              <Form.Control
                type="text"
                name="addressLine2"
                value={formValues.addressLine2}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formValues.city}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postcode"
                value={formValues.postcode}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Select
                name="country"
                value={formValues.country}
                onChange={handleInputChange}
                required
              >
                <option value="United Kingdom">United Kingdom</option>
              </Form.Select>
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              {formValues.addressLine1 ? "Save Changes" : "Add Address"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default connect(mapStateToProps)(Address);