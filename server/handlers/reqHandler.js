import xlsx from 'node-xlsx';

import { getTargetColumn, reduceByGroup, flatGroup } from './utils/tools';
import { isOnboard, isOffered, isOpen } from './utils/criterions';

const filePath = require('path').resolve(__dirname, '../assets/Isilon Hiring Req Track Sheet.xlsx');

// Column Name
const GROUP = 'Group';
const STATUS = 'Hiring Status';
const NUMBER = 'Req Number';

const GROUP_MAP = {
  'IME DEV': 'IME Dev',
  'IME Sustaining': 'IME Sus'
};

export const reqHandler = () => {
  const rawData = xlsx.parse(filePath)[1].data;
    let groupArray = getTargetColumn(rawData, GROUP).map( str => {
      return GROUP_MAP[str] || str;
    }),
    status = getTargetColumn(rawData, STATUS),
    number = getTargetColumn(rawData, NUMBER);
  return flatGroup(['onboard', 'offered', 'open'],
    reduceByGroup(groupArray, [status], isOnboard),
    reduceByGroup(groupArray, [status], isOffered),
    reduceByGroup(groupArray, [status, number], isOpen)
  );
}
