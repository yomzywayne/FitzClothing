import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Products from "../components/Products";
import { useLocation } from "react-router";
import { useState } from "react";


const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <h1 className="my-4">{cat}</h1>
      <Row>
        <Col>
          <Form>
            <h5>Filter Products:</h5>
            <Form.Group>
              <Form.Label>Color</Form.Label>
              <Form.Control as="select" name="color" onChange={handleFilters}>
                <option disabled>Choose Color</option>
                <option>white</option>
                <option>black</option>
                <option>red</option>
                <option>blue</option>
                <option>yellow</option>
                <option>green</option>
              </Form.Control>
            </Form.Group>
            <br />
            <h5>Sort Products:</h5>
            <Form.Group>
              <Form.Control
                as="select"
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="asc">Price (asc)</option>
                <option value="desc">Price (desc)</option>
              </Form.Control>
            </Form.Group>
            <br />
            <Button variant="primary" onClick={() => setFilters({})}>
              Clear filter
            </Button>
          </Form>
        </Col>
        <br />
        <Col md={9}>
          <Products cat={cat} filters={filters} sort={sort} />
        </Col>        
        </Row>       
    </Container>
  );
};

export default ProductList;