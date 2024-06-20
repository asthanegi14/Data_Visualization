import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import "../Css/intensity.css";

Chart.register(...registerables);

const Likelihood = ({ chartData }) => {
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
        result[item[selectedFilter]] += item.likelihood;
        return result;
    }, {});

    const dynamicChartLabels = Object.keys(dynamicChartData);
    const dynamicChartValues = Object.values(dynamicChartData);

    const chartDataConfig = {
        labels: dynamicChartLabels,
        datasets: [
            {
                label: 'Likelihood',
                data: dynamicChartValues,
                backgroundColor: dynamicChartLabels.map(() => getRandomColor()),
            },
        ],
    };

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const chartOptions = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                display: false,
            },
            x: {
                display: false,
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
            <h1>Likelihood</h1>
            <div className="filters">
                <select onChange={(e) => setSelectedFilter(e.target.value)}>
                    <option value="">Select Filter</option>
                    {Object.keys(filterOptions).map(filter => (
                        <option key={filter} value={filter}>{filterOptions[filter]}</option>
                    ))}
                </select>
            </div>

            <h2>Likelihood by {filterOptions[selectedFilter]}</h2>
            <div className="chart-container">
                <Doughnut data={chartDataConfig} options={chartOptions} />
                <CustomLegend labels={dynamicChartLabels} colors={chartDataConfig.datasets[0].backgroundColor} />
            </div>
        </div>
    );
};

const CustomLegend = ({ labels, colors }) => (
    <div className="legend-container">
        {labels.map((label, index) => (
            <div key={index} className="legend-item">
                <span className="legend-color" style={{ backgroundColor: colors[index] }}></span>
                <span className="legend-label">{label}</span>
            </div>
        ))}
    </div>
);

export default Likelihood;
