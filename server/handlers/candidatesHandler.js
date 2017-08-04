import xlsx from 'node-xlsx';

import { getTargetColumn, reduceByGroup, isPastDate, flatGroup, getIntervalByGroup } from './utils/tools';
import { GROUP_MAP } from './utils/constants';
import { isCV, isResume, isPhone, isOnsite, isReject, isResumeReject, isPhoneReject, isTPReject, isOnsiteReject, isOnsitePoolAugust, getIntervalDay } from './utils/criterions';

const GROUP = 'Group';
const RESUME = 'CV Upload Date';
const PHONE = 'Phone Interview Time';
const ONSITE = 'Onsite Interview Time';
const TP = 'TP Interview Time';
const STATUS = 'Interview Status';

const filePath = {
  isilon: require('path').resolve(__dirname, '../assets/Isilon Hiring Candidates Track Sheet.xlsx'),
  ecs: require('path').resolve(__dirname, '../assets/ECS Hiring Candidates Track Sheet.xlsx')
}

// return {name: string, resume: number, phone: number, onsite: number}[]
export const candidatesHandler = (project) => {
  const rawData = xlsx.parse(filePath[project])[0].data;
    let groupArray = getTargetColumn(rawData, GROUP).map( str => {
      return GROUP_MAP[str] || str;
    }),
    resume = getTargetColumn(rawData, RESUME),
    phone = getTargetColumn(rawData, PHONE),
    tp = getTargetColumn(rawData, TP),
    onsite = getTargetColumn(rawData, ONSITE),
    status = getTargetColumn(rawData, STATUS),
    flatPhone = flatTime(phone, resume, tp, onsite),
    flatTP = flatTime(tp, flatPhone, onsite);
  return flatGroup(['cv', 'resume', 'phone', 'onsite', 'reject', 'resumeReject', 'phoneReject', 'tpReject', 'onsiteReject', 'onsitePoolAugust',
    'cvPhone', 'phoneTP', 'TPOnsite', 'cvTP', 'cvOnsite', 'phoneOnsite'],
    reduceByGroup(groupArray, [resume], isCV),
    reduceByGroup(groupArray, [resume, status], isResume),
    reduceByGroup(groupArray, [phone], isPhone),
    reduceByGroup(groupArray, [onsite, tp], isOnsite),
    reduceByGroup(groupArray, [status], isReject),
    reduceByGroup(groupArray, [status, resume, phone, tp, onsite], isResumeReject),
    reduceByGroup(groupArray, [status, phone, tp, onsite], isPhoneReject),
    reduceByGroup(groupArray, [status, tp, onsite], isTPReject),
    reduceByGroup(groupArray, [status, onsite], isOnsiteReject),
    reduceByGroup(groupArray, [status], isOnsitePoolAugust),
    getIntervalByGroup(groupArray, [resume, phone], getIntervalDay),
    getIntervalByGroup(groupArray, [phone, flatTP], getIntervalDay),
    getIntervalByGroup(groupArray, [flatTP, onsite], getIntervalDay),
    getIntervalByGroup(groupArray, [resume, flatTP], getIntervalDay),
    getIntervalByGroup(groupArray, [resume, onsite], getIntervalDay),
    getIntervalByGroup(groupArray, [phone, onsite], getIntervalDay),
  );
};

const flatTime = (tar, can, ...con) => {
  return tar.map((a, i) => {
    if(con.map((b, j) => b[i]).find(a => a) && !a) return can[i];
    return a;
  });
}
