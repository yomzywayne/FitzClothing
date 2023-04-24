import React, { useState, useEffect, useRef} from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Radar } from 'react-chartjs-2';

const mapStateToProps = function (state) {
  return {
    currentUser: state.user.currentUser,
    config: state.appConfig.appConfig,
    currentProduct: state.selectedProduct.currentProduct
  };
};

const BarChart = (props) => {
  const chartRef = useRef();
  const [chartData, setChartData] = useState(null);    

  useEffect(() => {
    if (props.chartMetrics) {
        const dynamicChartData = {
          options: {
            width:50,
            height:50,
            elements: {
              line: {
                borderWidth: 3
              }
            },
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
                label: `User measurements (${props.chartMetrics.totalUserMeasurements})`,
                fill: true,
                borderWidth: 1,
                data: props.chartMetrics.userMeasurements,
                backgroundColor: props.config.userMeasurementBackgroundColor,
                borderColor: props.config.userMeasurementBorderColor,
                hoverBackgroundColor: props.config.userMeasurementHoverBackgroundColor,
                hoverBorderColor: props.config.userMeasurementHoverBorderColor,
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
              },
              {
                label: `Clothe measurements (${props.chartMetrics.totalProductMeasurements})`,
                fill: true,
                borderWidth: 1,
                data: props.chartMetrics.productMeasurements,
                backgroundColor: props.config.clotheMeasurementBackgroundColor,
                borderColor: props.config.clotheMeasurementBorderColor,
                hoverBackgroundColor: props.config.clotheMeasurementHoverBackgroundColor,
                hoverBorderColor: props.config.clotheMeasurementHoverBorderColor,
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
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
        <Radar ref={chartRef} data={chartData.data} options={chartData.options}  width={50} height={50} />
      </div>
    </Container>  
  );
};

export default connect(mapStateToProps)(BarChart);