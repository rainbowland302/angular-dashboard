import xlsx from 'node-xlsx';

import {
  getTargetColumn,
} from './utils'

const GROUP = 'Group';
const RESUME = 'CV Upload Date';
const PHONE = 'Phone Interview Time';
const ONSITE = 'TP/Onsite Interview Time';

const filePath = require('path').resolve(__dirname, '../assets/Isilon Hiring Candidates Track Sheet.xlsx');

// return {name: string, resume: number, phone: number, onsite: number}[]
export const candidatesHandler = () => {
  const rawData = xlsx.parse(filePath)[0].data;
  let groupArray = getTargetColumn(rawData, GROUP),
    resume = getTargetColumn(rawData, RESUME),
    phone = getTargetColumn(rawData, PHONE),
    onsite = getTargetColumn(rawData, ONSITE);
  return reduceByGroup(groupArray, {
    resume,
    phone,
    onsite
  });
}

// @param group: string[]
// @param data: {key: string[]}
// return { name: string, key: string[] }[]
export const reduceByGroup = (group, data) => {
  let keyArray = Object.keys(data);

  return group.reduce((a, b, i) => {
    // expand origin group
    let existIndex = a.findIndex(str => str && str.name === b);
    if (existIndex >= 0) {
      keyArray.forEach(key => {
        if (data[key][i]) a[existIndex][key]++
      });
      return a;
    }
    // new group
    let newGroup = {
      name: b
    };
    keyArray.forEach(key => {
      newGroup[key] = data[key][i] ? 1 : 0;
    })
    return [...a, newGroup];
  }, []);
}
