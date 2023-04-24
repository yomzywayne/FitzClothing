import { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userRedux";


const Register = (props) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    img: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users`,
        { ...formData, isAdmin: false } // Set isAdmin to false automatically
      );

      console.log("Register", response.data);
      dispatch(loginSuccess(response.data));

      setFormData({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        img: "",
      }); // Clear form data
      setError(null); // Clear error message
      setSuccess("Successfully registered!");
      setTimeout(() => {
        navigate("/body-measurement"); // Redirect to home page after 1 seconds
      }, 1000);
    } catch (err) {
      console.error(err);
      setSuccess(null); // Clear success message
      setError("Registration failed.");
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Registration Form</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formImg">
              <Form.Label>Profile Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                name="img"
                value={formData.img}
                onChange={handleChange}
              />
            </Form.Group>
            <br />
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>

          <div className="mt-3">
            <p>
              Already have an account? <Link to="/signin">Sign in</Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;