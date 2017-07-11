import xlsx from 'node-xlsx';

import {
  getTargetColumn,
} from './utils'

const filePath = require('path').resolve(__dirname, '../assets/Hiring Req Track Sheet.xlsx');

// Column Name
const GROUP = 'Group';
const STATUS = 'Hiring Status';
const NUMBER = 'Req Number';

const isOnboard = str => typeof str === 'string' && str.toLowerCase().indexOf('board') >= 0;
const isOffered = str => typeof str === 'string' && str.toLowerCase().indexOf('offer') >= 0;
const isOpen = (status, positionNumber) => typeof positionNumber === 'string' && status === '' && positionNumber !== '';

export const reqHandler = () => {
  const rawData = xlsx.parse(filePath)[0].data;
  return getHireGroup(rawData);
}

// return {name: string, filled: number, total: number}[]
const getHireGroup = (data) => {
  let groupNames = getTargetColumn(data, GROUP),
    statusValues = getTargetColumn(data, STATUS),
    positionNumbers = getTargetColumn(data, NUMBER);

  return groupNames.reduce((a, b, i) => {
    let existIndex = a.findIndex(str => str && str.name === b);
    if (existIndex >= 0) {
      a[existIndex].onboard += isOnboard(statusValues[i]) ? 1 : 0;
      a[existIndex].offered += isOffered(statusValues[i]) ? 1 : 0;
      a[existIndex].open += isOpen(statusValues[i]) ? 1 : 0;
      return a;
    }
    return [...a, {
      name: b,
      onboard: isOnboard(statusValues[i]) ? 1 : 0,
      offered: isOffered(statusValues[i]) ? 1 : 0,
      open: isOpen(statusValues[i]) ? 1 : 0
    }];
  }, []);
}
