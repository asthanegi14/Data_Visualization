import React, { useEffect, useRef } from 'react';
import { Bar, Bubble, Doughnut, PolarArea, Line } from 'react-chartjs-2';
import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);

const ChartComponent = ({ chartData }) => {

  //Sectors Chart
  const sectorIntensities = chartData.reduce((result, item) => {
    if (!result[item.sector]) {
      result[item.sector] = 0;
    }
    result[item.sector] += item.intensity;
    return result;
  }, {});
  
  const labels = Object.keys(sectorIntensities);
  const intensitiesValues = Object.values(sectorIntensities);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Sectors',
        data: intensitiesValues,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ],
        borderColor: [
          'rgb(255, 99, 132, 1)',
          'rgb(75, 192, 192, 1)',
          'rgb(255, 205, 86, 1)',
          'rgb(201, 203, 207, 1)',
          'rgb(54, 162, 235, 1)'
        ]
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


  //Country Chart
  const countrySubmissionCounts = new Map();
  chartData.forEach(item => {
    if (!countrySubmissionCounts.has(item.country)) {
      countrySubmissionCounts.set(item.country, 0);
    }
    countrySubmissionCounts.set(item.country, countrySubmissionCounts.get(item.country) + 1);
  });

  const labelsCountry = Array.from(countrySubmissionCounts.keys());
  const submissionCounts = Array.from(countrySubmissionCounts.values());

  const dataOfSubmissions = {
    labels: labelsCountry,
    datasets: [
      {
        label: 'Submissions',
        data: submissionCounts,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)',
        ],
        borderColor: [
          'rgb(255, 99, 132, 1)',
          'rgb(75, 192, 192, 1)',
          'rgb(255, 205, 86, 1)',
          'rgb(201, 203, 207, 1)',
          'rgb(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const optionsSubmissions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };


  //Region
  
  const regionintensities = chartData.reduce((result, item) => {
    if (!result[item.region]) {
      result[item.region] = 0;
    }
    result[item.region] += item.intensity;
    return result;
  }, {});

  const RegionIntensities = Object.keys(regionintensities);
  const regionValue = Object.values(regionintensities);

  const dataOfRegion = {
    labels:  RegionIntensities,
    datasets: [
      {
        label: 'Region',
        data: regionValue,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ],
        borderColor: [
          'rgb(255, 99, 132, 1)',
          'rgb(75, 192, 192, 1)',
          'rgb(255, 205, 86, 1)',
          'rgb(201, 203, 207, 1)',
          'rgb(54, 162, 235, 1)'
        ]
      },
    ],
  };

  const optionsRegion = {
  };

 
  //Topics
  
  const Sectorsintensities = chartData.reduce((result, item) => {
    if (!result[item.topic]) {
      result[item.topic] = 0;
    }
    result[item.topic] += item.topic;
    return result;
  }, {});

  const SectorIntensities = Object.keys(Sectorsintensities);
  const SectorValue = Object.values(Sectorsintensities);

  const dataOfSector = {
    labels:  SectorIntensities,
    datasets: [
      {
        label: 'Topics',
        data: SectorValue.map(value => ({
          x: Math.random() * 100, 
          y: Math.random() * 100, 
          r: value,
        })),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ],
        borderColor: [
          'rgb(255, 99, 132, 1)',
          'rgb(75, 192, 192, 1)',
          'rgb(255, 205, 86, 1)',
          'rgb(201, 203, 207, 1)',
          'rgb(54, 162, 235, 1)'
        ]
      },
    ],
  };

  const optionsSector = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };


  
  //End Year
  
  const Publishedintensities = chartData.reduce((result, item) => {
    const publishedYear = new Date(item.end_year).getFullYear();
    if (!isNaN(publishedYear)) { // Check if publishedYear is a valid number
      if (!result[publishedYear]) {
        result[publishedYear] = 0;
      }
      result[publishedYear] += 1;
    }
    return result;
  }, {});

  const PublishedIntensities = Object.keys(Publishedintensities);
  const PublishedValue = Object.values(Publishedintensities);

  const dataOfPublished = {
    labels:  PublishedIntensities,
    datasets: [
      {
        label: 'end year',
        fill: true,
        data: PublishedValue,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      },
    ],
  };

  const optionsPublished = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };


  //likelihood,  Intensity, Relevance
  const likelihoodintensities = chartData.reduce((result, item) => {
    if (!result[item.likelihood]) {
      result[item.likelihood] = 0;
    }
    result[item.likelihood] += item.likelihood;
    return result;
  }, {});

  //Relevance
  const Relevanceintensities = chartData.reduce((result, item) => {
    if (!result[item.relevance]) {
      result[item.relevance] = 0;
    }
    result[item.relevance] += item.relevance;
    return result;
  }, {});
  const relevanceIntensities = Object.values(Relevanceintensities);

  //intensities
  const intensities = chartData.reduce((result, item) => {
    if (!result[item.intensity]) {
      result[item.intensity] = 0;
    }
    result[item.intensity] += item.intensity;
    return result;
  }, {});

  const labelsIntensities = Object.keys(intensities);
  const intensitiesValue = Object.values(intensities);

  const likelihoodIntensities = Object.keys(likelihoodintensities);
  const likelihoodValue = Object.values(likelihoodintensities);

  const dataOfLikelihood = {
    labels:  likelihoodIntensities,
    datasets: [
      {
        label: 'Likelihood',
        data: likelihoodValue,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      },
      {
        label: 'Intensity',
        data: intensitiesValue,
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      },
      {
        label: 'Relevance',
        data: relevanceIntensities,
        fill: true,
        backgroundColor: 'rgba(255, 205, 86, 0.2)', 
        borderColor: 'rgb(255, 205, 86)',
        pointBackgroundColor: 'rgb(255, 205, 86)', 
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 205, 86)', 
      }
    ],
  };

  const optionsLikelihood = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };


  return (
    <div style={{ maxWidth: '700px'}}>
      <h1>Sectors</h1>
      <Doughnut data={data} options={options}/>

      <h1>Country</h1>
      <PolarArea  data={dataOfSubmissions} options={optionsSubmissions} />

      <h1>Region</h1>
      <Bar data={dataOfRegion} options={optionsRegion}/>

      <h1>Topics</h1>
      <Line data={dataOfSector} options={optionsSector}/>

      <h1>End Year</h1>
      <Line data={dataOfPublished} options={optionsPublished}/>
      
      
      <h1>Likelihood | Intencities | Relevance</h1>
      <Line data={dataOfLikelihood} options={optionsLikelihood}/>
    </div>
  );
};

export default ChartComponent;
