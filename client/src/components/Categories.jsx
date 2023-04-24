import { categories } from '../data';
import CategoryItem from './CategoryItem';
import { Container, Row, Col } from 'react-bootstrap';

const Categories = () => {
  return (
    <Container fluid>
      <Row className="justify-content-center">
        {categories.map((item) => (
          <Col md={3} lg={3} className="my-3" key={item.id}>
            <CategoryItem item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Categories;
