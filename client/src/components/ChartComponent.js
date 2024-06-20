import React from 'react';
import Intensity from './Types/Intensity';
import Likelihood from './Types/Likelihood';
import Relevance from './Types/Relevance';

export default function ChartComponent({chartData}) {
  return (
    <div>
      <Intensity chartData={chartData}/>
      <Likelihood chartData={chartData}/>
      <Relevance chartData={chartData}/>
    </div>
  )
}
