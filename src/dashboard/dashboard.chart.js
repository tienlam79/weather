import React, { useLayoutEffect, useRef } from 'react';
import { LEGEND_DATA, TIDE_DATA, SUN_DATA, MOON_DATA, getChartTitle } from './dashboard.constant';
import SunIcon from './images/sun.svg';
import MoonIcon from './images/moon.svg';

const MAX_CHART_CONTENT_WIDTH = 1024;
const LG_CHART_WIDTH = 6000;
const XS_CHART_WIDTH = 3000;
const CHART_HEIGHT = 300;
const AXIS_X_HEIGHT = 30;
const IMG_SIZE = 30;
const SPACING_TOP = 100;

const LINE_HEIGHT = CHART_HEIGHT - AXIS_X_HEIGHT - SPACING_TOP;


const DashboardCanvas = () => {
  const sunCurveLines = useRef([]).current;
  const moonRects = useRef([]).current;
  const chartWidth = useRef(LG_CHART_WIDTH);

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
    chartWidth.current = window.innerWidth < 1024 ? XS_CHART_WIDTH : LG_CHART_WIDTH;
    initCanvas();
  }

  const initCanvas = () => {
    const myCanvas = document.getElementById("chartContainer");
    myCanvas.width = chartWidth.current;
    myCanvas.height = CHART_HEIGHT;
    const ctx = myCanvas.getContext("2d");
    if (ctx) {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      const chartHeight = height - AXIS_X_HEIGHT;
    
      drawAxisX(ctx);
      drawTideLine(ctx, width, chartHeight);
      drawSunriseLines(ctx, width, chartHeight);
      drawTideTooltips(ctx, width, height);
      drawMoonRect(ctx, width, chartHeight);
      initSunImgPosition(width, chartHeight);
    }
  }

  const initSunImgPosition = (width, height) => {
    const lines = SUN_DATA.map(item => calculateCurvePoints(width, height, item.x, item.y));
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
      sunImgElement.style.top = `${p.y - IMG_SIZE / 2 - SPACING_TOP}px`;
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
    const min = TIDE_DATA[0];
    return new Date(min.x.getFullYear(), min.x.getMonth(), min.x.getDate(), 0, 0, 0);
  }

  const getMaxDate = () => {
    const max = TIDE_DATA[TIDE_DATA.length - 1];
    return new Date(max.x.getFullYear(), max.x.getMonth(), max.x.getDate(), 23, 59, 59);
  }

  const calculateX = (width, dataX) => {
    const minDate = getMinDate();
    const maxDate = getMaxDate();
  
    return Math.round((dataX.getTime() - minDate.getTime()) * width / (maxDate.getTime() - minDate.getTime()));
  }

  const diffMinutes = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60));

  const addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes*60000);
}

  const drawLineTime = () => {
    const width = chartWidth.current;
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
    const itemMax = TIDE_DATA.reduce((acc, cur) => cur?.y > acc?.y ? cur : acc);
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

    ctx.strokeStyle = 'rgba(225, 147, 41)';
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.quadraticCurveTo(cp.x, cp.y, p2.x, p2.y);
    ctx.stroke();

    const temp = 20;
    drawAxisXLabel(ctx, x, p1.x - temp, p1.y + temp);
    drawAxisXLabel(ctx, y, p2.x - temp, p2.y + temp);
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
  }

  const drawRect = (ctx, width, height, x, y) => {
    const x1 = calculateX(width, x);
    const x2 = calculateX(width, y);

    moonRects.push({ x1, x2 });

    const rectWidth = x2 - x1;

    ctx.fillStyle = 'rgba(87, 87, 87, 0.4)';
    ctx.beginPath();
    ctx.fillRect(x1, 0, rectWidth, height);
    ctx.restore();
  }
  
  const drawAxisX = (ctx) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.fillStyle = 'rgba(231, 243, 255)';
    ctx.fillRect(0, height - AXIS_X_HEIGHT, width, AXIS_X_HEIGHT);
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
    width: `${IMG_SIZE}px`,
    height: `${IMG_SIZE}px`,
    left: `-${IMG_SIZE / 2 - 1}px`,
    top: 0,
    display: 'none'
  };

  return (
    <div className='dashboardChart-container'>
      <div className='dashboardChart-content' id='chartWrapper' style={{ maxWidth: `${MAX_CHART_CONTENT_WIDTH}px` }}>
        <canvas id="chartContainer">
          Your browser does not support the HTML canvas tag.
        </canvas>
      </div>
      <div className='dashboardChart-legend'>
        <ul className='dashboardChart-legend-list'>
          {LEGEND_DATA.map((legend) => <li className='dashboardChart-legend-item' key={legend.key} style={{ color: legend.color }}>{legend.title}</li>)}
        </ul>
      </div>
      <div className='dashboardChart-date' id='chartDate'></div>
      <div className='dashboardChart-line' id='chartLine' style={{ height: `${LINE_HEIGHT}px`, top: `${SPACING_TOP}px` }}>
        <img
          src={SunIcon}
          alt='sun-img'
          className='dashboardChart-sun-img'
          id='chartSunImg'
          style={imgStyle}
        />
        <img
          src={MoonIcon}
          alt='moon-img'
          className='dashboardChart-sun-img'
          id='chartMoonImg'
          style={{...imgStyle }}
        />
        <div id='chartDateTime' className='dashboardChart-time'>
        </div>
      </div>
    </div>
  );
}

export default DashboardCanvas;
