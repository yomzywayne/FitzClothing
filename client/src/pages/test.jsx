import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Col, Image } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";
import { store } from "../redux/store";
import { connect } from "react-redux";

const BodyMeasurement = (props) => {
  const [head, setHead] = useState("");
  const [neck, setNeck] = useState("");
  const [gender, setGender] = useState("female");
  const [inReadOnlyMode, setInReadOnlyMode] = useState(true);

  const mapStateToProps = function (state) {
    return {
      currentUser: state.user.currentUser,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      const userId = currentUser !== null ? props.currentUser._id : "";
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/usermeasurements/${userId}`);
      const measurementData = response.data;
      if (measurementData) {
        setHead(measurementData.head || "");
        setNeck(measurementData.neck || "");
        setGender(measurementData.gender || "female");
      }
    };
    fetchData();
  }, [props.currentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userId = props.currentUser !== null ? props.currentUser._id : "";
    const measurementData = { 
      userId,
      head,
      neck,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/usermeasurements/${userId}`,
        measurementData
      );
      alert("Body measurements saved successfully!");
    } catch (error) {
      alert("Failed to save body measurements!");
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-6">
          <Form.Group as={Col} controlId="formGridGender">
            <Form.Label>Select Your Gender</Form.Label>
            <Form.Control
              as="select"
              onChange={handleGenderChange}
              value={gender}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </Form.Control>
          </Form.Group>
          {gender === "female" ? (
            <Image
              className="row mt-3"
              src="https://i.ibb.co/7jDdB4V/white-t-shirt.png"
              alt="female placeholder"
              height="90%"
              width="100%"
            />
          ) : (
            <Image
              className="row mt-3"
              src="https://i.ibb.co/yRc9mFS/Black-long-shirt.png"
              alt="male placeholder"
              height="90%"
              width="100%"
            />
          )}
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white text-center">
              <h3>
                <BsFillPersonFill /> Add Your Body Measurements
              </h3>
            </div>
            <br />
            <center>
              {inReadOnlyMode === true ? (
                <Button
                  variant="primary"
                  onClick={() =>
                    setInReadOnlyMode(
                      (prevInReadOnlyMode) => !prevInReadOnlyMode
                    )
                  }
                >
                  Edit
                </Button>
              ) : (
                <center>
                  <Button variant="primary" type="submit">
                    Save Measurements
                  </Button>
                </center>
              )}
            </center>
            <div className="card-body">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formHead" className="row">
                  <Form.Label column sm={3}>
                    Head (cm)
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="number"
                      step="0.01"
                      min="0"
                      max="99"
                      placeholder="Enter head measurement"
                      value={head}
                      onChange={(event) => setHead(event.target.value)}
                      readOnly={inReadOnlyMode}
                      required
                    />
                  </Col>
                </Form.Group>
                <br />
                <Form.Group controlId="formNeck" className="row">
                  <Form.Label column sm={3}>
                    Neck (cm)
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="number"
                      step="0.01"
                      min="0"
                      max="99"
                      placeholder="Enter neck measurement"
                      value={neck}
                      onChange={(event) => setNeck(event.target.value)}
                      readOnly={inReadOnlyMode}
                      required
                    />
                  </Col>
                </Form.Group>
                <br />
                <center>
                  <Button variant="primary" type="submit">
                    Save Measurements
                  </Button>
                </center>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(BodyMeasurement);