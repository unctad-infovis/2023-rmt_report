import React, { useState, useEffect, memo } from 'react';
import '../styles/styles.less';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartLine.jsx';

// https://www.highcharts.com/demo/highcharts/bar-race
function Figure1() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el) => {
    const labels = Object.keys(el).filter(val => val !== 'Name').map(val => Date.UTC(parseInt(val, 10), 0, 1));
    const values = Object.values(el).map(val => (parseFloat(val))).filter(val => !Number.isNaN(val));

    return ({
      data: values.map((e, j) => ({
        x: labels[j],
        y: e,
      })),
      name: el.Name,
      zoneAxis: 'x',
      zones: [{
        value: Date.UTC(2021, 0, 1),
        dashStyle: 'Solid'
      }, {
        value: Date.UTC(2022, 0, 1),
        dashStyle: 'ShortDash'
      }, {
        value: Date.UTC(2027, 0, 1),
        dashStyle: 'ShortDot'
      }]
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2022-rmt_report/' : './'}assets/data/2022-rmt_report_figure_01.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON(body))));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="app">
      {dataFigure && (
      <ChartLine
        change
        data={dataFigure}
        data_decimals={1}
        idx="01"
        note="Data for 2022 are projections and for 2023 to 2027 are forecasts."
        source="UNCTAD secretariat, based on UNCTADstat data and Review of Maritime Transport, various issues."
        subtitle="International maritime trade, percentage annual change"
        line_width={4}
        show_only_first_and_last_labels={false}
        suffix="%"
        title="Maritime trade’s COVID-19 recovery expected to lose steam"
        ylabel=""
        ymax={10}
        ymin={-6}
        ytick_interval={2}
      />
      )}
    </div>
  );
}

export default memo(Figure1);
