import xlsx from 'node-xlsx';

import { getTargetColumn, reduceByGroup, isPastDate, flatGroup } from './utils/tools';
import { isCV, isResume, isPhone, isOnsite, isReject, isResumeReject, isPhoneReject, isOnsiteReject } from './utils/criterions';

const GROUP = 'Group';
const RESUME = 'CV Upload Date';
const PHONE = 'Phone Interview Time';
const ONSITE = 'TP/Onsite Interview Time';
const REJECT = 'Interview Status';

const filePath = {
  isilon: require('path').resolve(__dirname, '../assets/Isilon Hiring Candidates Track Sheet.xlsx'),
  ecs: require('path').resolve(__dirname, '../assets/ECS Hiring Candidates Track Sheet.xlsx')
}

// return {name: string, resume: number, phone: number, onsite: number}[]
export const candidatesHandler = (project) => {
  const rawData = xlsx.parse(filePath[project])[0].data;
  let groupArray = getTargetColumn(rawData, GROUP),
    resume = getTargetColumn(rawData, RESUME),
    phone = getTargetColumn(rawData, PHONE),
    onsite = getTargetColumn(rawData, ONSITE),
    reject = getTargetColumn(rawData, REJECT);
  return flatGroup(['cv', 'resume', 'phone', 'onsite', 'reject', 'resumeReject', 'phoneReject', 'onsiteReject'],
    reduceByGroup(groupArray, [resume], isCV),
    reduceByGroup(groupArray, [resume, reject], isResume),
    reduceByGroup(groupArray, [phone], isPhone),
    reduceByGroup(groupArray, [onsite], isOnsite),
    reduceByGroup(groupArray, [reject], isReject),
    reduceByGroup(groupArray, [reject, resume, phone, onsite], isResumeReject),
    reduceByGroup(groupArray, [reject, phone, onsite], isPhoneReject),
    reduceByGroup(groupArray, [reject, onsite], isOnsiteReject)
  );
};
