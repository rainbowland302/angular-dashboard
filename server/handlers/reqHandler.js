import xlsx from 'node-xlsx';

import { getTargetColumn, reduceByGroup, flatGroup, removeBlockRows } from './utils/tools';
import { isOnboard, isOffered, isOpen } from './utils/criterions';
import { BLACK_LIST, GROUP_MAP } from './utils/constants';

const filePath = {
  isilon: require('path').resolve(__dirname, '../assets/Isilon Hiring Req Track Sheet.xlsx'),
  ecs: require('path').resolve(__dirname, '../assets/ECS Hiring Plan.xlsx')
}

// Column Name
const GROUP = 'Group';
const STATUS = 'Hiring Status';
const NUMBER = 'Req Number';

export const reqHandler = (project) => {
  const rawData = removeBlockRows(xlsx.parse(filePath[project])[1].data, BLACK_LIST);
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
