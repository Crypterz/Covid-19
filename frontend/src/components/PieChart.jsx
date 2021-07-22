import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import ReactApexChart from "react-apexcharts";

const PieChart = () => {
    const series = [100,53];
    const options = {
        labels: ['Total Beds Assign','Free Beds'],
        colors: ['#226EFC','#7dca53'],
        legend: {
            position: 'bottom',
        }
    };

    return (
      <div
        style={{
          backgroundColor: "white",
          position:'bottom'
        }}
      >
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={390}
        />
      </div>
    );
  }
  
  export default PieChart;
  