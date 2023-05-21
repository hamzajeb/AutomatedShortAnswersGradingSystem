import React from 'react';
import { Bar } from 'react-chartjs-2';

const AverageScoresChart = ({ averageScores }) => {
  // Extraire les labels et les données du tableau averageScores
  const labels = Object.keys(averageScores);
  const data = Object.values(averageScores).map(score => score.average);

  // Configuration du graphique à barres
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'la moyenne des scores des questions',
        data: data,
        backgroundColor: '#d1a08c',
        borderColor: '#d1a08c',
        borderWidth: 1,
      },
    ],
  };

  // Options du graphique à barres
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default AverageScoresChart;
