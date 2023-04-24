import { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userRedux";


const SignIn = (props) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

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
      console.log("SERVER URL:", process.env.REACT_APP_SERVER_URL);
      
      const userResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/login`,
        formData
      );

      console.log("userResponse.data", userResponse.data._id);
      
      let measurementsResponse = {};
      try {
        measurementsResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/usermeasurements/${userResponse.data._id}`
        );
      } catch (err) {
        console.log("ERROR OCCURRED:", err);

        if (err?.response?.data?.message === "User measurement not found") {
          measurementsResponse.data = null;
        } else {
          console.error("Error occured while fetching measurements", err);
          alert("Error occured while fetching measurements", err);
        }
      }

      const userInfo = {
        ...userResponse.data,
        measurements: measurementsResponse.data || null,
      };
      
      console.log("userInfo:", userInfo);
      dispatch(loginSuccess(userInfo));
      setFormData({ username: "", password: "" });
      setError(null);
      setSuccess("Successfully logged in!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error(err);
      setFormData({ username: "", password: "" }); // Clear form data
      setSuccess(null); // Clear success message
      setError("Invalid username or password.");
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
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

            <br />
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                Sign In
              </Button>
            </div>
          </Form>

          <div className="mt-3">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignIn;