import React from 'react';

class ChartMock {
  constructor() {
    this.axisX = [
      {
        convertValueToPixel: () => 0 
      }
    ];
    this.axisY = [
      {
        convertValueToPixel: () => 0
      }
    ];
  }

  destroy() {}

  render() {
    return <div class='canvasjs-chart-container'></div>
  }
}

export default ChartMock;