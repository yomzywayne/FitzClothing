import React from "react";
import { Container } from "react-bootstrap";
import DoughnutChart from "./charts/DoughnutChart";

const FitNoFitPercent = (props) => {
  return (    
    <Container className="p-2">
      {props.chartMetrics && <DoughnutChart chartMetrics= {props.chartMetrics} />}
    </Container>
  );
};

export default FitNoFitPercent;