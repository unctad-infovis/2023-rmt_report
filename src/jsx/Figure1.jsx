import React, { useState, useEffect, memo } from 'react';
import '../styles/styles.less';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import roundNr from './helpers/RoundNr.js';

import ChartBarRace from './components/ChartBarRace.jsx';

// https://www.highcharts.com/demo/highcharts/bar-race
function Figure1() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el) => {
    const values = Object.values(el).map(val => (val === '' ? 0 : roundNr(parseFloat(val), 0))).filter(val1 => !Number.isNaN(val1));
    return ({
      data: values.map((e) => ({
        value: e
      })),
      name: el.Name
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-rmt_report/' : (window.location.href.includes('localhost:80')) ? './' : 'https://unctad-infovis.github.io/2023-rmt_report/'}assets/data/2023-rmt_report_figure1_update.csv`;
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
      <ChartBarRace
        data={dataFigure}
        data_decimals={1}
        idx="01"
        note=""
        source="UNCTAD secretariat"
        subtitle="Top 15 national fleets, deadweight tonnage, 1000 dwt, annual, 1980–2023"
        show_only_first_and_last_labels={false}
        suffix="%"
        title="Who has the world’s largest fleet"
        ylabel=""
      />
      )}
    </div>
  );
}

export default memo(Figure1);
