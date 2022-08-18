import React, { useLayoutEffect, useRef } from 'react';
import { sunIcon, moonIcon } from 'assets/images';
import { getTime, getChartTitle, diffMinutes, addMinutes } from 'helpers/utils';
import Constants from 'helpers/constants';
import Colors from 'helpers/colors';
import './dashboard.chart.scss';

const DashboardChart = ({ tideData, sunData, moonData }) => {
  const sunCurveLines = useRef([]).current;
  const moonRects = useRef([]).current;

  useLayoutEffect(() => {
    initCanvas();

    const scrollElement = document.querySelector("#chartWrapper");
    scrollElement.addEventListener('scroll', onScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      scrollElement.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleResize = () => {
    initCanvas();
    
  }

  const initCanvas = () => {
    const myCanvas = document.getElementById("chartContainer");
    myCanvas.width = window.innerWidth <= 1024 ? Constants.XS_CHART_WIDTH : Constants.LG_CHART_WIDTH;
    myCanvas.height = Constants.CHART_HEIGHT;
    const ctx = myCanvas.getContext("2d");
    if (ctx) {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      const chartHeight = height - Constants.AXIS_X_HEIGHT;
    
      drawAxisX(ctx);
      drawTideLine(ctx, width, chartHeight);
      drawSunriseLines(ctx, width, chartHeight);
      drawTideTooltips(ctx, width, height);
      drawMoonRect(ctx, width, chartHeight);
      drawLineTime();
      initSunImgPosition(width, chartHeight);
    }
  }

  const initSunImgPosition = (width, height) => {
    const lines = sunData.map(item => calculateCurvePoints(width, height, item.x, item.y));
    calculateSunImgPosition(lines);
  }

  const getOffsetX = () => {
    const scrollElement = document.querySelector("#chartWrapper");
    const vLineElement = document.querySelector("#chartLine");
    const x = scrollElement?.scrollLeft + vLineElement?.offsetLeft;
    return x;
  }

  const calculateSunImgPosition = (sunCurveLines) => {
    const sunImgElement = document.querySelector("#chartSunImg");
    const x = getOffsetX();

    const curveLine = sunCurveLines.find(p => x >= p.p1.x && x <= p.p2.x);
    if (curveLine) {
      const t = (x - curveLine.p1.x) / (curveLine.p2.x - curveLine.p1.x);
      const p = getQuadraticCurvePoint(
        curveLine.p1.x,
        curveLine.p1.y,
        curveLine.cp.x,
        curveLine.cp.y,
        curveLine.p2.x,
        curveLine.p2.y,
        t
      );
      sunImgElement.style.display = 'block';
      sunImgElement.style.top = `${p.y - Constants.IMG_SIZE / 2 - Constants.SPACING_TOP}px`;
    } else {
      sunImgElement.style.display = `none`;
    }
  }

  const calculateMoonImgPosition = () => {
    const moonImgElement = document.querySelector("#chartMoonImg");
    const x = getOffsetX();

    const rect = moonRects.find(p => x >= p.x1 && x <= p.x2);
    if (rect) {
      moonImgElement.style.display = 'block';
    } else {
      moonImgElement.style.display = 'none';
    }
  }

  const onScroll = () => {
    calculateSunImgPosition(sunCurveLines);
    calculateMoonImgPosition();
    drawLineTime();
  }

  const getMinDate = () => {
    const min = tideData[0];
    return new Date(min.x.getFullYear(), min.x.getMonth(), min.x.getDate(), 0, 0, 0);
  }

  const getMaxDate = () => {
    const max = tideData[tideData.length - 1];
    return new Date(max.x.getFullYear(), max.x.getMonth(), max.x.getDate(), 23, 59, 59);
  }

  const calculateX = (width, dataX) => {
    const minDate = getMinDate();
    const maxDate = getMaxDate();
  
    return Math.round((dataX.getTime() - minDate.getTime()) * width / (maxDate.getTime() - minDate.getTime()));
  }

  const drawLineTime = () => {
    const myCanvas = document.getElementById("chartContainer");
    const width = myCanvas.width;
    const x = getOffsetX();

    const minDate = getMinDate();
    const maxDate = getMaxDate();
    const distance = diffMinutes(minDate, maxDate);

    const minutes = Math.round(x * distance / width);
    const currDate = addMinutes(minDate, minutes);

    document.getElementById("chartDateTime").innerHTML = getTime(currDate);
    document.getElementById('chartDate').innerHTML = getChartTitle(currDate);
  }

  const calculateY = (height, dataY) => {
    const itemMax = tideData.reduce((acc, cur) => cur?.y > acc?.y ? cur : acc);
    const maxY = Math.round(itemMax?.y);

    return Math.round(height - (dataY * (height - 100) / maxY));
  }

  const getQBezierValue = (t, p1, p2, p3) => {
    const iT = 1 - t;
    return iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
  }
  
  const getQuadraticCurvePoint = (startX, startY, cpX, cpY, endX, endY, position) => {
    return {
      x: getQBezierValue(position, startX, cpX, endX),
      y: getQBezierValue(position, startY, cpY, endY),
    };
  }

  const drawTideLine = (ctx, width, height) => {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = Colors.malibu1;
    ctx.moveTo(0, height / 1.5);

    for (let i = 0; i < tideData.length; i++) {
      var currentNode = tideData[i];
      var nextNode = tideData[i+1];
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
    ctx.fillStyle = Colors.malibu;
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fill();
    ctx.restore();
  }

  const drawTideTooltips = (ctx, width, height) => {
    const tWidth = 65, tHeight = 40;
    for (let i = 0; i < tideData.length; i++) {
      const x = calculateX(width, tideData[i].x);
      const y = calculateY(height, tideData[i].y);

      drawRoundedRect(ctx, x - tWidth / 2, y - tHeight, tWidth, tHeight, 5);
      drawTooltipText(ctx, x - tWidth / 2 + 10, y - 20, tideData[i].x, tideData[i].y);
    }
  }

  const drawTooltipText = (ctx, x, y, dataX, dataY) => {
    const time = getTime(dataX);

    drawText(ctx, x, y, `${dataY.toFixed(2)} m`, 16, Colors.blue);
    drawText(ctx, x, y + 15, time, 12, Colors.blue);
  }
  
  const drawSunriseLines = (ctx, width, height) => {
    for (let i = 0; i < sunData.length; i ++) {
      drawCurveLine(ctx, width, height, sunData[i].x, sunData[i].y);
    }
  }

  const calculateCurvePoints = (width, height, x, y) => {
    const x1 = calculateX(width, x);
    const x2 = calculateX(width, y);
    
    const cx = x1 + ((x2 - x1) / 2);
    const cy = 0;

    const p1 = { x: x1, y: height };
    const cp = { x: cx, y: cy };
    const p2 = { x: x2, y: height };

    return { p1, p2, cp };
  }

  const drawCurveLine = (ctx, width, height, x, y) => {
    const { p1, p2, cp } = calculateCurvePoints(width, height, x, y);
    sunCurveLines.push({ p1, p2, cp });

    ctx.strokeStyle = Colors.fireBush;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.quadraticCurveTo(cp.x, cp.y, p2.x, p2.y);
    ctx.stroke();

    const temp = 20;
    drawAxisXLabel(ctx, x, p1.x - temp, p1.y + temp);
    drawAxisXLabel(ctx, y, p2.x - temp, p2.y + temp);
    ctx.restore();
  }

  const drawAxisXLabel = (ctx, date,  x , y) => {
    const text = getTime(date);
    drawText(ctx, x, y, text, 14, Colors.neonCarrot);
  }

  const drawText = (ctx, x, y, text, size, color) => {
    ctx.fillStyle = color;
    ctx.font = `bold ${size}px serif`;
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  const drawMoonRect = (ctx, width, height) => {
    for (let i = 0; i < moonData.length; i++) {
      drawRect(ctx, width, height, moonData[i].x, moonData[i].y);
    }
  }

  const drawRect = (ctx, width, height, x, y) => {
    const x1 = calculateX(width, x);
    const x2 = calculateX(width, y);

    moonRects.push({ x1, x2 });

    const rectWidth = x2 - x1;

    ctx.fillStyle = Colors.doveGray;
    ctx.beginPath();
    ctx.fillRect(x1, 0, rectWidth, height);
    ctx.restore();
  }
  
  const drawAxisX = (ctx) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.fillStyle = Colors.solitude;
    ctx.fillRect(0, height - Constants.AXIS_X_HEIGHT, width, Constants.AXIS_X_HEIGHT);
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
  
  const imgStyle = {
    width: `${Constants.IMG_SIZE}px`,
    height: `${Constants.IMG_SIZE}px`,
    left: `-${Constants.IMG_SIZE / 2 - 1}px`,
    top: 0,
    display: 'none'
  };

  return (
    <div className='dashboard-chart-container'>
      <div className='dashboard-chart-content' id='chartWrapper' style={{ maxWidth: `${Constants.MAX_CHART_CONTENT_WIDTH}px` }}>
        <canvas id="chartContainer">
          Your browser does not support the HTML canvas tag.
        </canvas>
      </div>
      <div className='dashboard-chart-legend'>
        <ul className='dashboard-chart-legend-list'>
          {Constants.LEGEND_DATA.map((legend) => <li className='dashboard-chart-legend-item' key={legend.key} style={{ color: legend.color }}>{legend.title}</li>)}
        </ul>
      </div>
      <div className='dashboard-chart-date' id='chartDate'></div>
      <div className='dashboard-chart-line' id='chartLine' style={{ height: `${Constants.CHART_HEIGHT - Constants.AXIS_X_HEIGHT - Constants.SPACING_TOP}px`, top: `${Constants.SPACING_TOP}px` }}>
        <img
          src={sunIcon}
          alt='sun-img'
          className='dashboard-chart-sun-img'
          id='chartSunImg'
          style={imgStyle}
        />
        <img
          src={moonIcon}
          alt='moon-img'
          className='dashboard-chart-sun-img'
          id='chartMoonImg'
          style={{...imgStyle }}
        />
        <div id='chartDateTime' className='dashboard-chart-time'>
        </div>
      </div>
    </div>
  );
}

export default DashboardChart;
