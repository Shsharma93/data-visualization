import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';
import classes from './app.module.scss';
import Select from 'react-select';

HighchartsMore(Highcharts);

const API_URL = 'http://0.0.0.0:7410/data';

const App = () => {
  const [data, setData] = useState(null);
  const [selectX, setSelectX] = useState(null);
  const [selectY, setSelectY] = useState(null);
  const [selectOptions, setSelectOptions] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const {
        data: { sensor_data },
      } = await axios.get(API_URL);

      setSelectOptions(
        Object.keys(sensor_data)
          .filter(item => item !== 'sample index' && item !== 'class_label')
          .map(item => {
            return {
              value: item,
              label: item,
            };
          }),
      );

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

  const handleChange = (selectedOption, axis) => {
    if (axis === 'x') {
      setSelectX(selectedOption);
    } else if (axis === 'y') {
      setSelectY(selectedOption);
    }
  };

  const getSelectOptions = class_label => {
    if (data && selectX) {
      return Object.keys(data)
        .filter(item =>
          class_label === 'minus'
            ? data[item].class_label === -1
            : data[item].class_label === 1,
        )
        .map(item => {
          return [data[item].sensor5, data[item].sensor1];
        });
    }
  };

  const graphOptions = {
    title: {
      text: 'My chart',
    },
    series: [
      {
        type: 'scatter',
        name: 'class_label -1',
        color: '#EC9A29',
        data: getSelectOptions('minus'),
      },
      {
        type: 'scatter',
        name: 'class_label +1',
        color: '#F24333',
        data: getSelectOptions('plus'),
      },
    ],
  };

  console.log(graphOptions);

  return (
    <div className={classes.container}>
      <div className={classes.graphSelect}>
        <div className={classes.selectOption}>
          <p>Y-Axis</p>
          <Select
            value={selectY}
            onChange={e => handleChange(e, 'y')}
            options={selectOptions}
          />
        </div>
        <div className={classes.graph}>
          <HighchartsReact highcharts={Highcharts} options={graphOptions} />
        </div>
      </div>
      <div className={classes.option}>
        <div className={classes.selectOption}>
          <Select
            value={selectX}
            onChange={e => handleChange(e, 'x')}
            options={selectOptions}
          />
          <p>X-Axis</p>
        </div>
      </div>
    </div>
  );
};

export default App;
