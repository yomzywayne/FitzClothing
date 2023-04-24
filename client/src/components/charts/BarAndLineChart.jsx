import React, { useState, useEffect, useRef} from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Bar } from 'react-chartjs-2';

const mapStateToProps = function (state) {
  console.log("state:", state);
  return {
    currentUser: state.user.currentUser,
    config: state.appConfig.appConfig,
    currentProduct: state.selectedProduct.currentProduct
    
  };
};

const BarAndLineChart = (props) => {
  const chartRef = useRef();
  const [chartData, setChartData] = useState(null);    

  useEffect(() => {
    if (props.chartMetrics) {
        const dynamicChartData = {
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top"
              },
              title: {
                display: true,
                text: props.config.measurementsComparisonChartTitle
              }
            }
          },
          data: {
            labels: props.chartMetrics.chartLabels,
            datasets: [
              {
                type: 'bar',
                label: `User measurements (${props.chartMetrics.totalUserMeasurements})`,
                backgroundColor: props.config.userMeasurementBackgroundColor,
                borderColor: props.config.userMeasurementBorderColor,
                borderWidth: 1,
                hoverBackgroundColor: props.config.userMeasurementHoverBackgroundColor,
                hoverBorderColor: props.config.userMeasurementHoverBorderColor,
                data: props.chartMetrics.userMeasurements,
              },
              {
                type: 'line',
                label: `Clothe measurements (${props.chartMetrics.totalProductMeasurements})`,
                backgroundColor: props.config.clotheMeasurementBackgroundColor,
                borderColor: props.config.clotheMeasurementBorderColor,
                borderWidth: 1,
                hoverBackgroundColor: props.config.clotheMeasurementHoverBackgroundColor,
                hoverBorderColor: props.config.clotheMeasurementHoverBorderColor,
                data: props.chartMetrics.productMeasurements,
              }
            ]
          }
        };
        setChartData(dynamicChartData);
    }
  }, [props.chartMetrics]) 
  
  if (chartData === null) {
    return (    
        <div>
          <h2>Loading ...</h2>
        </div>
    );
  }

  return (    
    <Container className="p-2">      
      <div>        
        <Bar ref={chartRef} data={chartData.data} options={chartData.options} width={100} height={50} />
      </div>
    </Container>  
  );
};

export default connect(mapStateToProps)(BarAndLineChart);