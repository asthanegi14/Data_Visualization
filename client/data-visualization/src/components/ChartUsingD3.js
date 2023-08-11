import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);

const ChartUsingD3 = ({ chartData }) => {
    const chartRef = useRef();
  
    useEffect(() => {
        const svg = d3.select(chartRef.current);
    
        // Sectors Chart (Line Chart)
        const sectorIntensities = chartData.reduce((result, item) => {
          if (!result[item.sector]) {
            result[item.sector] = 0;
          }
          result[item.sector] += item.intensity;
          return result;
        }, []);
        
        const labels = Object.keys(sectorIntensities);
        const intensitiesValues = Object.values(sectorIntensities);
        
        const width = 500;
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        
        const yScale = d3.scalePoint()
          .domain(labels)
          .range([height - margin.bottom, margin.top]) 
          .padding(0.5);
        
        const xScale = d3.scaleLinear()
          .domain([0, d3.max(intensitiesValues)])
          .nice()
          .range([margin.left, width - margin.right]);
        
        const line = d3.line()
          .x(d => xScale(sectorIntensities[d])+90)
          .y(d => yScale(d))
          .curve(d3.curveMonotoneX);
        
        svg.append("path")
          .datum(labels)
          .attr("fill", "none")
          .attr("stroke", "yellow")
          .attr("stroke-width", 2)
          .attr("d", line);
        
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);
        
        svg.append("g")
          .attr("transform", `translate(89,${height - margin.bottom})`)
          .call(xAxis);
        
        svg.append("g")
          .attr("transform", `translate(130,0)`)
          .call(yAxis);
          
          svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + 35)
          .text("Intensity");
      
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 20)
            .attr("transform", "rotate(-90)")
          .text("Sector");

      }, [chartData]);


 // D3.js Horizontal Bar Chart for "Region"
  
  const regionintensities = chartData.reduce((result, item) => {
    if (!result[item.region]) {
      result[item.region] = 0;
    }
    result[item.region] += item.intensity;
    return result;
  }, {});

  const RegionIntensities = Object.keys(regionintensities);
  const regionValue = Object.values(regionintensities);

 const regionSvgRef = useRef(null);

 useEffect(() => {
   const svg = d3.select(regionSvgRef.current);
   const margin = { top: 20, right: 20, bottom: 40, left: 60 };
   const width = 600 - margin.left - margin.right;
   const height = 400 - margin.top - margin.bottom;

   const x = d3.scaleLinear()
     .domain([0, d3.max(regionValue)])
     .range([0, width]);

   const y = d3.scaleBand()
     .domain(RegionIntensities)
     .range([0, height])
     .padding(0.1);

   svg.selectAll("rect")
     .data(regionValue)
     .enter()
     .append("rect")
     .attr("x", 150)
     .attr("y", (d, i) => y(RegionIntensities[i]))
     .attr("width", d => x(d))
     .attr("height", y.bandwidth())
     .attr("fill", "lightgreen");

//    svg.selectAll("text")
//      .data(regionValue)
//      .enter()
//      .append("text")
//      .attr("x", d => 150 + x(d) + 10)
//      .attr("y", (d, i) => y(RegionIntensities[i]) + y.bandwidth() / 2)
//      .attr("dy", "0.35em")
//      .text(d => d);

   svg.append("g")
     .attr("transform", `translate(150,${height - margin.bottom +41})`)
     .call(d3.axisBottom(x));

   svg.append("g")
     .attr("transform", `translate(150, 0)`)
     .call(d3.axisLeft(y));

     svg.append("text")
    .attr("class", "x-axis-label")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom)
    .attr("dy", "2.8em")
    .style("text-anchor", "middle")
    .text("Intensity");

    svg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", -height / 2)
    .attr("y", -margin.left + 20)
    .attr("transform", "rotate(-90)")
    .text("Region");


 }, [regionValue, RegionIntensities]);

    //Publish
    const Publishedintensities = chartData.reduce((result, item) => {
        const publishedYear = new Date(item.published).getFullYear();
        if (!result[publishedYear]) {
            result[publishedYear] = 0;
        }
        result[publishedYear] += 1;
        return result;
    }, {});
    
    const PublishedIntensities = Object.keys(Publishedintensities);
    
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const chartRefPublish = useRef(null);
    
    useEffect(() => {
        const svg = d3.select(chartRefPublish.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
    
        const x = d3.scaleLinear()
            .domain([d3.min(PublishedIntensities), d3.max(PublishedIntensities)])
            .range([0, width]);
    
        const histogram = d3.histogram()
            .value(d => d)
            .domain(x.domain())
            .thresholds(x.ticks(10));
    
        const bins = histogram(PublishedIntensities);
    
        const y = d3.scaleLinear()
            .domain([0, d3.max(bins, d => d.length)])
            .nice()
            .range([height, 0]);
    
        svg.selectAll("rect")
            .data(bins)
            .enter()
            .append("rect")
            .attr("x", d => x(d.x0))
            .attr("y", d => y(d.length))
            .attr("width", d => x(d.x1) - x(d.x0))
            .attr("height", d => height - y(d.length))
            .attr("fill", "steelblue");
    
        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y);
    
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(xAxis);
    
        svg.append("g")
            .call(yAxis);
    
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + 35)
            .text("Published Year");
    
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 20)
            .attr("transform", "rotate(-90)")
            .text("Frequency");
    }, [chartData]);

  return (
    <div style={{ maxWidth: '100%', margin: '10px'}}>
      <h1>Sectors (D3.js Horizontal Line Chart)</h1>
      <center>
      <svg ref={chartRef} width={800} height={400}></svg>
      </center>
      <h1>Published Year (D3.js Histogram Chart)</h1>
      <center>
      <svg ref={chartRefPublish} width="600" height="400" />
      </center>
      <h1>Region (D3.js Horizontal Bar Chart)</h1>
      <center>
      <svg ref={regionSvgRef} width="950" height="500" />
      </center>
      {/* <h1>Likelihood | Intencities | Relevance</h1>
      <center>
      <svg ref={lpr} width="800" height="500" />
      </center> */}
    </div>
  );
};

export default ChartUsingD3;
