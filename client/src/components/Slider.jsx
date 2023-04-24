import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { sliderItems } from '../data';

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
    } else {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <div
      className="position-relative overflow-hidden"
      style={{ height: '70vh' }}
    >
      <div className="position-absolute top-50 start-0 translate-middle-y z-1">
        <Container>
          <Row>
            <Col
              md={6}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                src={sliderItems[slideIndex].img}
                alt={sliderItems[slideIndex].title}
                className="w-75"
              />
            </Col>
            <Col
              md={6}
              className="d-flex flex-column justify-content-center align-items-center text-center"
            >
              <h1 className="mb-4">{sliderItems[slideIndex].title}</h1>
              <p className="mb-4">{sliderItems[slideIndex].desc}</p>
              <Link to={`/products/${sliderItems[slideIndex].cat}`}>
                <Button variant="primary" className="py-3 px-4">
                  SHOP NOW
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="position-absolute top-50 start-0 translate-middle-y z-2">
        <FaArrowLeft
          size={30}
          onClick={() => handleClick('left')}
          className="mx-3"
          style={{ left: '0' }}
        />
      </div>
      <div className="position-absolute top-50 end-0 translate-middle-y z-2">
        <FaArrowRight
          size={30}
          onClick={() => handleClick('right')}
          className="mx-3"
          style={{ right: '0' }}
        />
      </div>
    </div>
  );
};

export default Slider;
