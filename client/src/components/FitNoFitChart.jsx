import React, { useState } from "react";
import Select from 'react-select';
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import BarChart from "./charts/BarChart";
import RadarChart from "./charts/RadarChart";
import LineChart from "./charts/LineChart";
import BarAndLineChart from "./charts/BarAndLineChart";


const mapStateToProps = function (state) {
  return {
    currentUser: state.user.currentUser,
    currentProduct: state.selectedProduct.currentProduct
  };
};

const FitNoFitChart = (props) => {

  console.log("currentUser:", props.currentUser);
  console.log("currentProduct:", props.currentProduct);

  const navigate = useNavigate();
  const [chartType, setChartType] = useState("BarChart"); 
  
  const options = [
    { value: 'BarChart', label: 'Bar Chart' },
    { value: 'LineChart', label: 'Line Chart' },
    { value: 'BarAndLineChart', label: 'Bar and Line Chart' },
    { value: 'RadarChart', label: 'Radar Chart' },
  ]

    const onSelectedChartChanged = (option) => {
    setChartType(option.value);
  };

  if (!props.chartMetrics) {
    return (    
    <Container>
      {!props.currentUser.measurements &&
      <center>
        <div>Please ensure user body mmeasurements are added!</div>
        <Button variant="primary" type="submit" onClick={() => navigate(`/body-measurement?comparingmeasurements=true&productid=${props.currentProduct._id}`)}>
          Add body measurment
        </Button>
      </center>
      }

    {!props.currentProduct.measurements &&
      <center>
        <div>Clothe measurement is required</div>
      </center>
    }
    </Container>
    )     
  }

  return  (
  <>
  <Row>
    <Col>
      <h3><center>Measurements chart</center></h3>
      <div style={{width:'250px'}}>
        Select chart type:
        <Select options={options} defaultValue={options[0]}  onChange={onSelectedChartChanged} />
      </div>
    </Col>
  </Row>    
    { chartType === 'BarChart' ? <BarChart chartMetrics= {props.chartMetrics} /> 
    : chartType === 'LineChart' ? <LineChart chartMetrics= {props.chartMetrics} /> 
    : chartType === 'RadarChart' ? <RadarChart chartMetrics= {props.chartMetrics} />
    :
    <BarAndLineChart chartMetrics= {props.chartMetrics} />
    }
  </>)
};

export default connect(mapStateToProps)(FitNoFitChart);