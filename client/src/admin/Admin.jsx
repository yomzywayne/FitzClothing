import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Col,
  Row,
  Card,
  ButtonGroup,
} from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";


const Admin = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState([]);
  const [color, setColor] = useState([]);
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);
  const [clotheType, setClotheType] = useState("");
  const [hasMeasurement, setHasMeasurement] = useState(false);
  const [measurement, setMeasurement] = useState({});

  const [products, setProducts] = useState([]);
  const [clotheTypes, setClotheTypes] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [showMeasurementModal, setShowMeasurementModal] = useState(false);
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [thigh, setThigh] = useState("");
  const [ankle, setAnkle] = useState("");
  const [legHeight, setLegHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [shoulder, setShoulder] = useState("");
  const [bust, setBust] = useState("");
  const [stomach, setStomach] = useState("");
  const [overallHeight, setOverallHeight] = useState("");

  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/products`);
          const products = await response.json();
          setProducts(products);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchClotheTypes = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/clotheTypeRoutes`);
          const clotheTypes = await response.json();
          setClotheTypes(clotheTypes);
        } 
        catch (error) {
          console.error(error);
        }
      };

      fetchProducts();
      fetchClotheTypes();
  }, []);

  const handleAddProduct = async () => {

    console.log("Adding product ...");
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          desc,
          title,
          color,
          price,
          categories,
          clotheType,
          hasMeasurement,
          inStock: inStock === true ? inStock : false,
        }),
      });

      const product = await response.json();
      console.log("product:", product);

      setProducts([...products, product]);
      console.log("product added");

      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProduct = async (product, measurementAdded) => {
    try {

      const body = {
        desc: product ? product.desc : desc,
        title: product ? product.title : title,
        color: product ? product.color : color,
        price: product ? product.price : price,
        inStock: product ? product.inStock : inStock,
        clotheType: product ? product.clotheType : clotheType,
        categories: product ? product.categories : categories,
        hasMeasurement : measurementAdded ? measurementAdded : false,
      };

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/products/${selectedProduct._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            desc: product ? product.desc : desc,
            title: product ? product.title : title,
            color: product ? product.color : color,
            price: product ? product.price : price,
            inStock: product ? product.inStock : inStock,
            clotheType: product ? product.clotheType : clotheType,
            categories: product ? product.categories : categories,
            hasMeasurement : measurementAdded ? measurementAdded : false,
          }),
        }
      );
      const updatedProduct = await response.json();
      const newProducts = products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
      setProducts(newProducts);
      setClotheType(updatedProduct.clotheType);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      if (!selectedProduct || !selectedProduct._id) {
        return;
      }
      await fetch(`${process.env.REACT_APP_SERVER_URL}/products/${selectedProduct._id}`, {
        method: "DELETE",
      });
      const newProducts = products.filter(
        (product) => product._id !== selectedProduct._id
      );
      setProducts(newProducts);
      
      if (selectedProduct.hasMeasurement === true) {
        await fetch(`${process.env.REACT_APP_SERVER_URL}/clothemeasurements/${selectedProduct._id}`, {
          method: "DELETE",
        });
      }
      
      clearProductValues();
      clearMeasurementValues();
      setShowConfirmation(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddMeasurement = async () => {
    try {
      const productMeasurements = await extractProductMeasurement(clotheType, true);
      productMeasurements["productId"] = selectedProduct._id;      
      console.log("productMeasurements:", productMeasurements);

      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/clothemeasurements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productMeasurements)
      });

      const measurements = await response.json();
      setHasMeasurement(true);
      handleEditProduct(selectedProduct, true);
      setSelectedProduct((prevProduct) => ({
        ...prevProduct,
        measurements: measurements,
      }));
      handleCloseMeasurementModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReadMeasurement = async (product) => {
    try {      
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/clothemeasurements/${product._id}`);  
      setWaist(res.data.waist ? res.data.waist : "");
      setHip(res.data.hip ? res.data.hip : "");
      setThigh(res.data.thigh ? res.data.thigh : "");
      setAnkle(res.data.ankle ? res.data.ankle : "");
      setLegHeight(res.data.legHeight ? res.data.legHeight : "");
      setNeck(res.data.neck ? res.data.neck : "");  
      setShoulder(res.data.shoulder ? res.data.shoulder : "");
      setBust(res.data.bust ? res.data.bust : "");
      setStomach(res.data.stomach ? res.data.stomach : "");
      setOverallHeight(res.data.overallHeight ? res.data.overallHeight : "");
      setShowMeasurementModal(true);
      setMeasurement(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleEditMeasurement = async () => {
    
    const productMeasurements = await extractProductMeasurement(clotheType, false);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/clothemeasurements/${selectedProduct._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productMeasurements), 
        }
      );
      
      const updatedMeasurements = await response.json();
      setMeasurement(updatedMeasurements);
      setHasMeasurement(true);
      handleCloseMeasurementModal();

    } catch (error) {
      console.error(error);
    }
  };

  const extractProductMeasurement = async (productClothType) => {
    const productMeasurement = 
      productClothType === "Trouser"
        ? {
            hip,
            thigh,
            waist,
            ankle,
            legHeight,            
          }
        : productClothType === "Gown"
        ? {
            hip,
            neck,
            bust,
            waist,
            thigh,
            stomach,
            shoulder,
            overallHeight,
          }          
        : productClothType === "Shirt" || productClothType === "Blouse"
        ? {
          neck,
          bust,
          shoulder,
          stomach,
          overallHeight,            
          }        
        : {  //Skirt - This need to be validated
            waist,
            thigh,
            hip,
            overallHeight,            
          }
    
    return productMeasurement;
  }

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setDesc(product ? product.desc : "");
    setTitle(product ? product.title : "");
    setColor(product ? product.color : "");
    setPrice(product ? product.price : "");
    setInStock(product ? product.inStock : "");
    setClotheType(product ? product.clotheType : "");
    setCategories(product ? product.categories : "");
    setHasMeasurement(product ? product.hasMeasurement : "");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    clearProductValues();
  };

  const handleCloseMeasurementModal = () => {
    setShowMeasurementModal(false);
    clearMeasurementValues();
  };

  const handleDeleteConfirmation = (product) => {
    setSelectedProduct(product);
    setShowConfirmation(true);
  };

  const clearProductValues = () => {
    setSelectedProduct(null);
    setShowModal(false);
    setTitle("");
    setDesc("");
    setCategories([]);
    setColor([]);
    setPrice("");
    setCategories("");
    setInStock(true);
    setHasMeasurement(false);
    setMeasurement({});
    setClotheType("");
  };

  const clearMeasurementValues = () => {
    setWaist("");
    setHip("");
    setThigh("");
    setAnkle("");
    setLegHeight("");
    setNeck("");  
    setShoulder("");
    setBust("");
    setStomach("");
    setOverallHeight("");
    setClotheType("");
  };

  const cardImgStyle = {
    height: "400px", // Set a fixed height for the image
  };
  const cardStyle = {
    marginTop: "20px",
    marginLeft: "5px",
  };

  return (
    <div className="text-center">
      <h2>Products</h2>
      <Button variant="primary" onClick={() => handleShowModal(null)}>
        Add Product
      </Button>
      <Row>
        {products.map((product, measurement) => (
          <Col key={product._id} md={3}>
            <Card style={cardStyle}>
              <Card.Img
                style={cardImgStyle}
                variant="top"
                src={`${product._id}/${product._id}.jpg`}
                alt={product.title}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.desc}</Card.Text>                
                <h5>£ {product.price}</h5>
                <Card.Text>Product Id: {product._id}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSelectedProduct(product);
                    setClotheType(product.clotheType);
                    setHasMeasurement(product.hasMeasurement);
                    if (!product.hasMeasurement)  {      
                      setShowMeasurementModal(true);                      
                    }
                    else {                      
                      handleReadMeasurement(product);                      
                    }                    
                  }}
                >
                  {product.hasMeasurement === true ? "Edit Measurement" : "Add Measurement"}
                </Button>                
                <br />
                <br />
                <ButtonGroup>
                  <Button
                    variant="info"
                    onClick={() => handleShowModal(product)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteConfirmation(product)}
                  >
                    <FaTrash />
                  </Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedProduct ? "Edit Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCategories">
              <Form.Label>Categories</Form.Label>
              <Form.Control
                type="text"
                value={categories}
                onChange={(e) => setCategories(e.target.value.split(","))}
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}                
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formClotheType">
              <Form.Label>Select Clothe Type</Form.Label>
              <Form.Control
                as="select"
                value={clotheType}
                onChange={(e) => {
                  setClotheType(e.target.value);
                }}
              >
                <option value="">-- Select Clothe Type --</option>
                {clotheTypes.map((clothtype) => (<option key={clothtype._id} value={clothtype.clotheType}>{clothtype.clotheType}</option>))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formInStock">
              <Form.Check
                type="checkbox"
                label="In Stock"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (!selectedProduct) {
                handleAddProduct();
              }
              else {
                handleEditProduct(null, hasMeasurement);
              }
              }}
          >
            {selectedProduct ? "Save" : "Add Product"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showMeasurementModal} onHide={handleCloseMeasurementModal}>
        <Modal.Header closeButton>
          <Modal.Title>{hasMeasurement ? "Edit" : "Add"} {clotheType} Measurement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {clotheType === "Trouser" && (
              <div>
                <Form.Group controlId="formWaist">
                  <Form.Label>Waist (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    value={waist}
                    maxLength={2}
                    onChange={(e) => setWaist(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formHip">
                  <Form.Label>Hip (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                  />
                </Form.Group>setMeasurement
                <Form.Group controlId="formThigh">
                  <Form.Label>Thigh (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={thigh}
                    onChange={(e) => setThigh(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formAnkle">
                  <Form.Label>Ankle (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={ankle}
                    onChange={(e) => setAnkle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formLegHeight">
                  <Form.Label>Leg Height (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={legHeight}
                    onChange={(e) => setLegHeight(e.target.value)}
                  />
                </Form.Group>
              </div>
            )}
            {clotheType === "Gown" && (
              <div>
                <Form.Group controlId="formNeck">
                  <Form.Label>Neck (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={neck}
                    onChange={(e) => setNeck(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formShoulder">
                  <Form.Label>Shoulder (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={shoulder}
                    onChange={(e) => setShoulder(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBust">
                  <Form.Label>Bust (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={bust}
                    onChange={(e) => setBust(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formStomach">
                  <Form.Label>Stomach (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={stomach}
                    onChange={(e) => setStomach(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formGownWaist">
                  <Form.Label>Waist (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formGownHip">
                  <Form.Label>Hip (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formGownThigh">
                  <Form.Label>Thigh (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={thigh}
                    onChange={(e) => setThigh(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formGownOverallHeight">
                  <Form.Label>Overall Height (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={overallHeight}
                    onChange={(e) => setOverallHeight(e.target.value)}
                  />
                </Form.Group>
              </div>
            )}
            {(clotheType === "Shirt"  || clotheType === "Blouse") && (
              <div>
                <Form.Group controlId="formShirtNeck">
                  <Form.Label>Neck (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={neck}
                    onChange={(e) => setNeck(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formShirtShoulder">
                  <Form.Label>Shoulder (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={shoulder}
                    onChange={(e) => setShoulder(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formShirtBust">
                  <Form.Label>Bust (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={bust}
                    onChange={(e) => setBust(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formShirtStomach">
                  <Form.Label>Stomach (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={stomach}
                    onChange={(e) => setStomach(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formShirtOverallHeight">
                  <Form.Label>Overall Height (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={overallHeight}
                    onChange={(e) => setOverallHeight(e.target.value)}
                  />
                </Form.Group>
              </div>
            )}

            {clotheType === "Skirt" && (
              <div>
                <Form.Group controlId="formShirtNeck">
                  <Form.Label>Waist (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formSkirtHip">
                  <Form.Label>Hip (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formSkirtThigh">
                  <Form.Label>Thigh (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={thigh}
                    onChange={(e) => setThigh(e.target.value)}
                  />
                </Form.Group>                
                <Form.Group controlId="formSkirtOverallHeight">
                  <Form.Label>Overall Height (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={overallHeight}
                    onChange={(e) => setOverallHeight(e.target.value)}
                  />
                </Form.Group>
              </div>
            )}

            {clotheType === "Others" && (
              <div>
                <Form.Group controlId="formShirtNeck">
                  <Form.Label>Waist (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formSkirtHip">
                  <Form.Label>Hip (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formSkirtThigh">
                  <Form.Label>Thigh (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={thigh}
                    onChange={(e) => setThigh(e.target.value)}
                  />
                </Form.Group>                
                <Form.Group controlId="formSkirtOverallHeight">
                  <Form.Label>Overall Height (in cm)</Form.Label>
                  <Form.Control
                    type="number"
                    maxLength={2}
                    value={overallHeight}
                    onChange={(e) => setOverallHeight(e.target.value)}
                  />
                </Form.Group>
              </div>
            )}

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMeasurementModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={hasMeasurement === true ? handleEditMeasurement : handleAddMeasurement}>
            {hasMeasurement === true ? "Save Measurement" : "Add Measurement"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;