import { render } from '@testing-library/react';
import App from './App';

jest.mock("./assets/canvasjs.min",  () => {
  return {
    Chart: require('./dashboard/dashboard.chart.mock').default
  }
});

test('renders learn react link', () => {
  render(<App />);
});
