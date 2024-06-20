import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import "./index.css";

const IntensityD3 = ({ chartData }) => {
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
        svg.selectAll('*').remove(); // Clear previous content

        const dynamicChartData = filteredData.reduce((result, item) => {
            if (!result[item[selectedFilter]]) {
                result[item[selectedFilter]] = 0;
            }
            result[item[selectedFilter]] += item.intensity;
            return result;
        }, {});

        const dynamicChartLabels = Object.keys(dynamicChartData);
        const dynamicChartValues = Object.values(dynamicChartData);

        const width = 700;
        const height = 400;
        const margin = { top: 20, right: 20, bottom: 100, left: 50 };

        const xScale = d3.scaleBand()
            .domain(dynamicChartLabels)
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dynamicChartValues)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        const xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale).tickSizeOuter(0))
            .selectAll("text")
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "end")
            .attr("dx", "-0.8em")
            .attr("dy", "-0.15em");

        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));

        svg.append("g")
            .selectAll("rect")
            .data(dynamicChartLabels)
            .join("rect")
            .attr("x", d => xScale(d))
            .attr("y", d => yScale(dynamicChartData[d]))
            .attr("height", d => yScale(0) - yScale(dynamicChartData[d]))
            .attr("width", xScale.bandwidth())
            .attr("fill", "steelblue");

        svg.append("g").call(xAxis);
        svg.append("g").call(yAxis);

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height - 6)
            .text(filterOptions[selectedFilter]);

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", -height / 2)
            .attr("y", 15)
            .attr("transform", "rotate(-90)")
            .text("Intensity");

    }, [filteredData, selectedFilter]);

    const filterOptions = {
        // endYear: 'End Year',
        topic: 'Topic',
        sector: 'Sector',
        region: 'Region',
        // pest: 'PEST',
        // source: 'Source',
        // swot: 'SWOT',
        country: 'Country',
        // city: 'City'
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
            <svg ref={chartRef} width={700} height={400}></svg>
        </div>
    );
};

export default IntensityD3;
