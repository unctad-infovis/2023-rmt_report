import React, {
  useEffect, useCallback, useRef, memo, useState, useMemo
} from 'react';
import PropTypes from 'prop-types';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';

// https://www.highcharts.com/
import Highcharts from 'highcharts';
import highchartsMap from 'highcharts/modules/map';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import highchartsExporting from 'highcharts/modules/exporting';
import highchartsExportData from 'highcharts/modules/export-data';

import map_data_import from '../data/UNWorldmap.js';

// Load helpers.
highchartsMap(Highcharts);
highchartsAccessibility(Highcharts);
highchartsExporting(Highcharts);
highchartsExportData(Highcharts);

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    downloadCSV: 'Download CSV data',
    thousandsSep: ','
  }
});
Highcharts.seriesType('mapcolumn', 'column', {
  animation: {
    duration: 500
  },
  dataLabels: {
    enabled: false
  }
}, {
  drawPoints() {
    // Proceed
    Highcharts.seriesTypes.column.prototype.drawPoints.call(this);

    // Custom
    const series = this;
    const { points } = series;
    const firstSeries = series.chart.series[0];

    Highcharts.each(points, (point, index) => {
      // This index needs to be adjusted.
      const area = firstSeries.points[series.index - 4];
      point.graphic.attr({
        x: area.plotX + index * 15 - 20 + area.options.xOffset,
        y: area.plotY - point.graphic.attr('height') + area.options.yOffset
      });
    });
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

function MapBarChart({
  chart_height, idx, note, source, subtitle, title
}) {
  const chartRef = useRef();
  const chart = useRef();
  const [rangeValue, setRangeValue] = useState(2023);
  const [once, setOnce] = useState(false);

  const data = useMemo(() => ({
    2015: [
      // name, first value, second value, third value, fourth, value, xoffset, yoffset
      ['Bangladesh', 0.024, 0.096, 0.115, 19.595, 5, 110],
      ['China', 35.895, 8.81, 4.47, 23.675, -15, 5],
      ['Greece', 0.0, 16.011, 4.289, 0.0, -60, 40],
      ['India', 0.148, 1.233, 0.891, 30.707, -65, 130],
      ['Japan', 21.036, 13.098, 1.77, 0.068, 20, 92],
      ['Korea, Republic of', 34.356, 4.557, 1.016, 0.024, 61, -10],
      ['Liberia', 0.0, 0.002, 11.498, 0.0, -20, 90],
      ['Marshall Islands (the)', 0.0, 0.073, 10.157, 0.0, -20, 60],
      ['Pakistan', 0.0, 0.041, 0.041, 18.352, -50, 60],
      ['Panama', 0.0, 0.127, 19.138, 0.0, -50, 40]
    ],
    2016: [
      // name, first value, second value, third value, fourth, value, xoffset, yoffset
      ['Bangladesh', 0.034, 0.079, 0.096, 34.337, 5, 110],
      ['China', 37.237, 8.783, 4.239, 19.127, -15, 5],
      ['Greece', 0.006, 16.36, 4.059, 0.0, -60, 40],
      ['India', 0.044, 1.217, 0.904, 21.954, -65, 130],
      ['Japan', 19.004, 12.586, 1.802, 0.0140, 20, 92],
      ['Korea, Republic of', 35.0, 4.373, 0.94, 0.0, 61, -10],
      ['Liberia', 0.0, 0.007, 11.459, 0.0, -20, 90],
      ['Marshall Islands (the)', 0.0, 0.086, 10.945, 0.0, -20, 60],
      ['Pakistan', 0.0, 0.039, 0.039, 19.249, -50, 60],
      ['Panama', 0.0, 0.077, 18.39, 0.0, -50, 40]
    ],
    2017: [
      // name, first value, second value, third value, fourth, value, xoffset, yoffset
      ['Bangladesh', 0.009, 0.103, 0.1, 32.413, 5, 110],
      ['China', 33.49, 8.754, 4.256, 11.964, -15, 5],
      ['Greece', 0.014, 16.964, 3.858, 0.0, -60, 40],
      ['India', 0.056, 1.256, 0.929, 32.196, -65, 130],
      ['Japan', 20.011, 12.043, 1.867, 0.017, 20, 92],
      ['Korea, Republic of', 38.117, 4.37, 0.807, 0.033, 61, -10],
      ['Liberia', 0.0, 0.012, 11.621, 0.0, -20, 90],
      ['Marshall Islands (the)', 0.0, 0.051, 11.581, 0.0, -20, 60],
      ['Pakistan', 0.0, 0.041, 0.038, 18.639, -50, 60],
      ['Panama', 0.0, 0.078, 18.33, 0.0, -50, 40]
    ],
    2018: [
      // name, first value, second value, third value, fourth, value, xoffset, yoffset
      ['Bangladesh', 0.034, 0.127, 0.108, 28.928, 5, 110],
      ['China', 36.039, 9.683, 4.676, 16.323, -15, 5],
      ['Greece', 0.004, 17.374, 3.722, 0.0, -60, 40],
      ['India', 0.147, 1.26, 0.956, 29.286, -65, 130],
      ['Japan', 19.956, 11.608, 1.946, 0.003, 20, 92],
      ['Korea, Republic of', 34.418, 4.016, 0.719, 0.012, 61, -10],
      ['Liberia', 0.0, 0.011, 11.563, 0.0, -20, 90],
      ['Marshall Islands (the)', 0.0, 0.03, 12.286, 0.0, -20, 60],
      ['Pakistan', 0.0, 0.04, 0.037, 17.878, -50, 60],
      ['Panama', 0.0, 0.067, 17.315, 0.0, -50, 40]
    ],
    2019: [
      // name, first value, second value, third value, fourth, value, xoffset, yoffset
      ['Bangladesh', 0.041, 0.137, 0.123, 45.434, 5, 110],
      ['China', 40.072, 10.766, 4.976, 2.466, -15, 5],
      ['Greece', 0.018, 17.631, 3.492, 0.0, -60, 40],
      ['India', 0.045, 1.215, 0.877, 24.617, -65, 130],
      ['Japan', 24.877, 11.355, 1.971, 0.023, 20, 92],
      ['Korea, Republic of', 25.21, 3.897, 0.655, 0.014, 61, -10],
      ['Liberia', 0.0, 0.018, 12.256, 0.0, -20, 90],
      ['Marshall Islands (the)', 0.0, 0.031, 12.348, 0.0, -20, 60],
      ['Pakistan', 0.0, 0.038, 0.036, 21.103, -50, 60],
      ['Panama', 0.0, 0.056, 16.774, 0.0, -50, 40]
    ],
    2020: [
      // name, first value, second value, third value, fourth, value, xoffset, yoffset
      ['Bangladesh', 0.086, 0.164, 0.16, 55.602, 5, 110],
      ['China', 35.008, 11.273, 4.983, 2.852, -15, 5],
      ['Greece', 0.01, 17.808, 3.33, 0.014, -60, 40],
      ['India', 0.031, 1.258, 0.843, 27.246, -65, 130],
      ['Japan', 24.642, 11.28, 1.965, 0.011, 20, 92],
      ['Korea, Republic of', 32.878, 3.921, 0.722, 0.059, 61, -10],
      ['Liberia', 0.0, 0.023, 13.275, 0.0, -20, 90],
      ['Marshall Islands (the)', 0.0, 0.029, 12.639, 0.0, -20, 60],
      ['Pakistan', 0.0, 0.05, 0.042, 2.725, -50, 60],
      ['Panama', 0.0, 0.059, 15.875, 0.017, -50, 40]
    ],
    2021: [
      // name, first value, second value, third value, fourth, value, xoffset, yoffset
      ['Bangladesh', 0.148, 0.169, 0.171, 40.431, 5, 110],
      ['China', 40.262, 11.751, 5.188, 1.36, -15, 5],
      ['Greece', 0.0, 17.658, 3.011, 0.0, -60, 40],
      ['India', 0.037, 1.249, 0.8, 29.12, -65, 130],
      ['Japan', 22.206, 11.37, 1.828, 0.0, 20, 92],
      ['Korea, Republic of', 31.462, 4.067, 0.737, 0.163, 61, -10],
      ['Liberia', 0.0, 0.018, 14.018, 0.0, -20, 90],
      ['Marshall Islands (the)', 0.0, 0.039, 12.823, 0.0, -20, 60],
      ['Pakistan', 0.0, 0.066, 0.041, 17.989, -50, 60],
      ['Panama', 0.0, 0.046, 16.111, 0.0, -50, 40]
    ],
    2022: [
      // name, first value, second value, third value, fourth, value, xoffset, yoffset
      ['Bangladesh', 0.062, 0.2, 0.197, 54.937, 5, 110],
      ['China', 44.198, 12.818, 5.355, 0.987, -15, 5],
      ['Greece', 0.007, 17.759, 2.798, 0.005, -60, 40],
      ['India', 0.119, 1.227, 0.768, 16.12, -65, 130],
      ['Japan', 17.648, 10.833, 1.818, 0.037, 20, 92],
      ['Korea, Republic of', 32.391, 4.231, 0.711, 0.183, 61, -10],
      ['Liberia', 0.0, 0.021, 15.245, 0.0, -20, 90],
      ['Marshall Islands (the)', 0.0, 0.054, 13.159, 0.0, -20, 60],
      ['Pakistan', 0.0, 0.07, 0.039, 18.126, -50, 60],
      ['Panama', 0.0, 0.05, 15.902, 0.0, -50, 40]
    ],
    2023: [
      // name, first value, second value, third value, fourth, value, xoffset, yoffset
      ['Bangladesh', 0.076, 0.222, 0.226, 38.129, 5, 110],
      ['China', 46.588, 13.401, 5.471, 2.371, -15, 5],
      ['Greece', 0.001, 17.441, 2.597, 0.004, -60, 40],
      ['India', 0.072, 1.363, 0.798, 30.981, -65, 130],
      ['Japan', 17.246, 10.547, 1.836, 0.073, 20, 92],
      ['Korea, Republic of', 29.245, 4.311, 0.831, 0.24, 61, -10],
      ['Liberia', 0.0, 0.02, 16.647, 0.0, -20, 90],
      ['Marshall Islands (the)', 0.0, 0.062, 13.163, 0.0, -20, 60],
      ['Pakistan', 0.0, 0.079, 0.048, 17.23, -50, 60],
      ['Panama', 0.0, 0.041, 16.064, 0.023, -50, 40]
    ]
  }), []);

  const isVisible = useIsVisible(chartRef, { once: true });

  const updateChart = (current_year_idx) => {
    current_year_idx = parseInt(current_year_idx, 10);
    setRangeValue(current_year_idx);
    // This index needs to be adjusted.
    for (let i = 0; i < (chart.current.series.length - 8); i++) {
      // This index needs to be adjusted.
      chart.current.series[i + 4].update({
        data: [{
          color: '#009edb',
          name: 'Building',
          y: data[current_year_idx][i][1]
        }, {
          color: '#72bf44',
          name: 'Ownership',
          y: data[current_year_idx][i][2]
        }, {
          color: '#f58220',
          name: 'Registration',
          y: data[current_year_idx][i][3]
        }, {
          color: '#a066aa',
          name: 'Scrapping',
          y: data[current_year_idx][i][4]
        }]
      }, false);
    }
    chart.current.setTitle({
      text: `${title} in ${current_year_idx}?`
    });
    chart.current.redraw(true);
  };

  const createChart = useCallback((map_data) => {
    if (once === false) {
      chart.current = Highcharts.mapChart(`chartIdx${idx}`, {
        caption: {
          align: 'left',
          margin: 15,
          style: {
            color: 'rgba(0, 0.0, 0.0, 0.8)',
            fontSize: '14px'
          },
          text: `<em>Source:</em> ${source} ${note ? (`<br /><em>Note:</em> <span>${note}</span>`) : ''}`,
          useHTML: true,
          verticalAlign: 'bottom',
          x: 0
        },
        chart: {
          map: map_data,
          animation: false,
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
              r: 0.0,
              areas: {
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
            color: 'rgba(0, 0.0, 0.0, 0.8)',
            fontFamily: 'Roboto',
            fontWeight: 400
          }
        },
        colors: ['rgba(0, 73, 135, 0.8)'],
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
          align: 'left',
          floating: true,
          itemHoverStyle: {
            color: '#000',
            cursor: 'default',
            fontSize: 14,
            fontWeight: 600,
            textOutline: '1px solid #fff'
          },
          itemStyle: {
            color: '#000',
            cursor: 'default',
            fontSize: 14,
            fontWeight: 600,
            textOutline: '1px solid #fff'
          },
          layout: 'vertical',
          verticalAlign: 'top',
          x: 0.0,
          y: 130
        },
        mapNavigation: {
          buttonOptions: {
            verticalAlign: 'bottom'
          },
          enabled: false,
          enableDoubleClickZoomTo: false
        },
        mapView: {
          center: [20, 10],
          projection: {
            name: 'EqualEarth',
          },
          zoom: 1.5
        },
        plotOptions: {
          series: {
            animation: false,
            borderColor: 'rgba(0, 0.0, 0.0, 0.3)',
            borderRadius: 0.0,
            events: {
              legendItemClick: (e) => {
                e.preventDefault();
              }
            },
            pointWidth: 15
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
          borderColor: 'rgba(255, 255, 255, 0.5)',
          data: data[2015],
          enableMouseTracking: false,
          joinBy: ['name_en', 'id'],
          keys: ['id', 'Building', 'Ownership', 'Registration', 'Scrapping', 'xOffset', 'yOffset'],
          map_data,
          nullColor: 'rgba(222, 217, 213, 0.5)',
          showInLegend: false
        }, {
          color: 'transparent',
          data: [{
            geometry: {
              coordinates: [-75 - 11.31 - 27, 8.5 - 25],
              type: 'Point'
            },
            name: 'Panama'
          }, {
            geometry: {
              coordinates: [(-18 - 11.31), -38],
              type: 'Point'
            },
            name: 'Liberia'
          }, {
            geometry: {
              coordinates: [(-4 - 11.31), 12],
              type: 'Point'
            },
            name: 'Greece'
          }, {
            geometry: {
              coordinates: [(45 - 11.31), -2],
              type: 'Point'
            },
            name: 'Pakistan'
          }, {
            geometry: {
              coordinates: [(57 - 11.31), -40],
              type: 'Point'
            },
            name: 'India'
          }, {
            geometry: {
              coordinates: [(100 - 11.31), -28],
              type: 'Point'
            },
            name: 'Bangladesh'
          }, {
            geometry: {
              coordinates: [(90 - 11.31), 22],
              type: 'Point'
            },
            name: 'China'
          }, {
            geometry: {
              coordinates: [(138 - 11.31), -10],
              type: 'Point'
            },
            name: 'Japan'
          }, {
            geometry: {
              coordinates: [(174 - 11.31), 22],
              type: 'Point'
            },
            dataLabels: {
              style: {
                textAnchor: 'middle'
              }
            },
            name: 'Korea,<br />Republic of'
          }, {
            geometry: {
              coordinates: [(198 - 11.31), -30],
              type: 'Point'
            },
            dataLabels: {
              style: {
                textAnchor: 'middle'
              }
            },
            name: 'Marshall<br />Islands (the)'
          }],
          dataLabels: {
            style: {
              fontSize: 16,
              fontWeight: 400,
              textOutline: '2px solid #fff'
            }
          },
          enableMouseTracking: false,
          showInLegend: false,
          type: 'mappoint'
        }, {
          accessibility: {
            enabled: false
          },
          color: 'rgba(130, 130, 130, 0.5)',
          enableMouseTracking: false,
          name: 'Connectors',
          showInLegend: false,
          type: 'mapline',
          zIndex: 5
        }, {
          accessibility: {
            exposeAsGroupOnly: true
          },
          animation: false,
          data: [{
            color: '#666',
            geometry: {
              coordinates: [[-100, 0], [-94, 7]],
              type: 'LineString'
            },
            name: 'Panama'
          }, {
            color: '#666',
            geometry: {
              coordinates: [[-23, -10], [-22, 4]],
              type: 'LineString'
            },
            name: 'Liberia'
          }, {
            color: '#666',
            geometry: {
              coordinates: [[-10, 30], [7, 37]],
              type: 'LineString'
            },
            name: 'Greece'
          }, {
            color: '#666',
            geometry: {
              coordinates: [[59, -10], [61, 11]],
              type: 'LineString'
            },
            name: 'India'
          }, {
            color: '#666',
            geometry: {
              coordinates: [[50, 11], [53, 23]],
              type: 'LineString'
            },
            name: 'Pakistan'
          }, {
            color: '#666',
            geometry: {
              coordinates: [[89, -10], [82, 22]],
              type: 'LineString'
            },
            name: 'Bangladesh'
          }, {
            color: '#666',
            geometry: {
              coordinates: [[120, 15], [123, 32]],
              type: 'LineString'
            },
            name: 'Japan'
          }, {
            color: '#666',
            geometry: {
              coordinates: [[155, 55], [120, 38]],
              type: 'LineString'
            },
            name: 'Korea, Republic of'
          }],
          id: 'lines',
          lineWidth: 1.5,
          name: 'lines',
          showInLegend: false,
          type: 'mapline'
        }],
        subtitle: {
          align: 'left',
          enabled: true,
          style: {
            color: 'rgba(0, 0.0, 0.0, 0.8)',
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
          margin: 30,
          style: {
            color: '#000',
            fontSize: '30px',
            fontWeight: 700,
            lineHeight: '34px'
          },
          text: `${title} in 2023?`,
          widthAdjust: -144,
          x: 100
        },
        tooltip: {
          enabled: true
        },
        yAxis: {
          visible: false,
          max: 150
        },
        xAxis: {
          visible: false
        }
      });
      // Add the pies after chart load, optionally with offset and connectors
      data[rangeValue].forEach(area => {
        // Add the pie for this area
        chart.current.addSeries({
          data: [{
            color: '#009edb',
            name: 'Building',
            y: area[1]
          }, {
            color: '#72bf44',
            name: 'Ownership',
            y: area[2]
          }, {
            color: '#f58220',
            name: 'Registration',
            y: area[3]
          }, {
            color: '#a066aa',
            name: 'Scrapping',
            y: area[4]
          }],
          id: area[0],
          enableMouseTracking: false,
          name: area[0],
          showInLegend: false,
          type: 'mapcolumn',
          zIndex: 6
        }, false);
      });
      chart.current.addSeries({
        color: '#009edb',
        data: false,
        name: 'Built (gt)',
        showInLegend: true,
        type: 'mapcolumn'
      });
      chart.current.addSeries({
        color: '#72bf44',
        data: false,
        name: 'Owned (dwt)',
        showInLegend: true,
        type: 'mapcolumn'
      });
      chart.current.addSeries({
        color: '#f58220',
        data: false,
        name: 'Registered (dwt)',
        showInLegend: true,
        type: 'mapcolumn'
      });
      chart.current.addSeries({
        color: '#a066aa',
        data: false,
        name: 'Scrapped (gt)',
        showInLegend: true,
        type: 'mapcolumn'
      });
      // Only redraw once all pies and connectors have been added
      chart.current.redraw(true);
      chartRef.current.querySelector(`#chartIdx${idx}`).style.opacity = 1;
      setOnce(true);
    }
  }, [chart_height, data, idx, note, setOnce, once, source, rangeValue, subtitle, title]);

  useEffect(() => {
    if (isVisible === true) {
      setTimeout(() => {
        createChart(map_data_import);
      }, 300);
    }
  }, [createChart, isVisible]);

  return (
    <div className="chart_container" style={{ minHeight: chart_height, maxWidth: '700px' }}>
      <div className="play_controls">
        <input className="play_range_map" type="range" aria-label="Range" value={rangeValue} min={2015} max={2023} onChange={(event) => updateChart(event.currentTarget.value)} />
        <h3>{rangeValue}</h3>
      </div>
      <div className="infotext">Change the year value using the slider</div>
      <div ref={chartRef}>
        {(isVisible) && (<div className="chart" id={`chartIdx${idx}`} />)}
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

MapBarChart.propTypes = {
  chart_height: PropTypes.number,
  idx: PropTypes.string.isRequired,
  note: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  source: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired
};

MapBarChart.defaultProps = {
  chart_height: 520,
  note: false,
  subtitle: ''
};

export default memo(MapBarChart);
