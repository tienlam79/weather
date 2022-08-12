import React, { useLayoutEffect } from 'react';
import { LEGEND_DATA } from './dashboard.constant';

const colors = ['red', 'yellow', 'green', 'blue', 'pink', 'purple'];

const DashboardCanvas = () => {
  useLayoutEffect(() => {
    var myCanvas = document.getElementById("chartContainer");
    myCanvas.width = 1000;
    myCanvas.height = 300;
    const ctx = myCanvas.getContext("2d");
    // drawLine(ctx, 200, 200, 300, 300, "r ed");
    // drawArc(ctx, 250, 250, 150, 0, Math.PI/3, "red");
    // drawPieSlice(ctx, 250, 250, 150, Math.PI/2, Math.PI/2 + Math.PI/3, "green", "blue");
    plotSine(ctx, 60, 20);
    // plotPoints(ctx);
    // drawLine(ctx, 0, 500, 21, 491.6588393923159, 'red');
    // drawLine(ctx, 0, 500, 22, 492.6969290237607, 'yellow');
    // drawLine(ctx, 0, 500, 23, 493.6482944024574, 'green');
  }, []);

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
    <div className='dashboardChart-content'>
      <LegendChart data={LEGEND_DATA} />
      <canvas id="chartContainer" width="700" height="200" style={{ border: '1px solid red'}}>
        Your browser does not support the HTML canvas tag.
      </canvas>
      {/* <canvas id="canvas2" width="700" height="200">
        Your browser does not support the HTML canvas tag.
      </canvas> */}
    </div>
  );
}

const LegendChart = ({ data }) => {
  return (
    <ul className='legendChart-list'>
      {data.map((legend) => <li className='legendChart-item' key={legend.key} style={{ color: legend.color }}>{legend.title}</li>)}
    </ul>
  );
}

export default DashboardCanvas;
