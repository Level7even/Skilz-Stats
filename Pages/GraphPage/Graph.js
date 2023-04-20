// Import Chart.js library
import Chart from 'chart.js';

// Create chart data
const data = {
  labels: ['10', '20', '30', '40', '50'],
  datasets: [{
    label: 'DMG',
    data: [10, 20, 30, 40, 50],
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1
  }]
};

// Create chart options
const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

// Create chart instance
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: data,
  options: options
});