import React, { useLayoutEffect } from 'react';
import { LEGEND_DATA, TIDE_DATA } from './dashboard.constant';

const colors = ['red', 'yellow', 'green', 'blue', 'pink', 'purple'];

const DashboardCanvas = () => {
  useLayoutEffect(() => {
    var myCanvas = document.getElementById("chartContainer");
    myCanvas.width = 3000;
    myCanvas.height = 300;
    const ctx = myCanvas.getContext("2d");
    try {
      drawCurveLine(ctx);
      drawTideLine(ctx);
    } catch(error) {
      console.log('error..', error);
    }
    // drawLine(ctx, 200, 200, 300, 300, "r ed");
    // drawArc(ctx, 250, 250, 150, 0, Math.PI/3, "red");
    // drawPieSlice(ctx, 250, 250, 150, Math.PI/2, Math.PI/2 + Math.PI/3, "green", "blue");
    // plotSine(ctx, 60, 20);
    // plotPoints(ctx);
    // drawLine(ctx, 0, 500, 21, 491.6588393923159, 'red');
    // drawLine(ctx, 0, 500, 22, 492.6969290237607, 'yellow');
    // drawLine(ctx, 0, 500, 23, 493.6482944024574, 'green');
  }, []);

  // const getMinX = () => {
  //   const max = TIDE_DATA[TIDE_DATA.length - 1];
  //   return new Date(max.x.getFullYear(), max.x.getMonth(), max.x.getDay(), 23, 59, 59);
  // }

  // const getMaxX = () => {
  //   const max = TIDE_DATA[TIDE_DATA.length - 1];
  //   return new Date(max.x.getFullYear(), max.x.getMonth(), max.x.getDay(), 23, 59, 59);
  // }

  // const calculateDistanceX = (ctx) => {
  //   const width = ctx.canvas.width;
    
  //   const minX = getMinX();
  //   const maxX = getMaxX();
    
  //   const distance =  Math.round((maxX - minX) / 1000 / 60);

  //   return Math.round(width / distance);
  // }

  const calculateX = (ctx, dataX) => {
    const width = ctx.canvas.width;

    const min = TIDE_DATA[0];
    const minX = new Date(min.x.getFullYear(), min.x.getMonth(), min.x.getDate(), 0, 0, 0);
    const max = TIDE_DATA[TIDE_DATA.length - 1];
    const maxX =  new Date(max.x.getFullYear(), max.x.getMonth(), max.x.getDate(), 23, 59, 59);
    return Math.round((dataX.getTime() - minX.getTime()) * width / (maxX.getTime() - minX.getTime()));
  }

  const calculateY = (ctx, dataY) => {
    const height = ctx.canvas.height;

    const itemMax = TIDE_DATA.reduce((acc, cur) => cur?.y > acc?.y ? cur : acc);
    const maxY = Math.round(itemMax?.y);

  
    return Math.round(dataY * height / maxY);
  }

  const drawTideLine = (ctx) => {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'blue';
    // ctx.moveTo(0, 0);

    const prevX = calculateX(ctx, TIDE_DATA[0].x);
    const prevY = calculateY(ctx, TIDE_DATA[0].y);

    for(let i = 0; i < TIDE_DATA.length; i++) {
      const x = calculateX(ctx, TIDE_DATA[i].x);
      const y = calculateY(ctx, TIDE_DATA[i].y);
      console.log('....y, x', x, y);
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  const drawCurveLine = (ctx) => {
    ctx.save();
    // Quadratic Bézier curve
    ctx.beginPath();
    ctx.moveTo(50, 20);
    ctx.quadraticCurveTo(230, 30, 50, 100);
    ctx.stroke();

    // Start and end points
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(50, 20, 5, 0, 2 * Math.PI);   // Start point
    ctx.arc(50, 100, 5, 0, 2 * Math.PI);  // End point
    ctx.fill();

    // Control point
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(230, 30, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }

  function generatePoints(ctx, nbOfPoints) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    const pts = [];
    for (let i = 0; i <= nbOfPoints; i++) {
      pts.push({
        x: i * (width / nbOfPoints),
        y: Math.random() * height
      });
    }
    return pts;
  }

  function plotSine(ctx, xOffset, yOffset) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var scale = 20;

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.fillStyle = 'blue';
    var x = 0;
    var y = 0;
    var amplitude = 40;
    var frequency = 100;
    // ctx.moveTo(0, 500);
    while (x < width) {
      y = height / 2 + amplitude * Math.sin((x+xOffset)/frequency);
      ctx.lineTo(x, y);
      x++;
      console.log('x:y', x, y);
    }
    ctx.stroke();
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fill();
    ctx.restore();
}

  function drawLine(ctx, startX, startY, endX, endY, color) {
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
  }
  
  function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();
    ctx.restore();
  }
  
  function drawPieSlice(
    ctx,
    centerX,
    centerY,
    radius,
    startAngle,
    endAngle,
    fillColor,
    strokeColor
  ) {
    ctx.save();
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  return (
    <div className='dashboardChart-container'>
      <LegendChart data={LEGEND_DATA} />
      <div className='dashboardChart-content'>
        <canvas id="chartContainer" style={{ border: '1px solid red' }}>
          Your browser does not support the HTML canvas tag.
        </canvas>
      </div>
    </div>
  );
}

const LegendChart = ({ data }) => {
  return (
    <ul className='dashboardChart-legend-list'>
      {data.map((legend) => <li className='dashboardChart-legend-item' key={legend.key} style={{ color: legend.color }}>{legend.title}</li>)}
    </ul>
  );
}

export default DashboardCanvas;
