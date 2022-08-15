import React, { useLayoutEffect } from 'react';
import { LEGEND_DATA, TIDE_DATA, SUN_DATA, MOON_DATA } from './dashboard.constant';

const X_HEIGHT = 30;

const DashboardCanvas = () => {
  useLayoutEffect(() => {
    var myCanvas = document.getElementById("chartContainer");
    myCanvas.width = 6000;
    myCanvas.height = 300;
    const ctx = myCanvas.getContext("2d");

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const chartHeight = height - X_HEIGHT;
  
    drawAxisX(ctx);
    drawTideLine(ctx, width, chartHeight);
    drawSunriseLines(ctx, width, chartHeight);
    drawTideTooltips(ctx, width, height);
    drawMoonRect(ctx, width, chartHeight);
  }, []);

  const calculateX = (width, dataX) => {
    const min = TIDE_DATA[0];
    const minX = new Date(min.x.getFullYear(), min.x.getMonth(), min.x.getDate(), 0, 0, 0);
  
    const max = TIDE_DATA[TIDE_DATA.length - 1];
    const maxX =  new Date(max.x.getFullYear(), max.x.getMonth(), max.x.getDate(), 23, 59, 59);
  
    return Math.round((dataX.getTime() - minX.getTime()) * width / (maxX.getTime() - minX.getTime()));
  }

  const calculateY = (height, dataY) => {
    const itemMax = TIDE_DATA.reduce((acc, cur) => cur?.y > acc?.y ? cur : acc);
    const maxY = Math.round(itemMax?.y);

    return Math.round(height - (dataY * (height - 100) / maxY));
  }

  const drawTideLine = (ctx, width, height) => {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(107, 215, 244)';
    ctx.moveTo(0, height / 1.5);

    for (let i = 0; i < TIDE_DATA.length; i++) {
      var currentNode = TIDE_DATA[i];
      var nextNode = TIDE_DATA[i+1];
      if (nextNode) {
        const cx = calculateX(width, currentNode.x);
        const cy = calculateY(height, currentNode.y);
  
        const nx = calculateX(width, nextNode.x);
        const ny = calculateY(height, nextNode.y);
  
        var xc = (cx + nx) / 2;
        var yc = (cy + ny) / 2;
        ctx.quadraticCurveTo(cx, cy, xc, yc);
      }
    }
    ctx.stroke();
    ctx.fillStyle = 'rgba(134, 222, 246)';
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fill();
    ctx.restore();
  }

  const drawTideTooltips = (ctx, width, height) => {
    const tWidth = 65, tHeight = 40;
    for (let i = 0; i < TIDE_DATA.length; i++) {
      const x = calculateX(width, TIDE_DATA[i].x);
      const y = calculateY(height, TIDE_DATA[i].y);

      drawRoundedRect(ctx, x - tWidth / 2, y - tHeight, tWidth, tHeight, 5);
      drawTooltipText(ctx, x - tWidth / 2 + 10, y - 20, TIDE_DATA[i].x, TIDE_DATA[i].y);
    }
  }

  const drawTooltipText = (ctx, x, y, dataX, dataY) => {
    const time = getTime(dataX);

    drawText(ctx, x, y, `${dataY.toFixed(2)} m`, 16, 'rgba(0, 123, 165)');
    drawText(ctx, x, y + 15, time, 12, 'rgba(0, 123, 165)');
  }
  
  const drawSunriseLines = (ctx, width, height) => {
    for (let i = 0; i < SUN_DATA.length; i ++) {
      drawCurveLine(ctx, width, height, SUN_DATA[i].x, SUN_DATA[i].y);
    }
  }

  const drawCurveLine = (ctx, width, height, x, y) => {
    const x1 = calculateX(width, x);
    const x2 = calculateX(width, y);
    
    const cx = x1 + ((x2 - x1) / 2);
    const cy = 0;

    ctx.strokeStyle = 'rgba(225, 147, 41)';
    ctx.beginPath();
    ctx.moveTo(x1, height);
    ctx.quadraticCurveTo(cx, cy, x2, height);
    ctx.stroke();

    const temp = 20;

    drawAxisXLabel(ctx, x, x1 - temp, height + temp);
    drawAxisXLabel(ctx, y, x2 - temp, height + temp);

    ctx.restore();
  }

  const getTime = (date) => {
    const h = date.getHours();
    const m = date.getMinutes();
    return `${h >= 10 ? h : `0${h}`}:${m >= 10 ? m: `0${m}`} ${h > 12 ? 'pm': 'am'}`;
  }

  const drawAxisXLabel = (ctx, date,  x , y) => {
    const text = getTime(date);
    drawText(ctx, x, y, text, 14, 'rgba(255, 147, 44)');
  }

  const drawText = (ctx, x, y, text, size, color) => {
    ctx.fillStyle = color;
    ctx.font = `bold ${size}px serif`;
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  const drawMoonRect = (ctx, width, height) => {
    for (let i = 0; i < MOON_DATA.length; i++) {
      drawRect(ctx, width, height, MOON_DATA[i].x, MOON_DATA[i].y);
    }
    ctx.restore();
  }

  const drawRect = (ctx, width, height, x, y) => {
    const pointX = calculateX(width, x);
    const pointY = calculateX(width, y);

    const rectWidth = pointY - pointX;

    ctx.fillStyle = 'rgba(87, 87, 87, 0.4)';
    ctx.beginPath();
    ctx.fillRect(pointX, 0, rectWidth, height);
  }
  
  const drawAxisX = (ctx) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.fillStyle = 'rgba(231, 243, 255)';
    ctx.fillRect(0, height - X_HEIGHT, width, X_HEIGHT);
    ctx.restore();
  }

  const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.fill();
    ctx.restore();
  }

  const drawSinLine = (ctx) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'green';
    ctx.moveTo(0, height / 2);
    for(let i = 0; i < width; i++) { 
      ctx.lineTo(i, height / 2 + Math.sin(i * 0.01) * 100);
    }
    ctx.stroke();
  }

  const drawCurveLine1 = (ctx) => {
    const height = ctx.canvas.height;
    // ctx.save();
    // Quadratic Bézier curve
    // // ctx.beginPath();
    // ctx.lineWidth = 2;
    // ctx.strokeStyle = 'red';
    // ctx.moveTo(50, 20);
    // cp1x, cp1y, x, y
    // ctx.quadraticCurveTo(100, 50, 50, 100);
    // ctx.quadraticCurveTo(199, 14, 0, height / 2);
    // ctx.quadraticCurveTo(0, 199, 441, 173);

    ctx.beginPath();
    ctx.moveTo(75, 25);
    ctx.quadraticCurveTo(25, 25, 25, 62.5);
    ctx.stroke();

    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(75, 25, 5, 0, Math.PI * 2);
    ctx.arc(25, 62.5, 5, 0, Math.PI * 2);
    ctx.fill();

    // {x: 199, y: 14}
    // 1: {x: 441, y: 173}
    // 2: {x: 676, y: 30}
    // 3: {x: 947, y: 252}
    // 4: {x: 1221, y: 14}
    // 5: {x: 1474, y: 194}
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.quadraticCurveTo(199, 14, 441, 173);
    // ctx.quadraticCurveTo(676, 30, 199, 199);
    // ctx.quadraticCurveTo(676, 30, 947, 252);
    ctx.stroke();

    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(199, 14, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(25, 25, 5, 0, 2 * Math.PI);
    ctx.fill();
    // ctx.quadraticCurveTo(25, 100, 50, 100);
    // ctx.quadraticCurveTo(50, 120, 30, 125);
    // ctx.quadraticCurveTo(60, 120, 65, 100);
    // ctx.quadraticCurveTo(125, 100, 125, 62.5);
    // ctx.quadraticCurveTo(125, 25, 75, 25);
    ctx.stroke();
    // ctx.stroke();
    // ctx.restore();

    // Start and end points
    // ctx.fillStyle = 'blue';
    // ctx.beginPath();
    //x, y, radius, startAngle, endAngle
    // ctx.arc(50, 20, 10, 0, 2 * Math.PI);   // Start point
    // ctx.arc(50, 100, 10, 0, 2 * Math.PI);  // End point
    // ctx.fill();

    // Control point
    // ctx.fillStyle = 'red';
    // ctx.beginPath();
    // ctx.arc(230, 30, 5, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.restore();
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
      <div className='dashboardChart-content'>
        <canvas id="chartContainer">
          Your browser does not support the HTML canvas tag.
        </canvas>
      </div>
      <div className='dashboardChart-legend'>
        <ul className='dashboardChart-legend-list'>
          {LEGEND_DATA.map((legend) => <li className='dashboardChart-legend-item' key={legend.key} style={{ color: legend.color }}>{legend.title}</li>)}
        </ul>
      </div>
      <div className='dashboardChart-line' />
      <img
        src="http://i.imgur.com/TUmQf5n.png"
        alt='sun-img'
        className='dashboardChart-sun-img'
      />
    </div>
  );
}

export default DashboardCanvas;
