import React, { useEffect, useLayoutEffect, useRef } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DashboardChart = () => {
  const chartRef = useRef();
 
  useLayoutEffect(() => {
    console.log('...chartRef..', chartRef);
  }, []);
  // const customMarker = [];
  // const addMarkerImages = (chart) => {
  //   for(let i = 0; i < chart.data[0].dataPoints.length; i++){
  
  //     customMarkers.push(("<img>").attr("src", chart.data[0].dataPoints[i].markerImageUrl)
  //                        .css("display", "none")
  //                        .css("height", 30)
  //                        .css("width", 30)
  //                        .appendTo($("#chartContainer>.canvasjs-chart-container"))
  //                       );        
  //     positionMarkerImage(customMarkers[i], i);
  //   }    
  // }
  
  // const positionMarkerImage = (customMarker, index) => { 
  //   var pixelX = chart.axisX[0].convertValueToPixel(chart.options.data[0].dataPoints[index].x);
  //   var pixelY = chart.axisY[0].convertValueToPixel(chart.options.data[0].dataPoints[index].y);
    
  //   customMarker.css({"position": "absolute", 
  //                     "display": "block",
  //                     "top": pixelY - customMarker.height()/2,
  //                     "left": pixelX - customMarker.width()/2
  //                    });
  // }
  const options1 = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Monthly Sales Data"
    },
    axisX: {
      valueFormatString: "HH:mm",
    },
    axisY: {
      prefix: "$",
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
    },
    data: [
      // {
      //   type: "column",
      //   name: "Actual Sales",
      //   showInLegend: true,
      //   xValueFormatString: "MMMM YYYY",
      //   yValueFormatString: "$#,##0",
      //   dataPoints: [
      //     { x: new Date(2016, 0), y: 20000 },
      //     { x: new Date(2016, 1), y: 30000 },
      //     { x: new Date(2016, 2), y: 25000 },
      //     { x: new Date(2016, 3), y: 70000, indexLabel: "High Renewals" },
      //     { x: new Date(2016, 4), y: 50000 },
      //     { x: new Date(2016, 5), y: 35000 },
      //     { x: new Date(2016, 6), y: 30000 },
      //     { x: new Date(2016, 7), y: 43000 },
      //     { x: new Date(2016, 8), y: 35000 },
      //     { x: new Date(2016, 9), y:  30000},
      //     { x: new Date(2016, 10), y: 40000 },
      //     { x: new Date(2016, 11), y: 50000 }
      //   ]
      // }, 
      {
        type: "splineArea",
        name: "Tide",
        markerBorderColor: "white",
        markerBorderThickness: 2,
        markerType: 'none',
        showInLegend: true,
        dataPoints: [
          { x: new Date(2022, 8, 8, 0, 0, 0), y: 1.2 },
          { x: new Date(2022, 8, 8, 1, 0, 0), y: 1.4 },
          { x: new Date(2022, 8, 8, 4, 31, 0), y: 2.19 },
          { x: new Date(2022, 8, 8, 9, 28, 0), y: 0.7 },
          { x: new Date(2022, 8, 8, 12, 28, 0), y: 1.2 },
          { x: new Date(2022, 8, 8, 17, 26, 0), y: 0.5 },
          { x: new Date(2022, 8, 8, 18, 9, 0), y: 1 },
        ]
      },
      {
        type: "spline",
        name: "Sunrise & Sunset",
        showInLegend: true,
        markerType: 'none',
        lineColor: 'orange',
        dataPoints: [
          { x: new Date(2022, 8, 8, 7, 5, 0), y: 0 },
          { x: new Date(2022, 8, 8, 8, 6, 0), y: 2 },
          { x: new Date(2022, 8, 8, 9, 20, 0), y: 3.1 },
          { x: new Date(2022, 8, 8, 11, 6, 0), y: 3.8, markerImageUrl: "http://i.imgur.com/TUmQf5n.png" },
          { x: new Date(2022, 8, 8, 13, 4, 0), y: 3.85 },
          { x: new Date(2022, 8, 8, 15, 4, 0), y: 3.2 },
          { x: new Date(2022, 8, 8, 16, 40, 0), y: 2 },
          { x: new Date(2022, 8, 8, 18, 20, 0), y: 0 },
        ]
      },
    ]
  };
  return (
    <div>
      <span>Tide<span>Sunrise and Sunset</span></span>
      <CanvasJSChart
        containerProps={{ width: '700px'}}
        options={options1}
        // ref={chartRef}
        onRef = {ref => chartRef.current = ref}
			/>
    </div>
  );
}

export default DashboardChart;