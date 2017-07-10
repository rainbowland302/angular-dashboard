import xlsx from 'node-xlsx';

const filePath1 = require('path').resolve(__dirname, '../assets/Hiring Req Track Sheet.xlsx');

// Column Name
const GROUP = 'Group';
const HIRING_STATUS = 'Hiring Status';
const POSITION_NUMBER = 'Req Number';

// Status
const ONBOARD = 'Onboard';
const OFFERED = 'Offered';
const OPEN = 'Open';

const isOnboard = str => typeof str === 'string' && str.toLowerCase().indexOf('board') >= 0;
const isOffered = str => typeof str === 'string' && str.toLowerCase().indexOf('offer') >= 0;
const isOpen = (status, positionNumber) => typeof positionNumber === 'string' && status === '' && positionNumber !== '';

export const getGroupHireStatus = () => {
  const positions = xlsx.parse(filePath1)[0].data;
  const hireGroup = getHireGroup(positions);
  return {
      hireGroup
  }
}

const getTargetColumn = (data, columnName) => {
  let headers = data[0],
    values = data.slice(1),
    columnIndex = headers.indexOf(columnName);
  return values.map(row => row[columnIndex]);
}


// return {name: string, filled: number, total: number}[]
const getHireGroup = (data) => {
  let groupNames = getTargetColumn(data, GROUP),
      statusValues = getTargetColumn(data, HIRING_STATUS),
      positionNumbers = getTargetColumn(data, POSITION_NUMBER);

  return groupNames.reduce((a, b, i) => {
    let existIndex = a.findIndex(str => str && str.name === b);
    if (existIndex >= 0) {
      //a[existIndex].total++;
      a[existIndex].onboard += isOnboard(statusValues[i]) ? 1 : 0;
      a[existIndex].offered += isOffered(statusValues[i]) ? 1 : 0;
      a[existIndex].open += isOpen(statusValues[i]) ? 1 : 0;
      return a;
    }
    return [...a, { name: b, onboard: isOnboard(statusValues[i]) ? 1 : 0, offered: isOffered(statusValues[i]) ? 1 : 0, open: isOpen(statusValues[i]) ? 1 : 0 }];
  }, []);
}


