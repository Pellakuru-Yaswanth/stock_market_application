import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Chart({items}){
    let times = [];
    let prices = [];
    for(let i in items){
        times.push("");
        prices.push(items[i]);
    }
    const data = {
      labels: times,
      datasets: [
        {
          label: 'Sales',
          data: prices,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  
    return <Line data={data} options={options} />
  }
  export default Chart;