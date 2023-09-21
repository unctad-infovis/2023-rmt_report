import React, {
  useEffect, useCallback, useRef, memo, useState
} from 'react';
import PropTypes from 'prop-types';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';

// https://www.highcharts.com/
import Highcharts from 'highcharts';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import highchartsExporting from 'highcharts/modules/exporting';
import highchartsExportData from 'highcharts/modules/export-data';

// Load helpers.
import countryCodes from '../helpers/CountryCodes.js';
import formatNr from '../helpers/FormatNr.js';

highchartsAccessibility(Highcharts);
highchartsExporting(Highcharts);
highchartsExportData(Highcharts);

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    downloadCSV: 'Download CSV data',
    thousandsSep: ' '
  }
});
Highcharts.SVGRenderer.prototype.symbols.download = (x, y, w, h) => {
  const path = [
    // Arrow stem
    'M', x + w * 0.5, y,
    'L', x + w * 0.5, y + h * 0.7,
    // Arrow head
    'M', x + w * 0.3, y + h * 0.5,
    'L', x + w * 0.5, y + h * 0.7,
    'L', x + w * 0.7, y + h * 0.5,
    // Box
    'M', x, y + h * 0.9,
    'L', x, y + h,
    'L', x + w, y + h,
    'L', x + w, y + h * 0.9
  ];
  return path;
};

/*
 * Animate dataLabels functionality
 */
// eslint-disable-next-line
(function (H) {
  const FLOAT = /^-?\d+\.?\d*$/;

  // Add animated textSetter, just like fill/strokeSetters
  // eslint-disable-next-line
  H.Fx.prototype.textSetter = function () {
    let startValue = this.start.replace(/ /g, '');
    let endValue = this.end.replace(/ /g, '');
    let currentValue = this.end.replace(/ /g, '');

    if ((startValue || '').match(FLOAT)) {
      startValue = parseInt(startValue, 10);
      endValue = parseInt(endValue, 10);

      // No support for float
      currentValue = Highcharts.numberFormat(Math.round(startValue + (endValue - startValue) * this.pos), 0);
    }

    this.elem.endText = this.end;

    this.elem.attr(this.prop, currentValue, null, true);
  };

  // Add textGetter, not supported at all at this moment:
  // eslint-disable-next-line
  H.SVGElement.prototype.textGetter = function () {
    const ct = this.text.element.textContent || '';
    return this.endText ? this.endText : ct.substring(0, ct.length / 2);
  };

  // Temporary change label.attr() with label.animate():
  // In core it's simple change attr(...) => animate(...) for text prop
  // eslint-disable-next-line
  H.wrap(H.Series.prototype, 'drawDataLabels', function (proceed) {
    const { attr } = H.SVGElement.prototype;
    const { chart } = this;

    if (chart.sequenceTimer) {
      this.points.forEach(point => (point.dataLabels || []).forEach(
      // eslint-disable-next-line
        label => (label.attr = function (hash) {
          if (
            hash && hash.text !== undefined && chart.isResizing === 0
          ) {
            const { text } = hash;

            delete hash.text;

            return this.attr(hash).animate({ text });
          }
          // eslint-disable-next-line
          return attr.apply(this, arguments);
        })
      ));
    }

    // eslint-disable-next-line
    const ret = proceed.apply(this, Array.prototype.slice.call(arguments, 1));

    // eslint-disable-next-line
    this.points.forEach(p => (p.dataLabels || []).forEach(d => (d.attr = attr)));

    return ret;
  });
}(Highcharts));

function BarRaceChart({
  chart_height, data, idx, note, source, subtitle, title
}) {
  const chartRef = useRef();
  const startYear = 1980;
  const endYear = 2023;
  const btn = document.getElementsByClassName('play-pause-button')[0];
  const input = document.getElementsByClassName('play-range')[0];
  const nbr = 15;
  const chart = useRef();
  const [rangeValue, setRangeValue] = useState(0);

  const getData = useCallback((year) => {
    year = parseInt(year, 10);
    const output = Object.entries(data).map(country => {
      const countryName = country[1].name;
      const countryData = country[1].data;
      return [countryName, countryData[year - startYear].value];
    }).sort((a, b) => b[1] - a[1]);
    return [output[0], output.slice(1, nbr)];
  }, [data]);

  const getSubtitle = useCallback(() => {
    const total = (getData(input.value)[0][1]).toFixed(0);
    return `<div class="year">${input.value}</div><div class="total">Total: ${formatNr(total)} tonnes</div>`;
  }, [getData, input]);

  const pause = () => {
    btn.title = 'play';
    btn.className = 'fa fa-play  play-pause-button';
    clearTimeout(chart.current.sequenceTimer);
    chart.current.sequenceTimer = undefined;
  };

  const updateChart = (year_idx) => {
    document.getElementsByClassName('meta_data')[0].innerHTML = getSubtitle();

    chart.current.series[0].update({
      name: year_idx,
      data: getData(year_idx)[1]
    });
  };

  const update = (increment) => {
    if (increment) {
      input.value = parseInt(input.value, 10) + increment;
    }
    if (input.value >= endYear) {
      pause(btn);
    }
    updateChart(input.value);
  };

  const play = () => {
    btn.title = 'pause';
    btn.className = 'fa fa-pause  play-pause-button';
    chart.current.sequenceTimer = setInterval(() => {
      update(1);
    }, 500);
  };

  const togglePlay = () => {
    if (chart.current.sequenceTimer) {
      pause();
    } else {
      play();
    }
  };
  const changeYear = (event) => {
    pause();
    updateChart(event.currentTarget.value);
    setRangeValue(event.currentTarget.value);
  };

  const isVisible = useIsVisible(chartRef, { once: true });
  const createChart = useCallback(() => {
    chart.current = Highcharts.chart(`chartIdx${idx}`, {
      caption: {
        align: 'left',
        margin: 15,
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontSize: '14px'
        },
        text: `<em>Source:</em> ${source} ${note ? (`<br /><em>Note:</em> <span>${note}</span>`) : ''}`,
        useHTML: true,
        verticalAlign: 'bottom',
        x: 0
      },
      chart: {
        animation: {
          duration: 500
        },
        height: chart_height,
        events: {
          load() {
            // eslint-disable-next-line react/no-this-in-sfc
            this.renderer.image('https://unctad.org/sites/default/files/2022-11/unctad_logo.svg', 5, 15, 80, 100).add();
          }
        },
        marginRight: 50,
        resetZoomButton: {
          theme: {
            fill: '#fff',
            r: 0,
            states: {
              hover: {
                fill: '#0077b8',
                stroke: 'transparent',
                style: {
                  color: '#fff'
                }
              }
            },
            stroke: '#7c7067',
            style: {
              fontFamily: 'Roboto',
              fontSize: '13px',
              fontWeight: 400
            }
          }
        },
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontFamily: 'Roboto',
          fontWeight: 400
        },
        type: 'bar',
        zoomType: 'x'
      },
      colors: ['#009edb'],
      credits: {
        enabled: false
      },
      exporting: {
        buttons: {
          contextButton: {
            menuItems: ['viewFullscreen', 'separator', 'downloadPNG', 'downloadPDF', 'separator', 'downloadCSV'],
            symbol: 'download',
            symbolFill: '#000'
          }
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        bar: {
          animation: false,
          borderWidth: 0,
          colorByPoint: true,
          cursor: 'pointer',
          dataSorting: {
            enabled: true,
            matchByName: true
          },
          groupPadding: 0,
          pointPadding: 0.075
        },
        series: {
          dataLabels: [{
            enabled: true,
            style: {
              fontWeight: 600,
              fontSize: 13
            },
            y: 6
          }, {
            enabled: true,
            format: '{point.name}',
            style: {
              fontWeight: 'normal',
              opacity: 0.7,
              fontSize: 12
            },
            y: -8
          }]
        }
      },
      responsive: {
        rules: [{
          chartOptions: {
            legend: {
              layout: 'horizontal'
            },
            title: {
              margin: 20,
              style: {
                fontSize: '26px',
                lineHeight: '30px'
              }
            }
          },
          condition: {
            maxWidth: 500
          }
        }]
      },
      series: [{
        data: getData(startYear)[1],
        name: startYear,
        type: 'bar'
      }],
      subtitle: {
        align: 'left',
        enabled: true,
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '18px'
        },
        text: subtitle,
        widthAdjust: -144,
        x: 100
      },
      title: {
        align: 'left',
        margin: 50,
        style: {
          color: '#000',
          fontSize: '30px',
          fontWeight: 700,
          lineHeight: '34px'
        },
        text: title,
        widthAdjust: -144,
        x: 100
      },
      tooltip: {
        enabled: false
      },
      xAxis: {
        categories: data[0].labels,
        crosshair: {
          color: 'transparent',
          width: 1
        },
        reserveSpace: true,
        labels: {
          formatter: (el) => `<img src="./assets/img/flags/${countryCodes(el.value)}.png" class="flag" />`,
          distance: 10,
          padding: 0,
          rotation: 0,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 400
          },
          useHTML: true
        },
        lineColor: 'transparent',
        lineWidth: 0,
        opposite: false,
        plotLines: null,
        showFirstLabel: true,
        showLastLabel: true,
        tickWidth: 0,
        title: {
          enabled: false
        },
        type: 'category'
      },
      yAxis: {
        accessibility: {
          description: 'Index'
        },
        allowDecimals: true,
        gridLineColor: 'rgba(124, 112, 103, 0.2)',
        gridLineWidth: 1,
        gridLineDashStyle: 'shortdot',
        labels: {
          rotation: 0,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 400
          }
        },
        endOnTick: false,
        lineColor: 'transparent',
        lineWidth: 0,
        opposite: true,
        startOnTick: false,
        plotLines: [{
          color: 'rgba(124, 112, 103, 0.6)',
          value: 0,
          width: 1
        }],
        showFirstLabel: true,
        showLastLabel: true,
        tickPixelInterval: 150,
        title: {
          enabled: true,
          reserveSpace: true,
          rotation: 0,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          },
          text: '',
          verticalAlign: 'top',
        },
        type: 'linear'
      }
    });
    chartRef.current.querySelector(`#chartIdx${idx}`).style.opacity = 1;
  }, [chart_height, data, idx, note, source, getData, subtitle, title]);

  useEffect(() => {
    if (isVisible === true) {
      setTimeout(() => {
        createChart();
        document.getElementsByClassName('meta_data')[0].innerHTML = getSubtitle();
      }, 300);
    }
  }, [createChart, getSubtitle, isVisible]);

  return (
    <div className="chart_container" style={{ minHeight: chart_height, maxWidth: '700px' }}>
      <div className="play-controls">
        <button type="button" className="fa fa-play play-pause-button" aria-label="Play Pause" title="play" onClick={(event) => togglePlay(event)} />
        <input className="play-range" type="range" aria-label="Range" value={rangeValue} min={startYear} max={endYear} onInput={(event) => changeYear(event)} onChange={(event) => changeYear(event)} />
      </div>
      <div ref={chartRef}>
        {(isVisible) && (<div className="chart" id={`chartIdx${idx}`} />)}
      </div>
      <div className="meta_data" />
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

BarRaceChart.propTypes = {
  chart_height: PropTypes.number,
  data: PropTypes.instanceOf(Array).isRequired,
  idx: PropTypes.string.isRequired,
  note: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  source: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired
};

BarRaceChart.defaultProps = {
  chart_height: 800,
  note: false,
  subtitle: ''
};

export default memo(BarRaceChart);
