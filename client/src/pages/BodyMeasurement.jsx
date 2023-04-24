import React, { useState, useEffect } from "react";
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import {useNavigate} from "react-router";
import { Form, Button, Col, Image, Modal } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";
import { connect, useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userRedux";
import * as yup from "yup";

const styles = {
  measurement: {paddingBottom:'10px'},
  errorText:  {color: "red", fontSize: "12px"}
}

const mapStateToProps = function (state) {
  return {
    currentUser: state.user.currentUser,
    currentProduct: state.selectedProduct.currentProduct,
  };
};

const BodyMeasurement = (props) => {

  console.log("props.currentUser:", props.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [head, setHead] = useState("");
  const [neck, setNeck] = useState("");
  const [shoulder, setShoulder] = useState("");
  const [bust, setBust] = useState("");
  const [stomach, setStomach] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [thigh, setThigh] = useState("");
  const [ankle, setAnkle] = useState("");
  const [legHeight, setLegHeight] = useState("");
  const [overallHeight, setOverallHeight] = useState("");
  const [armLength, setArmLength] = useState("");
  const [skirtLength, setSkirtLength] = useState("");
  const [trouserLength, setTrouserLength] = useState("");
  const [gender, setGender] = useState("");
  const [inReadOnlyMode, setInReadOnlyMode] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setHead(props?.currentUser?.measurements?.head || "");
    setNeck(props?.currentUser?.measurements?.neck || "");
    setShoulder(props?.currentUser?.measurements?.shoulder || "");
    setBust(props?.currentUser?.measurements?.bust || "");
    setStomach(props?.currentUser?.measurements?.stomach || "");
    setWaist(props?.currentUser?.measurements?.waist || "");
    setHip(props?.currentUser?.measurements?.hip || "");
    setThigh(props?.currentUser?.measurements?.thigh || "");
    setAnkle(props?.currentUser?.measurements?.ankle || "");
    setLegHeight(props?.currentUser?.measurements?.legHeight || "");
    setOverallHeight(props?.currentUser?.measurements?.overallHeight || "");
    setArmLength(props?.currentUser?.measurements?.armLength || "");
    setSkirtLength(props?.currentUser?.measurements?.skirtLength || "");
    setTrouserLength(props?.currentUser?.measurements?.trouserLength || "");
    setGender(props?.currentUser?.measurements?.gender || "female");
    setInReadOnlyMode(props?.currentUser?.measurements ? true : false);
  }, []);

  const requiredErroText = "Required";
  const typeErrorText = "Must be a number";
  const minErrorText = "Must be a greater or equal to 1";
  const maxErrorText = "Must be a less than or equal to 99";
  const yupSchema = yup.object().shape({
    head: yup
      .number()
      .min(1, minErrorText)
      .max(99, maxErrorText)
      .typeError(typeErrorText)
      .required(requiredErroText),
    neck: yup
      .number()
      .min(1, minErrorText)
      .max(99, maxErrorText)
      .typeError(typeErrorText)
      .required(requiredErroText),
    shoulder: yup
      .number()
      .min(1, minErrorText)
      .max(99, maxErrorText)
      .typeError(typeErrorText)
      .required(requiredErroText),
    bust: yup
      .number()
      .min(1, minErrorText)
      .max(99, maxErrorText)
      .typeError(typeErrorText)
      .required(requiredErroText),
    stomach: yup
      .number()
      .min(1, minErrorText)
      .max(99, maxErrorText)
      .typeError(typeErrorText)
      .required(requiredErroText),
    waist: yup
      .number()
      .min(1, minErrorText)
      .max(99, maxErrorText)
      .typeError(typeErrorText)
      .required(requiredErroText),
    hip: yup
      .number()
      .min(1, minErrorText)
      .max(99, maxErrorText)
      .typeError(typeErrorText)
      .required(requiredErroText),
    thigh: yup
      .number()
      .min(1, minErrorText)
      .max(99, maxErrorText)
      .typeError(typeErrorText)
      .required(requiredErroText),
    ankle: yup
      .number()
      .min(1, minErrorText)
      .max(99, maxErrorText)
      .typeError(typeErrorText)
      .required(requiredErroText),
    legHeight: yup
      .number()
      .min(1, minErrorText)
      .max(99, maxErrorText)
      .typeError(typeErrorText)
      .required(requiredErroText),
    overallHeight: yup
      .number()
      .min(100, "Must be a greater or equal to 100")
      .max(250, "Must be a less than or equal to 250")
      .typeError(typeErrorText)
      .required(requiredErroText),
    armLength: yup
      .number()
      .min(1, minErrorText)
      .max(99, maxErrorText)
      .typeError(typeErrorText)
      .required(requiredErroText),
    skirtLength: yup
      .number()
      .min(1, minErrorText)
      .max(99, maxErrorText)
      .typeError(typeErrorText)
      .required(requiredErroText),
    trouserLength: yup
      .number()
      .min(1, minErrorText)
      .max(99, maxErrorText)
      .typeError(typeErrorText)
      .required(requiredErroText),
    gender: yup
      .string()
      .required("Required"),
  });

  const validateForm = async (fieldValues) => {
    
    const isFormValid = await yupSchema.isValid(fieldValues);
    if (isFormValid) {
      return true;
    }

    const keys = Object.keys(fieldValues);
    for (let key of keys) {
      let newFieldError = "";
      try {
        await yupSchema.validateAt(key, fieldValues);        
      } catch (error) {
        const splittedErrors = String(error).split(" at Object.createError");
        newFieldError = splittedErrors[0].replace("ValidationError: ", "");
      }

      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        [key]: newFieldError }));
    }
    return false;
  };

  const handleCloseModal = () => {
    setSuccessModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userId = props.currentUser !== null ? props.currentUser._id : "";
    let measurementData = {
      head,
      neck,
      shoulder,
      bust,
      stomach,
      waist,
      hip,
      thigh,
      ankle,
      legHeight,
      overallHeight,
      armLength,
      skirtLength,
      trouserLength,
      gender
    };

    const isFormValid = await validateForm(measurementData);
    if (!isFormValid) {
      return;
    }

    measurementData.userId = userId;
    try {
      let userMeasuermentResponse = null;
      if (props.currentUser.measurements === null) {         
        console.log("measurementData:", measurementData);       
        userMeasuermentResponse = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/usermeasurements`,
          measurementData
        );
      } else {        
        measurementData.userId = userId;   
        
        console.log("measurementData:", measurementData);
        userMeasuermentResponse = await axios.patch(
          `${process.env.REACT_APP_SERVER_URL}/usermeasurements/${props.currentUser.measurements._id}`,
          measurementData
        );
      }

      console.log(
        "userMeasuermentResponse.data:",
        userMeasuermentResponse.data
      );
      const userInfo = {
        ...props.currentUser,
        measurements: userMeasuermentResponse.data,
      };

      dispatch(loginSuccess(userInfo));
      setSuccessModal(true);
      setInReadOnlyMode(true);

      const productId = searchParams.get("productid");
      const comparingMeasurements = searchParams.get("comparingmeasurements");
      if (comparingMeasurements && productId) {
        navigate(`/product3d/${productId}`);
      }
    } catch (error) {
      console.log("Error occured while saving body measurements", error);
      alert("Failed to save body measurements!");
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    validateForm({gender:event.target.value});
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-4">
          <Form.Group as={Col} controlId="formGridGender">
            <Form.Label>Select Your Gender</Form.Label>
            <Form.Control
              as="select"
              onChange={handleGenderChange}
              value={gender}
            >
              <option value=""></option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </Form.Control>
            <span style={styles.errorText}>
              {formErrors.gender && formErrors.gender}
            </span>
          </Form.Group>
          {gender === "female" ? (
            <Image
              className="row mt-3"
              src="https://i.ibb.co/jgQ9f95/female-measurement.jpg"
              alt="female placeholder"
              //height="90%"
              //width="100%"
            />
          ) 
          : gender === "male" ? (
            <Image
              className="row mt-3"
              src="https://i.ibb.co/5kyCSD1/male-measurement.jpg"
              alt="male placeholder"
              //height="90%"
              //width="100%"
            />
          ): 
          (
           <></>
          )}
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white text-center">
              <h3>
                <BsFillPersonFill />{" "}
                {props.currentUser.measurements
                  ? "Edit Your Body Measurements"
                  : "Add Your Body Measurements"}
              </h3>
            </div>
            <br />
            <center
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "20px",
              }}
            >
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
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Save Measurements
                </Button>
              )}
            </center>
            <div className="card-body">
              <Form>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group controlId="formHead" style={styles.measurement}>
                      <Form.Label>Head (cm)</Form.Label>
                      <Form.Control
                        name="head"
                        type="number"
                        step="0.01"
                        min="1"
                        max="99"
                        placeholder="Enter head measurement"
                        value={head}
                        onChange={(event) => {
                          setHead(event.target.value);
                          validateForm({head:event.target.value});
                        }}
                        readOnly={inReadOnlyMode}
                        required
                      />
                      <span style={styles.errorText}>
                        {formErrors.head && formErrors.head}
                      </span>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="formNeck" style={styles.measurement}>
                      <Form.Label>Neck (cm)</Form.Label>
                      <Form.Control
                        name="neck"
                        type="number"
                        step="0.01"
                        min="1"
                        max="99"
                        placeholder="Enter neck measurement"
                        value={neck}
                        onChange={(event) => {
                          setNeck(event.target.value);
                          validateForm({neck:event.target.value});
                        }}
                        readOnly={inReadOnlyMode}
                        required
                      />
                      <span style={styles.errorText}>
                        {formErrors.neck && formErrors.neck}
                      </span>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group controlId="formShoulder" style={styles.measurement}>
                      <Form.Label>Shoulder (cm)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        min="1"
                        max="99"
                        placeholder="Enter shoulder measurement"
                        value={shoulder}
                        onChange={(event) => {
                          setShoulder(event.target.value);
                          validateForm({shoulder:event.target.value});
                        }}
                        readOnly={inReadOnlyMode}
                        required
                      />
                      <span style={styles.errorText}>
                        {formErrors.shoulder && formErrors.shoulder}
                      </span>
                    </Form.Group>
                  </div>
                  <br />
                  <div className="col-md-6">
                    <Form.Group controlId="formBust" style={styles.measurement}>
                      <Form.Label>Chest/ Bust (cm)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        min="1"
                        max="99"
                        placeholder="Enter bust measurement"
                        value={bust}
                        onChange={(event) => {
                          setBust(event.target.value);
                          validateForm({bust:event.target.value});
                        }}
                        readOnly={inReadOnlyMode}
                        required
                      />
                      <span style={styles.errorText}>
                        {formErrors.bust && formErrors.bust}
                      </span>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group controlId="formStomach" style={styles.measurement}>
                      <Form.Label>Stomach (cm)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        min="1"
                        max="99"
                        placeholder="Enter stomach measurement"
                        value={stomach}
                        onChange={(event) => {
                          setStomach(event.target.value);
                          validateForm({stomach:event.target.value});
                        }}
                        readOnly={inReadOnlyMode}
                        required
                      />
                      <span style={styles.errorText}>
                        {formErrors.stomach && formErrors.stomach}
                      </span>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="formWaist" style={styles.measurement}>
                      <Form.Label>Waist (cm)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        min="1"
                        max="99"
                        placeholder="Enter waist measurement"
                        value={waist}
                        onChange={(event) => {
                          setWaist(event.target.value);
                          validateForm({waist:event.target.value});
                        }}
                        readOnly={inReadOnlyMode}
                        required
                      />
                      <span style={styles.errorText}>
                        {formErrors.waist && formErrors.waist}
                      </span>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group controlId="formHip">
                      <Form.Label>Hip (cm)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        min="1"
                        max="99"
                        placeholder="Enter hip measurement"
                        value={hip}
                        onChange={(event) => {
                          setHip(event.target.value);
                          validateForm({hip:event.target.value});
                        }}
                        readOnly={inReadOnlyMode}
                        required
                      />
                      <span style={styles.errorText}>
                        {formErrors.hip && formErrors.hip}
                      </span>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="formThigh" style={styles.measurement}>
                      <Form.Label>Thigh (cm)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        min="1"
                        max="99"
                        placeholder="Enter thigh measurement"
                        value={thigh}
                        onChange={(event) => {
                          setThigh(event.target.value);
                          validateForm({thigh:event.target.value});
                        }}
                        readOnly={inReadOnlyMode}
                        required
                      />
                      <span style={styles.errorText}>
                        {formErrors.thigh && formErrors.thigh}
                      </span>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group controlId="formAnkle" style={styles.measurement}>
                      <Form.Label>Ankle (cm)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        min="1"
                        max="99"
                        placeholder="Enter ankle measurement"
                        value={ankle}
                        onChange={(event) => {
                          setAnkle(event.target.value);
                          validateForm({ankle:event.target.value});
                        }}
                        readOnly={inReadOnlyMode}
                        required
                      />
                      <span style={styles.errorText}>
                        {formErrors.ankle && formErrors.ankle}
                      </span>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="formLegHeight" style={styles.measurement}>
                      <Form.Label>Leg Height (cm)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        min="1"
                        max="99"
                        placeholder="Enter leg height measurement"
                        value={legHeight}
                        onChange={(event) => {
                          setLegHeight(event.target.value);
                          validateForm({legHeight:event.target.value});
                        }}
                        readOnly={inReadOnlyMode}
                        required
                      />
                      <span style={styles.errorText}>
                        {formErrors.legHeight && formErrors.legHeight}
                      </span>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group controlId="formOverallHeight" style={styles.measurement}>
                      <Form.Label>Overall Height (cm)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        min="100"
                        max="250"
                        placeholder="Enter overall height measurement"
                        value={overallHeight}
                        onChange={(event) => {
                          setOverallHeight(event.target.value);
                          validateForm({overallHeight:event.target.value});
                        }}
                        readOnly={inReadOnlyMode}
                        required
                      />
                      <span style={styles.errorText}>
                        {formErrors.overallHeight && formErrors.overallHeight}
                      </span>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="formArmLength" style={styles.measurement}>
                      <Form.Label>Arm Length (cm)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        min="1"
                        max="99"
                        placeholder="Enter arm length measurement"
                        value={armLength}
                        onChange={(event) => {
                          setArmLength(event.target.value);
                          validateForm({armLength:event.target.value});
                        }}
                        readOnly={inReadOnlyMode}
                        required
                      />
                      <span style={styles.errorText}>
                        {formErrors.armLength && formErrors.armLength}
                      </span>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group controlId="formSkirtLength" style={styles.measurement}>
                      <Form.Label>Skirt Length (cm)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        min="1"
                        max="99"
                        placeholder="Enter skirt length measurement"
                        value={skirtLength}
                        onChange={(event) => { 
                          setSkirtLength(event.target.value);
                          validateForm({skirtLength:event.target.value});
                        }}
                        readOnly={inReadOnlyMode}
                        required
                      />
                      <span style={styles.errorText}>
                        {formErrors.skirtLength && formErrors.skirtLength}
                      </span>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="formTrouserLength" style={styles.measurement}>
                      <Form.Label>Trouser Length (cm)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        min="1"
                        max="99"
                        placeholder="Enter trouser length measurement"
                        value={trouserLength}
                        onChange={(event) => {
                          setTrouserLength(event.target.value);
                          validateForm({trouserLength:event.target.value});
                        }}
                        readOnly={inReadOnlyMode}
                        required
                      />
                      <span style={styles.errorText}>
                        {formErrors.trouserLength && formErrors.trouserLength}
                      </span>
                    </Form.Group>
                  </div>
                </div>
              </Form>
              <br />
              <center
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: "20px",
                }}
              >
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
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Save Measurements
                  </Button>
                )}
              </center>
            </div>
          </div>
        </div>
      </div>
      <Modal show={successModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Body Measurements</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your body measurements saved successfully</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default connect(mapStateToProps)(BodyMeasurement);