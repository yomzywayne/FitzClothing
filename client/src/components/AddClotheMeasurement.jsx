import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";


const AddClotheMeasurement = ({ show, onHide, productType }) => {
  const [measurements, setMeasurements] = useState({});
  const [neck, setNeck] = useState("");
  const [shoulder, setShoulder] = useState("");
  const [bust, setBust] = useState("");
  const [stomach, setStomach] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [thigh, setThigh] = useState("");
  const [overallHeight, setOverallHeight] = useState("");
  const [ankle, setAnkle] = useState("");
  const [legHeight, setLegHeight] = useState("");

  const handleSave = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/${productType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(measurements),
      });
      const data = await response.json();
      console.log(data);
      onHide();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Measurements</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {productType === "trouser" && (
            <>
              <Form.Group controlId="waist">
                <Form.Label>Waist</Form.Label>
                <Form.Control
                  type="number"
                  value={measurements.waist}
                  onChange={(e) =>
                    setMeasurements({ ...measurements, waist: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="hip">
                <Form.Label>Hip</Form.Label>
                <Form.Control
                  type="number"
                  value={measurements.hip}
                  onChange={(e) =>
                    setMeasurements({ ...measurements, hip: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="thigh">
                <Form.Label>Thigh</Form.Label>
                <Form.Control
                  type="number"
                  value={measurements.thigh}
                  onChange={(e) =>
                    setMeasurements({ ...measurements, thigh: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="ankle">
                <Form.Label>Ankle</Form.Label>
                <Form.Control
                  type="number"
                  value={measurements.ankle}
                  onChange={(e) =>
                    setMeasurements({ ...measurements, ankle: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="legHeight">
                <Form.Label>Leg Height</Form.Label>
                <Form.Control
                  type="number"
                  value={legHeight}
                  onChange={(e) => setLegHeight(e.target.value)}
                />
              </Form.Group>
            </>
          )}
          {productType === "gown" && (
            <>
              <Form.Group controlId="neck">
                <Form.Label>Neck</Form.Label>
                <Form.Control
                  type="number"
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="shoulder">
                <Form.Label>Shoulder</Form.Label>
                <Form.Control
                  type="number"
                  value={shoulder}
                  onChange={(e) => setShoulder(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="bust">
                <Form.Label>Bust</Form.Label>
                <Form.Control
                  type="number"
                  value={bust}
                  onChange={(e) => setBust(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="stomach">
                <Form.Label>Stomach</Form.Label>
                <Form.Control
                  type="number"
                  value={stomach}
                  onChange={(e) => setStomach(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="waist">
                <Form.Label>Waist</Form.Label>
                <Form.Control
                  type="number"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="hip">
                <Form.Label>Hip</Form.Label>
                <Form.Control
                  type="number"
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="thigh">
                <Form.Label>Thigh</Form.Label>
                <Form.Control
                  type="number"
                  value={thigh}
                  onChange={(e) => setThigh(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="overallHeight">
                <Form.Label>Overall Height</Form.Label>
                <Form.Control
                  type="number"
                  value={overallHeight}
                  onChange={(e) => setOverallHeight(e.target.value)}
                />
              </Form.Group>
            </>
          )}
          {productType === "shirt" && (
            <>
              <Form.Group controlId="neck">
                <Form.Label>Neck</Form.Label>
                <Form.Control
                  type="number"
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="shoulder">
                <Form.Label>Shoulder</Form.Label>
                <Form.Control
                  type="number"
                  value={shoulder}
                  onChange={(e) => setShoulder(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="bust">
                <Form.Label>Bust</Form.Label>
                <Form.Control
                  type="number"
                  value={bust}
                  onChange={(e) => setBust(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="stomach">
                <Form.Label>Stomach</Form.Label>
                <Form.Control
                  type="number"
                  value={stomach}
                  onChange={(e) => setStomach(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="waist">
                <Form.Label>Waist</Form.Label>
                <Form.Control
                  type="number"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="hip">
                <Form.Label>Hip</Form.Label>
                <Form.Control
                  type="number"
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="thigh">
                <Form.Label>Thigh</Form.Label>
                <Form.Control
                  type="number"
                  value={thigh}
                  onChange={(e) => setThigh(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="ankle">
                <Form.Label>Ankle</Form.Label>
                <Form.Control
                  type="number"
                  value={ankle}
                  onChange={(e) => setAnkle(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleSave}>
                Add Measurement
              </Button>
            </>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddClotheMeasurement;