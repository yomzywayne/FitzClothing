import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Product3DImage from '../components/Product3DImage';
import AddToCart from '../components/AddToCart';
import FitNoFitPercent from '../components/FitNoFitPercent';
import FitNoFitChart from '../components/FitNoFitChart';
import { ConvertMeasurementsToChartMetrics } from "../Utility/Utility";


const mapStateToProps = function (state) {
  return {
    appConfig: state.appConfig.appConfig,
    currentUser: state.user.currentUser,
    currentProduct: state.selectedProduct.currentProduct,
  };
};

const Product3D = (props) => {

  const [chartMetrics, setChartMetrics] = useState(null);
  useEffect(() => {
    if (props.currentUser && props.currentProduct && chartMetrics === null) {
      const metrics = ConvertMeasurementsToChartMetrics(props.currentUser.measurements, props.currentProduct.measurements,
        Number(props.appConfig.minimumFitPercent), Number(props.appConfig.maximumVariantPerMeasurementInCmForFit));
      console.log("Product3D - metrics:", metrics);
      setChartMetrics(metrics);
    }
  }, [props.currentUser, props.currentProduct, chartMetrics]);

  return (
    <Container>      
      <Row>
        <Col sm={8}>
          <Row>
            <div style={{height: '800px'}}>
              <FitNoFitChart chartMetrics={chartMetrics} />
              <AddToCart product={props.currentProduct}/>              
            </div>
          </Row>
        </Col>
        <Col sm={4}>
          <Row>
            <Col>
              <div style={{height: '500px'}}>              
                <Product3DImage />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              {/*console.log("Product3D - FitNoFitPercent chartMetric:", chartMetric)*/}
              <br/>
              <FitNoFitPercent chartMetrics= {chartMetrics} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default connect(mapStateToProps)(Product3D);
<br/>