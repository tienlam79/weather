import React, { useLayoutEffect, useRef, useMemo } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import { TIDE_COLOR, SUNRISE_COLOR, LEGEND_DATA, MARKER_SIZE } from './dashboard.constant';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const getOrdinalIndicator = (d) => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}

const DashboardChart = () => {
  const markers = useRef([]);
  const chartRef = useRef();
  const now = new Date();
  const options = useMemo(() => {
    return {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: `${now.getDate()}${getOrdinalIndicator(now.getDate())} ${now.toLocaleString('default', { month: 'long' })}`,
        fontColor: 'rgba(112, 112, 112)',
        fontSize: 20,
        padding: {
          bottom: 20,
        },
      },
      axisX: {
        valueFormatString: "HH:mm",
        gridThickness: 0,
        stripLines: [
          {
            value: new Date(2022, 8, 8, 11, 6, 0),
            label: "",
            color: '#e6e6e6'
          }
        ]
      },
      axisY: {
        gridThickness: 0,
        tickLength: 0,
        lineThickness: 0,
        labelFormatter: function(){
          return "";
        },
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        horizontalAlign: 'left',
        verticalAlign: "top",
      },
      data: [
        {
          type: "splineArea",
          name: "Tide",
          markerBorderColor: "white",
          markerBorderThickness: 2,
          markerType: 'none',
          showInLegend: false,
          color: TIDE_COLOR,
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
          showInLegend: false,
          markerType: 'none',
          lineColor: SUNRISE_COLOR,
          dataPoints: [
            { x: new Date(2022, 8, 8, 7, 5, 0), y: 0 },
            { x: new Date(2022, 8, 8, 8, 6, 0), y: 2 },
            { x: new Date(2022, 8, 8, 9, 20, 0), y: 3.1 },
            { x: new Date(2022, 8, 8, 11, 6, 0), y: 3.8, markerImageUrl: "http://i.imgur.com/TUmQf5n.png" },
            { x: new Date(2022, 8, 8, 13, 4, 0), y: 3.85 },
            { x: new Date(2022, 8, 8, 15, 4, 0), y: 3.2 },
            { x: new Date(2022, 8, 8, 16, 40, 0), y: 2},
            { x: new Date(2022, 8, 8, 18, 20, 0), y: 0 },
          ]
        },
      ]
    };
  }, []);

  useLayoutEffect(() => {
    if (chartRef.current) {
      addMarkerImages();
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const addMarkerImages = () => {
    const chart = chartRef.current;
    const sunData = chart.data[1].dataPoints;
    const markerItems = sunData.filter((item) => item.markerImageUrl);
    markers.current = markerItems.map((item) => {
      const img = document.createElement('img');
      img.src = item.markerImageUrl;
      img.style.width = `${MARKER_SIZE}px`;
      img.style.height = `${MARKER_SIZE}px`;
      img.style.display = 'none';
      positionMarkerImage(img, item);
      document.getElementsByClassName("canvasjs-chart-container")[0].appendChild(img);
      return { img, data: item };
    });
  }

  const positionMarkerImage = (img, data) => { 
    const chart = chartRef.current;
    const pixelX = chart.axisX[0].convertValueToPixel(data.x);
    const pixelY = chart.axisY[0].convertValueToPixel(data.y);

    if (img) {
      img.style.position = 'absolute';
      img.style.display = 'block';
      img.style.top = `${pixelY - MARKER_SIZE / 2}px`;
      img.style.left = `${pixelX - MARKER_SIZE / 2}px`;
    }
  }
  
  const handleResize = () => {
    for(let i=0;i<markers.current.length;i++) {
      positionMarkerImage(markers.current[i].img, markers.current[i].data);
    }
  }
  
  return (
    <div>
      <LegendChart data={LEGEND_DATA} />
      <div className='dashboardChart-content'>
        <CanvasJSChart
          onRef = {ref => chartRef.current = ref}
          containerProps={{ height: '200px', minWidth: '700px' }}
          options={options}
        />
      </div>
    </div>
  );
}

export default React.memo(DashboardChart);

const LegendChart = ({ data }) => {
  return (
    <ul className='legendChart-list'>
      {data.map((legend) => <li className='legendChart-item' key={legend.key} style={{ color: legend.color }}>{legend.title}</li>)}
    </ul>
  );
}

