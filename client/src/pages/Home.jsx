import React from 'react';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Slider from '../components/Slider';

const Home = () => {
  return (
    <div>
      <br /> <br />
      <Slider />
      <br />
      <Categories />
      <br /> <br />
      <Products />
    </div>
  );
};

export default Home;
