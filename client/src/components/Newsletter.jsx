import React from 'react';
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { MdSend } from 'react-icons/md';
import { AiFillHome } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';

const Newsletter = () => {
  return (
    <div className="bg-light py-5">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={8} lg={6}>
            <h1 className="text-center mb-4">Newsletter</h1>
            <p className="text-center mb-4">
              Get timely updates from your favorite products.
            </p>
            <InputGroup>
              <FormControl placeholder="Your email" />
              <Button variant="primary">
                <MdSend />
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col md={4} className="text-center">
            <AiFillHome size={40} className="mb-2" />
            <h5>Address</h5>
            <p>123 Main Street, Anytown, N12 7SA</p>
          </Col>
          <Col md={4} className="text-center">
            <BsFillInfoCircleFill size={40} className="mb-2" />
            <h5>Information</h5>
            <p>Email: FITZ@gmail.com</p>
            <p>Phone: 071234567</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Newsletter;
