import React, { memo } from 'react';
import '../styles/styles.less';

// Load helpers.
import ChartMapBar from './components/ChartMapBar.jsx';

// https://www.highcharts.com/demo/highcharts/bar-race
function Figure1() {
  // Data states.

  return (
    <div className="app">
      <ChartMapBar
        idx="02"
        note="Values for top three countries in 2023 for each segment are shown. GT=1 billion tonnes, DWT=Deadweight tonnage."
        source="UNCTADstat (UNCTAD, 2023a), Clarkson Research"
        subtitle="Percentage of world total, 2015–2023"
        suffix="%"
        title="Where are ships built, owned, registered and scrapped"
        ylabel=""
      />
    </div>
  );
}

export default memo(Figure1);
