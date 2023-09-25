import React, { useState, useEffect, memo } from 'react';
import '../styles/styles.less';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import roundNr from './helpers/RoundNr.js';

import ChartMapBar from './components/ChartMapBar.jsx';

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
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-rmt_report/' : './'}assets/data/2023-rmt_report_figure1.csv`;
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
      <ChartMapBar
        data={dataFigure}
        data_decimals={1}
        idx="02"
        note="Values for top three countries in 2023 for each segment are shown."
        source="UNCTADstat (UNCTAD, 2023a), Clarkson Research"
        subtitle="Percentage of world total, 2015–2023"
        suffix="%"
        title="Building, ownership, registration and recycling of ships"
        ylabel=""
      />
      )}
    </div>
  );
}

export default memo(Figure1);
