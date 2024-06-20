import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import "./index.css";

const LikelihoodD3 = ({ chartData }) => {
    const [filteredData, setFilteredData] = useState(chartData);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [filterValue, setFilterValue] = useState('');

    const chartRef = useRef();

    useEffect(() => {
        let data = chartData;

        if (selectedFilter && filterValue) {
            data = data.filter(item => item[selectedFilter] === filterValue);
        }

        setFilteredData(data);
    }, [selectedFilter, filterValue, chartData]);

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll('*').remove();

        const dynamicChartData = filteredData.reduce((result, item) => {
            if (!result[item[selectedFilter]]) {
                result[item[selectedFilter]] = 0;
            }
            result[item[selectedFilter]] += item.likelihood;
            return result;
        }, {});

        const dynamicChartLabels = Object.keys(dynamicChartData);
        const dynamicChartValues = Object.values(dynamicChartData);

        const width = 700;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        const color = d3.scaleOrdinal()
            .domain(dynamicChartLabels)
            .range(dynamicChartLabels.map(() => getRandomColor()));

        const pie = d3.pie()
            .value(d => d)(dynamicChartValues);

        const arc = d3.arc()
            .innerRadius(radius * 0.3)
            .outerRadius(radius * 0.8);

        const chartGroup = svg
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2 + 100}, ${height / 2})`);

        chartGroup
            .selectAll('path')
            .data(pie)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(dynamicChartLabels[i]))
            .attr('stroke', 'none')
            .attr('stroke-width', '0');


        const legendHeight = 400;
        const legendGroup = svg
            .append('g')
            .attr('transform', `translate(50, 20)`);

        const legendContainer = legendGroup
            .append('foreignObject')
            .attr('width', 150)
            .attr('height', legendHeight)
            .append('xhtml:div')
            .attr('class', 'legend-container')
            .style('width', '150px')
            .style('height', `${legendHeight}px`)
            .style('overflow-y', 'auto')
            .style('overflow-x', 'hidden');

        const legend = legendContainer
            .append('div')
            .selectAll('.legend')
            .data(dynamicChartLabels)
            .enter()
            .append('div')
            .attr('class', 'legend-item')
            .style('display', 'flex')
            .style('align-items', 'center')
            .style('margin-bottom', '5px');

        legend
            .append('div')
            .style('width', '12px')
            .style('height', '12px')
            .style('background-color', d => color(d))
            .style('margin-right', '8px');

        legend
            .append('div')
            .style('flex', '1')
            .style('word-wrap', 'break-word')
            .text(d => d)
            .style('font-size', '12px');

    }, [filteredData, selectedFilter]);

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const filterOptions = {
        topic: 'Topic',
        sector: 'Sector',
        region: 'Region',
        source: 'Source',
        country: 'Country',
    };

    return (
        <div className="container" style={{ maxWidth: '700px' }}>
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
            <svg ref={chartRef} width={700} height={400}></svg>
        </div>
    );
};

export default LikelihoodD3;
