import xlsx from 'node-xlsx';

const filePath1 = require('path').resolve(__dirname, '../assets/Hiring Req Track Sheet.xlsx');
const filePath2 = require('path').resolve(__dirname, '../assets/Hiring Candidates Track Sheet.xlsx');

// Column Name
const GROUP = 'Group';
const HIRING_STATUS = 'Hiring Status';
const PHONE_INTERVIEW = 'Phone Interview Comments';
const ONSITE_INTERVIEW = 'TP/Onsite Interview Comments';

// Status
const ONBOARD = 'Onboard';
const OFFERED = 'Offered';
const OPEN = 'Open';
const FILLED = 'Filled';
const isOnboard = str => typeof str === 'string' && str.toLowerCase().indexOf('board') >= 0;
const isOffered = str => typeof str === 'string' && str.toLowerCase().indexOf('offer') >= 0;
const isOpen = str => typeof str === 'string' && str.toLowerCase().indexOf('open') >= 0;
const isFilled = str => isOffered(str) || isOnboard(str);

export const getPosition = () => {
  const positions = xlsx.parse(filePath1)[0].data;
  const candidates = xlsx.parse(filePath2)[0].data;
  const overviewGroup = getHireOverview(positions);
  const detailGroup = getPositionDeatil(candidates, positions);
  const hireGroup = getHireGroup(positions);
  return {
    overviewGroup,
    detailGroup,
    hireGroup
  }
}

// return {name: string, filled: number, total: number}[]
const getHireGroup = (data) => {
  let groupNames = getTargetColumn(data, GROUP),
    statusValues = getTargetColumn(data, HIRING_STATUS);

  return groupNames.reduce((a, b, i) => {
    let existIndex = a.findIndex(str => str && str.name === b);
    if (existIndex >= 0) {
      a[existIndex].total++;
      a[existIndex].filled += isFilled(statusValues[i]) ? 1 : 0;
      return a;
    }
    return [...a, { name: b, filled: isFilled(statusValues[i]) ? 1 : 0, total: 1 }];
  }, []);
}

// return [ {name: 'Onboard', value: number}, {name: 'Offered', value: number}, {name: 'Open', value: number} ]
const getHireOverview = (data) => {
  let statusValues = getTargetColumn(data, HIRING_STATUS);
  return statusValues.reduce((a, b) => {
    if (isOnboard(b)) a[0].value++;
    if (isOffered(b)) a[1].value++;
    if (isOpen(b)) a[2].value++;
    return a;
  }, [{ name: ONBOARD, value: 0 }, { name: OFFERED, value: 0 }, { name: OPEN, value: 0 }]);
}


// TODO this Handler is not yet completed
// [ {name: string, value: string } ]
const getPositionDeatil = (candidates, positions) => {
  let candidatesNumber = candidates.length,
    phoneInterviewNumber = getTargetColumn(candidates, PHONE_INTERVIEW).length,
    onsiteInterviewNumber = getTargetColumn(candidates, ONSITE_INTERVIEW).length;

  // hard code some TODO values
  return [
    { name: 'TTF', value: '25' },
    { name: 'Resume Screened', value: candidatesNumber },
    { name: 'Phone Screened', value: phoneInterviewNumber },
    { name: 'Onsite Interviews', value: onsiteInterviewNumber },
  ];
}

const getTargetColumn = (data, columnName) => {
  let headers = data[0],
    values = data.slice(1),
    columnIndex = headers.indexOf(columnName);
  return values.map(row => row[columnIndex]);
}
