import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import './chart.css'

const LineGraph = () => {
  const chartRef = useRef(null);
  const [casesData, setCasesData] = useState();

  useEffect(() => {
    const fetchCasesData = async () => {
      try {
        const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
        setCasesData(response.data);
      } catch (error) {
        console.error('Error fetching cases data:', error);
      }
    };

    fetchCasesData();
  }, []);

  useEffect(() => {
    const formatChartData = () => {
      if (casesData) {
        const { cases, deaths, recovered } = casesData;
        const casesDates = Object.keys(cases);
        const casesCounts = Object.values(cases);
        const deathsCounts = Object.values(deaths);
        const recoveredCounts = Object.values(recovered);

        return {
          labels: casesDates,
          datasets: [
            {
              label: 'Cases',
              data: casesCounts,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
            {
              label: 'Deaths',
              data: deathsCounts,
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
            },
            {
              label: 'Recovered',
              data: recoveredCounts,
              fill: false,
              borderColor: 'rgb(54, 162, 235)',
              tension: 0.1,
            },
          ],
        };
      }
    };

    if (casesData) {
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'COVID-19 Cases Fluctuations',
            fontSize: 16,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const datasetLabel = context.dataset.label || '';
                const value = context.parsed.y;
                const dataLabel = context.chart.data.labels[context.dataIndex];
                const cases = casesData.cases[dataLabel];
                const deaths = casesData.deaths[dataLabel];
                const recovered = casesData.recovered[dataLabel];

                return `${datasetLabel}: ${value} (Cases: ${cases}, Deaths: ${deaths}, Recovered: ${recovered})`;
              },
            },
          },
        },
      };

      const myChartRef = chartRef.current.getContext('2d');
      const myChart = new Chart(myChartRef, {
        type: 'line',
        data: formatChartData(),
        options,
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [casesData]);

  return (
    <div className='flact'>
      {casesData && <canvas ref={chartRef} />}
    </div>
  );
};

export default LineGraph;
