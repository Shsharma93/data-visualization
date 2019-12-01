const getRangePlusData = sensor_data => {
  if (sensor_data)
    return [
      [
        Math.min(...sensor_data.sensor0.slice(0, 199)),
        Math.max(...sensor_data.sensor0.slice(0, 199)),
      ],
      [
        Math.min(...sensor_data.sensor1.slice(0, 199)),
        Math.max(...sensor_data.sensor1.slice(0, 199)),
      ],
      [
        Math.min(...sensor_data.sensor2.slice(0, 199)),
        Math.max(...sensor_data.sensor2.slice(0, 199)),
      ],
      [
        Math.min(...sensor_data.sensor3.slice(0, 199)),
        Math.max(...sensor_data.sensor3.slice(0, 199)),
      ],
      [
        Math.min(...sensor_data.sensor4.slice(0, 199)),
        Math.max(...sensor_data.sensor4.slice(0, 199)),
      ],
      [
        Math.min(...sensor_data.sensor5.slice(0, 199)),
        Math.max(...sensor_data.sensor5.slice(0, 199)),
      ],
      [
        Math.min(...sensor_data.sensor6.slice(0, 199)),
        Math.max(...sensor_data.sensor6.slice(0, 199)),
      ],
      [
        Math.min(...sensor_data.sensor7.slice(0, 199)),
        Math.max(...sensor_data.sensor7.slice(0, 199)),
      ],
      [
        Math.min(...sensor_data.sensor8.slice(0, 199)),
        Math.max(...sensor_data.sensor8.slice(0, 199)),
      ],
      [
        Math.min(...sensor_data.sensor9.slice(0, 199)),
        Math.max(...sensor_data.sensor9.slice(0, 199)),
      ],
    ];
  else return null;
};

const getRangeMinusData = sensor_data => {
  if (sensor_data)
    return [
      [
        Math.min(...sensor_data.sensor0.slice(199, 399)),
        Math.max(...sensor_data.sensor0.slice(199, 399)),
      ],
      [
        Math.min(...sensor_data.sensor1.slice(199, 399)),
        Math.max(...sensor_data.sensor1.slice(199, 399)),
      ],
      [
        Math.min(...sensor_data.sensor2.slice(199, 399)),
        Math.max(...sensor_data.sensor2.slice(199, 399)),
      ],
      [
        Math.min(...sensor_data.sensor3.slice(199, 399)),
        Math.max(...sensor_data.sensor3.slice(199, 399)),
      ],
      [
        Math.min(...sensor_data.sensor4.slice(199, 399)),
        Math.max(...sensor_data.sensor4.slice(199, 399)),
      ],
      [
        Math.min(...sensor_data.sensor5.slice(199, 399)),
        Math.max(...sensor_data.sensor5.slice(199, 399)),
      ],
      [
        Math.min(...sensor_data.sensor6.slice(199, 399)),
        Math.max(...sensor_data.sensor6.slice(199, 399)),
      ],
      [
        Math.min(...sensor_data.sensor7.slice(199, 399)),
        Math.max(...sensor_data.sensor7.slice(199, 399)),
      ],
      [
        Math.min(...sensor_data.sensor8.slice(199, 399)),
        Math.max(...sensor_data.sensor8.slice(199, 399)),
      ],
      [
        Math.min(...sensor_data.sensor9.slice(199, 399)),
        Math.max(...sensor_data.sensor9.slice(199, 399)),
      ],
    ];
  else return null;
};

const getLineData = (sensor_data, sensorType) => {
  return sensor_data[sensorType].slice(0, 200);
};

export { getRangeMinusData, getRangePlusData, getLineData };
