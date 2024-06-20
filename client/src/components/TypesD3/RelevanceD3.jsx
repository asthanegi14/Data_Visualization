import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './index.css';

const RelevanceD3 = ({ chartData }) => {
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
            result[item[selectedFilter]] += item.relevance;
            return result;
        }, {});

        const dynamicChartLabels = Object.keys(dynamicChartData);
        const dynamicChartValues = Object.values(dynamicChartData);

        const width = 900; // Adjusted to accommodate the legend
        const height = 400;
        const radius = Math.min(width - 200, height) / 2; // Adjust radius accordingly

        const color = d3.scaleOrdinal()
            .domain(dynamicChartLabels)
            .range(dynamicChartLabels.map(() => getRandomColor()));

        const pie = d3.pie()
            .value(d => d)(dynamicChartValues);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        const chartGroup = svg
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${(width - 200) / 2 + 200}, ${height / 2})`);

        chartGroup
            .selectAll('path')
            .data(pie)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(dynamicChartLabels[i]))
            .style('opacity', 0.7);

        const legendGroup = svg
            .append('g')
            .attr('transform', `translate(10, 20)`); // Move legend to the left side

        const legend = legendGroup
            .selectAll('.legend')
            .data(dynamicChartLabels)
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', (d, i) => `translate(0, ${i * 20})`);

        legend.append('rect')
            .attr('width', 10)
            .attr('height', 10)
            .attr('fill', d => color(d));

        legend.append('text')
            .attr('x', 15)
            .attr('y', 10)
            .text(d => d)
            .style('font-size', '12px')
            .attr('alignment-baseline', 'hanging')
            .call(wrap, 180); // Apply text wrapping with adjusted width

    }, [filteredData, selectedFilter]);

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Function to apply text wrapping
    function wrap(text, width) {
        text.each(function () {
            const text = d3.select(this);
            const words = text.text().split(/\s+/).reverse();
            let word;
            let line = [];
            let lineNumber = 0;
            const lineHeight = 1.1; // ems
            const y = text.attr('y');
            const dy = parseFloat(text.attr('dy')) || 0;
            let tspan = text.text(null).append('tspan').attr('x', 15).attr('y', y).attr('dy', dy + 'em');
            while ((word = words.pop())) {
                line.push(word);
                tspan.text(line.join(' '));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(' '));
                    line = [word];
                    tspan = text.append('tspan').attr('x', 15).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
                }
            }
        });
    }

    const filterOptions = {
        topic: 'Topic',
        sector: 'Sector',
        region: 'Region',
        source: 'Source',
        country: 'Country',
    };

    return (
        <div className="container" style={{ maxWidth: '900px' }}>
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
            <svg ref={chartRef} width={900} height={400}></svg>
        </div>
    );
};

export default RelevanceD3;
