import React from 'react'
import ReactApexChart from "react-apexcharts";


function HorizontalBarGraph({myProp1}) {
   // const config = {
      const series = [{
         data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
       }];
       const options= {
           plotOptions:{
               bar:{
                   horizontal:true,
                   dataLabels:{
                       enabled:true
                   },
               }
           },
           xaxis: {
            // categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
            //   'United States', 'China', 'Germany']
            categories : myProp1
        }
       }
        
  //   } 

  return (
    <div
      style={{
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
      <br />
      <ReactApexChart 
        options={options} 
        series={series} 
        type="bar" 
      />
    </div>
  );
}

export default HorizontalBarGraph;
