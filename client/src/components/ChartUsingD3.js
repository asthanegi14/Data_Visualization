import React from 'react';
import IntensityD3 from './TypesD3/IntensityD3';
import LikelihoodD3 from './TypesD3/LikelihoodD3';
import RelevanceD3 from './TypesD3/RelevanceD3';

const ChartUsingD3 = ({ chartData }) => {
    return (
        <div>
            <IntensityD3 chartData={chartData} />
            <LikelihoodD3 chartData={chartData} />
            <RelevanceD3 chartData={chartData}/>
        </div>
    );
};

export default ChartUsingD3;
