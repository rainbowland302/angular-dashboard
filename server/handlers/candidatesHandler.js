import xlsx from 'node-xlsx';

import { getTargetColumn, reduceByGroup, reduceByGroupAndQuarter, isPastDate, flatGroup, getIntervalByGroup } from './utils/tools';
import { GROUP_MAP } from './utils/constants';
import { isCV, isResume, isPhone, isOnsite, isReject, isResumeReject, isPhoneReject, isTPReject, isOnsiteReject, isOffered, isOnsitePoolAugust, getIntervalDay, getQuarter } from './utils/criterions';

const GROUP = 'Group';
const RESUME = 'CV Upload Date';
const PHONE = 'Phone Interview Time';
const ONSITE = 'Onsite Interview Time';
const TP = 'TP Interview Time';
const STATUS = 'Interview Status';
const CVUPLOAD = 'CV Upload Date';

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
    flatTP = flatTime(tp, flatPhone, onsite),
    quarterArray = getTargetColumn(rawData, CVUPLOAD).map(date=>{
      return getQuarter(date);
    });
  return flatGroup(['cv', 'resume', 'phone', 'onsite', 'reject', 'resumeReject', 'phoneReject', 'tpReject', 'onsiteReject', 'hirable', 'onsitePoolAugust',
    'cvPhone', 'phoneTP', 'TPOnsite', 'cvTP', 'cvOnsite', 'phoneOnsite'],
    reduceByGroupAndQuarter(groupArray, quarterArray, [resume], isCV),
    reduceByGroupAndQuarter(groupArray, quarterArray, [resume, status], isResume),
    reduceByGroupAndQuarter(groupArray, quarterArray, [phone], isPhone),
    reduceByGroupAndQuarter(groupArray, quarterArray, [onsite, tp], isOnsite),
    reduceByGroupAndQuarter(groupArray, quarterArray, [status], isReject),
    reduceByGroupAndQuarter(groupArray, quarterArray, [status, resume, phone, tp, onsite], isResumeReject),
    reduceByGroupAndQuarter(groupArray, quarterArray, [status, phone, tp, onsite], isPhoneReject),
    reduceByGroupAndQuarter(groupArray, quarterArray, [status, tp, onsite], isTPReject),
    reduceByGroupAndQuarter(groupArray, quarterArray, [status, onsite], isOnsiteReject),
    reduceByGroupAndQuarter(groupArray, quarterArray, [status], isOffered),
    reduceByGroupAndQuarter(groupArray, quarterArray, [status], isOnsitePoolAugust),
    getIntervalByGroup(groupArray, quarterArray, [resume, phone], getIntervalDay),
    getIntervalByGroup(groupArray, quarterArray,[phone, flatTP], getIntervalDay),
    getIntervalByGroup(groupArray, quarterArray,[flatTP, onsite], getIntervalDay),
    getIntervalByGroup(groupArray, quarterArray, [resume, flatTP], getIntervalDay),
    getIntervalByGroup(groupArray, quarterArray, [resume, onsite], getIntervalDay),
    getIntervalByGroup(groupArray, quarterArray, [phone, onsite], getIntervalDay),
  );
};

const flatTime = (tar, can, ...con) => {
  return tar.map((a, i) => {
    if(con.map((b, j) => b[i]).find(a => a) && !a) return can[i];
    return a;
  });
}
