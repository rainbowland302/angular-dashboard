import xlsx from 'node-xlsx';

import {
  getTargetColumn,
  reduceByGroup,
  isPastDate,
  flatGroup
} from './utils';

const GROUP = 'Group';
const RESUME = 'CV Upload Date';
const PHONE = 'Phone Interview Time';
const ONSITE = 'TP/Onsite Interview Time';
const REJECT = 'Interview Status';

const isCV = date => date;
const isResume = (cvDate, status) => cvDate && !!status;
const isPhone = date => date && isPastDate(date);
const isOnsite = date => date && isPastDate(date);
const isReject = status => status && status.toLowerCase().indexOf('reject') >= 0;

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
