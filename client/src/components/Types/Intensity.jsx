import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import "../Css/intensity.css";

Chart.register(...registerables);

const Intensity = ({ chartData }) => {

    const [filteredData, setFilteredData] = useState(chartData);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        let data = chartData;

        if (selectedFilter && filterValue) {
            data = data.filter(item => item[selectedFilter] === filterValue);
        }

        setFilteredData(data);
    }, [selectedFilter, filterValue, chartData]);

    const handleFilterChange = (filterName, value) => {
        setSelectedFilter(filterName);
        setFilterValue(value);
    };

    const dynamicChartData = filteredData.reduce((result, item) => {
        if (!result[item[selectedFilter]]) {
            result[item[selectedFilter]] = 0;
        }
        result[item[selectedFilter]] = item.intensity;
        return result;
    }, {});

    const dynamicChartLabels = Object.keys(dynamicChartData);
    const dynamicChartValues = Object.values(dynamicChartData);

    const chartDataConfig = {
        labels: dynamicChartLabels,
        datasets: [
            {
                label: 'Intensity',
                data: dynamicChartValues,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const filterOptions = {
        topic: 'Topic',
        sector: 'Sector',
        region: 'Region',
        source: 'Source',
        country: 'Country',
    };

    return (
        <div className="container">
            <h1>Intensity</h1>
            <div className="filters">
                <select onChange={(e) => setSelectedFilter(e.target.value)}>
                    <option value="">Select Filter</option>
                    {Object.keys(filterOptions).map(filter => (
                        <option key={filter} value={filter}>{filterOptions[filter]}</option>
                    ))}
                </select>
            </div>

            <h2>Intensity by {filterOptions[selectedFilter]}</h2>
            <Line data={chartDataConfig} options={chartOptions} />
        </div>
    );
};

export default Intensity;
