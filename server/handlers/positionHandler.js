import xlsx from 'node-xlsx';

const filePath1 = require('path').resolve(__dirname, '../assets/Hiring Req Track Sheet.xlsx');
const filePath2 = require('path').resolve(__dirname, '../assets/Hiring Candidates Track Sheet.xlsx');

// Column Name
const GROUP = 'Group';
const HIRING_STATUS = 'Hiring Status';
const PHONE_INTERVIEW = 'Phone Interview Comments';
const ONSITE_INTERVIEW = 'TP/Onsite Interview Comments';
const DEGREE = 'Degree';
const YEAR_OF_EXP = 'Years of Experience';

// Status
const OPEN = 'open';
const FILLED = 'filled';

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
      a[existIndex].filled += statusValues[i] === 'filled' ? 1 : 0;
      return a;
    }
    return [...a, { name: b, filled: statusValues[i] === 'filled' ? 1 : 0, total: 1 }];
  }, []);
}

// return [ {name: 'open', value: number}, {name: 'filled', value: number} ]
const getHireOverview = (data) => {
  let statusValues = getTargetColumn(data, HIRING_STATUS);
  return statusValues.reduce((a, b) => {
    if (b === OPEN) a[0].value++;
    if (b === FILLED) a[1].value++;
    return a;
  }, [{ name: OPEN, value: 0 }, { name: FILLED, value: 0 }]);
}


// TODO this Handler is not yet completed
// [ {name: string, value: string } ]
const getPositionDeatil = (candidates, positions) => {
  let candidatesNumber = candidates.length,
    positionNumber = positions.length,
    phoneInterviewNumber = getTargetColumn(candidates, PHONE_INTERVIEW).length,
    onsiteInterviewNumber = getTargetColumn(candidates, ONSITE_INTERVIEW).length,
    offerQuality = `${positionNumber}/${candidatesNumber}`,
    masterDegreeNumber = getTargetColumn(candidates, DEGREE).reduce((count, degree) => {
      if (degree === 'master') {
        count += 1;
      }
      return count;
    }, 0),
    masterDegreePercent = Math.round((masterDegreeNumber / candidatesNumber) * 100) + '%',
    workingYearSum = getTargetColumn(candidates, YEAR_OF_EXP).reduce((count, workingYear) => {
      return count + parseInt(workingYear); // as we convert value to string in common place
    }, 0),
    averageWorkingYear = (workingYearSum / candidatesNumber).toPrecision(2);

    // hard code some TODO values
    return [
      { name: 'TTF', value: '25' },
      { name: 'Resume Screened', value: candidatesNumber },
      { name: 'Phone Screened', value: phoneInterviewNumber },
      { name: 'Onsite Interviews', value: onsiteInterviewNumber },
      { name: 'Matrix Interviews', value: '120' }, // this value id not defined yet, keep it same as onsite interview
      { name: 'Offer Quality', value: offerQuality },
      { name: 'Master + Degree', value: masterDegreePercent },
      { name: 'From China Top 20 Unv.', value: '65%' },
      { name: 'From MNC', value: '70%' },
      { name: 'Avg. Working Yr', value: averageWorkingYear }
    ];
}

const getTargetColumn = (data, columnName) => {
  let headers = data[0],
    values = data.slice(1),
    columnIndex = headers.indexOf(columnName);
  return values.map(row => row[columnIndex]);
}
