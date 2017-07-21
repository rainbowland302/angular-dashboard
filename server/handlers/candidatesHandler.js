import xlsx from 'node-xlsx';

import { getTargetColumn, reduceByGroup, isPastDate, flatGroup } from './utils/tools';
import { GROUP_MAP } from './utils/constants';
import { isCV, isResume, isPhone, isOnsite, isReject, isResumeReject, isPhoneReject, isOnsiteReject, isOnsitePoolAugust } from './utils/criterions';

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
    onsite = getTargetColumn(rawData, ONSITE),
    tp = getTargetColumn(rawData, TP),
    status = getTargetColumn(rawData, STATUS);
  return flatGroup(['cv', 'resume', 'phone', 'onsite', 'reject', 'resumeReject', 'phoneReject', 'onsiteReject', 'onsitePoolAugust'],
    reduceByGroup(groupArray, [resume], isCV),
    reduceByGroup(groupArray, [resume, status], isResume),
    reduceByGroup(groupArray, [phone], isPhone),
    reduceByGroup(groupArray, [onsite, tp], isOnsite),
    reduceByGroup(groupArray, [status], isReject),
    reduceByGroup(groupArray, [status, resume, phone, onsite], isResumeReject),
    reduceByGroup(groupArray, [status, phone, onsite], isPhoneReject),
    reduceByGroup(groupArray, [status, onsite], isOnsiteReject),
    reduceByGroup(groupArray, [status], isOnsitePoolAugust)
  );
};
