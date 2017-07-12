import xlsx from 'node-xlsx';

import { getTargetColumn, reduceByGroup, isPastDate, flatGroup } from './utils/tools';
import { isCV, isResume, isPhone, isOnsite, isReject } from './utils/criterions';

const GROUP = 'Group';
const RESUME = 'CV Upload Date';
const PHONE = 'Phone Interview Time';
const ONSITE = 'TP/Onsite Interview Time';
const REJECT = 'Interview Status';

const filePath = require('path').resolve(__dirname, '../assets/Isilon Hiring Candidates Track Sheet.xlsx');

// return {name: string, resume: number, phone: number, onsite: number}[]
export const candidatesHandler = () => {
  const rawData = xlsx.parse(filePath)[0].data;
  let groupArray = getTargetColumn(rawData, GROUP),
    resume = getTargetColumn(rawData, RESUME),
    phone = getTargetColumn(rawData, PHONE),
    onsite = getTargetColumn(rawData, ONSITE),
    reject = getTargetColumn(rawData, REJECT);
  return flatGroup(['cv', 'resume', 'phone', 'onsite', 'reject'],
    reduceByGroup(groupArray, [resume], isCV),
    reduceByGroup(groupArray, [resume, reject], isResume),
    reduceByGroup(groupArray, [phone], isPhone),
    reduceByGroup(groupArray, [onsite], isOnsite),
    reduceByGroup(groupArray, [reject], isReject)
  );
};
