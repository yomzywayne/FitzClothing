import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import Product from "./Product";
import axios from "axios";


const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          props.cat
            ? `${process.env.REACT_APP_SERVER_URL}/products?category=${props.cat}`
            : `${process.env.REACT_APP_SERVER_URL}/products`
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [props.cat]);

  useEffect(() => {
    props.cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(props.filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, props.cat, props.filters]);

  useEffect(() => {
    if (props.sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (props.sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [props.sort]);

  return (
    <Container fluid>
      <Container className="d-flex flex-wrap">
        {props.cat
          ? filteredProducts.map((item, index) => <Product item={item} key={`${item.id}-${index}`} />)
          : products
              .slice(0, 8)
              .map((item, index) => <Product item={item} key={`${item.id}-${index}`} />)}
      </Container>
    </Container>
  );
};

export default Products;