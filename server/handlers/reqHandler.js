import xlsx from 'node-xlsx';

import { getTargetColumn, reduceByGroup, reduceByGroupAndQuarter, flatGroup, removeBlockRows } from './utils/tools';
import { isOnboard, isOffered, isOpen } from './utils/criterions';
import { BLACK_LIST, GROUP_MAP,QUARTER_MAP } from './utils/constants';

const filePath = {
  isilon: require('path').resolve(__dirname, '../assets/Isilon Hiring Req Track Sheet.xlsx'),
  ecs: require('path').resolve(__dirname, '../assets/ECS Hiring Plan.xlsx')
}

// Column Name
const GROUP = 'Group';
const STATUS = 'Hiring Status';
const NUMBER = 'Req Number';
const ONBOARD = 'On Board Date';
const  IDINWD = 'ID in WD';
const QUARTERI = 'Qtr (FY)';
const QUARTERE = 'Required Qtr';
const CVDATE = 'CV Upload Date';

export const reqHandler = (project) => {
  const rawData = removeBlockRows(xlsx.parse(filePath[project])[1].data, BLACK_LIST);
    let groupArray = getTargetColumn(rawData, GROUP).map( str => {
      return GROUP_MAP[str] || str;
    }),
        quarterArray = getTargetColumn(rawData, QUARTERI).map( str =>{
      return QUARTER_MAP[str] || str;
    }),
        status = getTargetColumn(rawData, STATUS),
        number = getTargetColumn(rawData, NUMBER),
        onboard = getTargetColumn(rawData, ONBOARD),
        idinwd = getTargetColumn(rawData, IDINWD);
    if (quarterArray.length ===0){
      quarterArray = getTargetColumn(rawData, QUARTERE).map( str =>{
        return QUARTER_MAP[str] || str;
      });
    }
  return flatGroup(['onboard', 'offered', 'open'],
    reduceByGroupAndQuarter(groupArray,quarterArray, [onboard], isOnboard),
    reduceByGroupAndQuarter(groupArray,quarterArray, [status], isOffered),
    reduceByGroupAndQuarter(groupArray, quarterArray,[status, number, idinwd], isOpen)
  );
}
