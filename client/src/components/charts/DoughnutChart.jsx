import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Doughnut } from 'react-chartjs-2';


const mapStateToProps = function (state) {
  return {
    config: state.appConfig.appConfig,
  };
};

const DoughnutChart = (props) => {
    const chartRef = useRef();
    const [chartData, setChartData] = useState(null);    
    const [ruleNotMetColor, setRuleNotMetColor] = useState('');
    const [fitNofit, setFitNofit] = useState('');

  useEffect(() => {
    if (props.chartMetrics) {
        setRuleNotMetColor(props.chartMetrics.rulesNotMetColor);
        setFitNofit(props.chartMetrics.arithmenticFitNofitDecision);

        const dynamicChartData = {
          labels: [
            `User measurements matched: ${props.chartMetrics.totalUserMeasurementsMatched} (${props.chartMetrics.arithmeticFitVariancePercent})`, 
            `Clothe measurement variance: ${props.chartMetrics.totalMeasurementsDifference} (${props.chartMetrics.arithmeticUnfitVariancePercent})`
            ],
          datasets: [
            {
              label: 'Measurements',
              data: [props.chartMetrics.totalUserMeasurementsMatched, props.chartMetrics.totalMeasurementsDifference],
              backgroundColor: [props.config.userMeasurementBackgroundColor, props.config.clotheMeasurementBackgroundColor],
              borderColor: [props.config.userMeasurementBorderColor, props.config.clotheMeasurementBorderColor],
              borderWidth: 1,
            },
          ],
          options: {
            legend: {
              display: true,
              position: "right"
            },
            elements: {
              arc: {
                borderWidth: 0
              }
            }
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
      <div>
        <br />        
        <Doughnut ref={chartRef} data={chartData} options={chartData.options} width={120} height={120}
          plugins={[
            {
              beforeDraw(chart) {
               const { width } = chart;
               const { height } = chart;
               const { ctx } = chart;
               ctx.restore();
               const fontSize = (height / 160).toFixed(2);
               ctx.font = `${fontSize}em sans-serif`;
               ctx.textBaseline = 'top';
               const { text } = "23";
               const textX = Math.round((width - ctx.measureText(text).width) / 2) + (fitNofit === "FIT" ? 40 : 17);
               const textY = (height / 2) + 10;
               ctx.fillText(fitNofit, textX, textY);
               ctx.save();
             },
           },
         ]}
        />
        <br/>
        {props.chartMetrics.rulesNotMet.length > 0 &&
        <div>            
            <div style={{color:`${ruleNotMetColor}`}}><strong>Rules not met:</strong></div>
            <>
                {props.chartMetrics.rulesNotMet.map((rule) => <div style={{color:`${ruleNotMetColor}`}} key={rule}>{rule}</div>)}
            </>
        </div>
        }
      </div>
  );
};

export default connect(mapStateToProps)(DoughnutChart);