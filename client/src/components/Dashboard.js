import React, { useState } from 'react';
import ChartComponent from 'components/ChartComponent';
import ChartUsingD3 from 'components/ChartUsingD3';

const Dashboard = ({ chartData }) => {
  const [selectedChart, setSelectedChart] = useState(null); // Initially no chart selected
  
  const handleChartToggle = (chartType) => {
    setSelectedChart(chartType);
  };

  return (
    <div style={{ margin: '10px' }}>
      {/* <h1>Charts</h1> */}
      <p>Select options from Chart.js and D3.js</p>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => handleChartToggle('chartjs')}
          style={{
            marginRight: '10px',
            padding: '8px 16px',
            backgroundColor: selectedChart === 'chartjs' ? '#007bff' : 'transparent',
            color: selectedChart === 'chartjs' ? '#fff' : '#007bff',
            border: '1px solid #007bff',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Chart.js
        </button>
        <button
          onClick={() => handleChartToggle('d3js')}
          style={{
            padding: '8px 16px',
            backgroundColor: selectedChart === 'd3js' ? '#007bff' : 'transparent',
            color: selectedChart === 'd3js' ? '#fff' : '#007bff',
            border: '1px solid #007bff',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          D3.js
        </button>
      </div>

      {selectedChart === 'chartjs' && <ChartComponent chartData={chartData} />}
      {selectedChart === 'd3js' && <ChartUsingD3 chartData={chartData} />}
    </div>
  );
};

export default Dashboard;
