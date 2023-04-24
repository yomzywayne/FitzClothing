import { Link } from 'react-router-dom';

const CategoryItem = ({ item }) => {
  return (
    <div className="col-lg-12 col-md-6">
      <div className="card border-0 position-relative">
        <Link to={`/products/${item.cat}`}>
          <img
            src={item.img}
            alt={item.title}
            className="card-img-top w-100"
            style={{ height: '30rem' }}
          />
          <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center">
            <h1
              className="card-title text-white text-center mb-4"
              style={{ fontSize: '3rem' }}
            >
              {item.title}
            </h1>
            <button
              className="btn btn-outline-light"
              style={{ fontSize: '1rem' }}
            >
              SHOP NOW
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CategoryItem;
