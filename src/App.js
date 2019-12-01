import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import Bellcurve from 'highcharts/modules/histogram-bellcurve';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';
import classes from './app.module.scss';
import { getRangePlusData, getRangeMinusData, getLineData } from './data';
import Select from 'react-select';

HighchartsMore(Highcharts);
Bellcurve(Highcharts);

const API_URL = 'http://0.0.0.0:7410/data';

const App = () => {
  const [data, setData] = useState(null);
  const [sensor_data, setSensor_data] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const {
        data: { sensor_data },
      } = await axios.get(API_URL);

      setSensor_data(sensor_data);

      let newData = {};
      const sampleLabel = sensor_data['sample index'];

      Object.keys(sampleLabel).forEach(sensor => {
        Object.keys(sensor_data).forEach(item => {
          if (item !== 'sample index') {
            newData[sampleLabel[sensor]] = {
              ...newData[sampleLabel[sensor]],
              [item]: sensor_data[item][sensor],
            };
          }
        });
      });
      setData(newData);
    } catch (error) {}
  };

  let graphOptions;

  if (selectedOption && selectedOption.value === 'column-range') {
    graphOptions = {
      title: {
        text: 'My chart',
      },
      series: [
        {
          name: 'class_label +1',
          color: '#EC9A29',
          type: 'columnrange',
          data: getRangePlusData(sensor_data),
        },
        {
          name: 'class_label -1',
          color: '#F24333',
          type: 'columnrange',
          data: getRangeMinusData(sensor_data),
        },
      ],
    };
  }

  // if (selectedOption && selectedOption.value === 'line-chart') {
  //   graphOptions = {
  //     title: {
  //       text: 'My chart',
  //     },
  //     series: [
  //       {
  //         name: 'sensor0',
  //         color: '#EC9A29',
  //         type: 'line',
  //         data: getLineData(sensor_data, 'sensor0'),
  //       },
  //       {
  //         name: 'sensor1',
  //         color: '#F24333',
  //         type: 'line',
  //         data: getLineData(sensor_data, 'sensor1'),
  //       },
  //       {
  //         name: 'sensor2',
  //         color: '#009b72',
  //         type: 'line',
  //         data: getLineData(sensor_data, 'sensor2'),
  //       },
  //       {
  //         name: 'sensor3',
  //         color: '#009b72',
  //         type: 'line',
  //         data: getLineData(sensor_data, 'sensor3'),
  //       },
  //     ],
  //   };
  // }

  if (selectedOption && selectedOption.value === 'line-chart') {
    graphOptions = {
      title: {
        text: 'My chart',
      },
      xAxis: [
        {
          title: {
            text: 'Data',
          },
          alignTicks: false,
        },
        {
          title: {
            text: 'Bell curve',
          },
          alignTicks: false,
          opposite: true,
        },
      ],
      yAxis: [
        {
          title: { text: 'Data' },
        },
        {
          title: { text: 'Bell curve' },
          opposite: true,
        },
      ],
      series: [
        {
          name: 'Bell curve',
          type: 'histogram', //bellcurve
          color: '#FFb161',
          xAxis: 1,
          yAxis: 1,
          baseSeries: 1,
          zIndex: -1,
        },
        {
          name: 'Data',
          type: 'scatter',
          color: '#00171F',
          data: getLineData(sensor_data, 'sensor3'),
          marker: {
            radius: 2,
          },
        },
      ],
    };
  }

  const selectOtions = [
    { value: 'column-range', label: 'Column Range Graph' },
    { value: 'line-chart', label: 'Line Graph' },
  ];

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  console.log(data);

  return (
    <div className={classes.container}>
      <div className={classes.graph}>
        <HighchartsReact highcharts={Highcharts} options={graphOptions} />
      </div>
      <div className={classes.select}>
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={selectOtions}
        />
      </div>
    </div>
  );
};

export default App;
