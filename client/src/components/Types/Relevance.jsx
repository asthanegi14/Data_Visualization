import React, { useState, useEffect } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import "../Css/intensity.css";

Chart.register(...registerables);

const Relevance = ({ chartData }) => {
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
        result[item[selectedFilter]] = item.relevance;
        return result;
    }, {});

    const dynamicChartLabels = Object.keys(dynamicChartData);
    const dynamicChartValues = Object.values(dynamicChartData);

    const chartDataConfig = {
        labels: dynamicChartLabels,
        datasets: [
            {
                label: 'Relevance',
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
        scales: {
            r: {
                ticks: {
                    display: false,
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'black',
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw}`;
                    },
                },
            },
        },
    };

    const filterOptions = {
        topic: 'Topic',
        sector: 'Sector',
        region: 'Region',
        country: 'Country',
    };

    return (
        <div className="container">
            <h1>Relevance</h1>
            <div className="filters">
                <select onChange={(e) => setSelectedFilter(e.target.value)}>
                    <option value="">Select Filter</option>
                    {Object.keys(filterOptions).map(filter => (
                        <option key={filter} value={filter}>{filterOptions[filter]}</option>
                    ))}
                </select>
            </div>

            <h2>Relevance by {filterOptions[selectedFilter]}</h2>
            <PolarArea data={chartDataConfig} options={chartOptions} />
        </div>
    );
};

export default Relevance;
