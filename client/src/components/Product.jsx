import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsCart3, BsHeart } from "react-icons/bs";
import { RiSearchLine } from "react-icons/ri";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { addSelectedProduct } from "../redux/selectedProductRedux";
import { addProduct } from "../redux/cartRedux";
import axios from "axios";


const Product = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ShowProductIn3D = async () => {
    try {      
      console.log("props.item:", props.item);

      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/clothemeasurements/${props.item._id}`);  

      console.log("measurements:", res.data);
      const product = { ...props.item, measurements: res.data };
      dispatch(addSelectedProduct(product));      
      navigate(`/product3d/${props.item._id}`);
    } 
    catch (error) {
      console.error(error);
    }
  }

  const handleAddToCartClicked = () => {    
    const addedProduct = { ...props.item, quantity: 1 };
    console.log("addedProduct:", addedProduct);
    dispatch(addProduct(addedProduct));    
  };

  return (
    <Card className="m-2" style={{ width: "18rem" }}>
      <Card.Img variant="top" height="400px" src={`/${props.item._id}/${props.item._id}.jpg`} onClick={() =>  {   
        ShowProductIn3D(props.item);
      }} />
      <Card.Body>
        <center>
          <Card.Title>{props.item.title}</Card.Title>

          <Card.Text>{props.item.description}</Card.Text>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Add to Cart</Tooltip>}
          >
            <Link onClick={ handleAddToCartClicked }>
            <Button variant="light" className="mx-2">
              <BsCart3 />
            </Button>
            </Link>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>View Product</Tooltip>}
          >
            <Link onClick={() => ShowProductIn3D(props.item)}>
              <Button variant="light" className="mx-2">
                <RiSearchLine />
              </Button>
            </Link>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Add to Wishlist</Tooltip>}
          >
            <Button variant="light" className="mx-2">
              <BsHeart />
            </Button>
          </OverlayTrigger>
        </center>
      </Card.Body>
    </Card>
  );
};

export default Product;