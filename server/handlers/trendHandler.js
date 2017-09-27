import xlsx from 'node-xlsx';
import fs from 'fs';

import { getTargetColumn, getLastSunday } from './utils/tools'
const ecsExpName = genterateWeekDomain(new Date('2017/6/25'), new Date('2018/4/29'));
const isilonExpName = genterateWeekDomain(new Date('2017/6/25'), new Date('2018/1/28'));
const resumeExpValue = [5, 15, 30, 50, 70, 95, 120, 140, 160, 180, 195, 215, 235, 255, 270, 290, 310, 330, 345, 365, 385, 405, 420, 440, 460, 480, 495, 515, 535, 555, 570, 585];
const onsiteExpValue = [0, 2, 7, 14, 24, 34, 46, 58, 68, 78, 88, 95, 105, 115, 125, 132, 142, 152, 162, 169, 179, 189, 199, 206, 216, 226, 236, 243, 253, 263, 273, 280];
const reqExpValue = {
  isilon:   [0, 0, 0, 0, 1, 2, 3, 4, 6, 8, 9, 10, 11, 12, 13, 14, 16, 18, 22, 23, 24, 25, 26, 27, 29, 31, 33, 35, 37, 39, 41, 43],
  ecs:      [0, 0, 0, 0, 1, 2, 3, 4, 6, 8, 10, 12, 14, 16, 19, 22, 24, 26, 29, 30, 30, 31, 31, 32, 32, 33, 34, 35, 35, 36, 37, 38, 39, 40, 40, 41, 41, 42, 42, 43, 43, 44, 45, 46, 46],
}
reqExpValue['overview'] = reqExpValue.ecs.map((num, i) => num + (reqExpValue.isilon[i] || 0) );

const reqReal = {};
const onboardReal = {};

const RESUME = 'CV Upload Date';
const ONSITE = 'TP/Onsite Interview Time';

const filePath = {
  isilon: require('path').resolve(__dirname, '../assets/Isilon Hiring Candidates Track Sheet.xlsx'),
  ecs: require('path').resolve(__dirname, '../assets/ECS Hiring Candidates Track Sheet.xlsx'),
  overview: require('path').resolve(__dirname, '../assets/Isilon Hiring Candidates Track Sheet.xlsx'),
  isilonOfferTrend: require('path').resolve(__dirname, '../assets/isilon-offer-trend'),
  isilonOnboardTrend: require('path').resolve(__dirname, '../assets/isilon-onboard-trend'),
  ecsOfferTrend: require('path').resolve(__dirname, '../assets/ecs-offer-trend'),
  ecsOnboardTrend: require('path').resolve(__dirname, '../assets/ecs-onboard-trend')
}

// return {name: string, resume: number, phone: number, onsite: number}[]
export const getTrend = (project) => {
  const rawData = xlsx.parse(filePath[project])[0].data;
  const trendData = loadTrendDate();
  let resume = getTargetColumn(rawData, RESUME),
    onsite = getTargetColumn(rawData, ONSITE);
  let expName = project === 'isilon' ? isilonExpName : ecsExpName;
  return {
    reqExpect: getCombined(expName, reqExpValue[project]),
    reqReal: getCombined(expName, reqReal[project]),
    onboardReal: getCombined(expName, onboardReal[project])
  }
}

// @param dateArray: string[]
// return {name: string, value: number}[]
function reduceByDate(dateArray) {
  return dateArray
    .reduce((a, b) => {
      let exitIndex = a.findIndex(str => str && str.name === b);
      if (exitIndex >= 0) {
        a[exitIndex].value++;
        return a;
      }
      return [...a, {
        name: b,
        value: 1
      }];
    }, [])
    .reduce((a, b) => {
      return a.length ? [...a, {
        name: b.name,
        value: a[a.length - 1].value + b.value
      }] : [b];
    }, []);
}

function getCombined(dates, values) {
  return values.map((value, index) => {
    return {
      name: dates[index],
      value
    }
  });
}
// @param start: Date{}
// @param end: Date{}
function genterateWeekDomain(start, end) {
  const weekPeriod = 7 * 24 * 3600 * 1000;
  let strArr = [],
  startTime = start.getTime(),
  endTime = end.getTime();
  while(startTime <= endTime) {
    let tmp = new Date(startTime);
    strArr.push(tmp.getMonth() + 1 + '/' + tmp.getDate());
    startTime += weekPeriod;
  }
  return strArr;
}

function loadTrendDate() {
  reqReal.isilon = fs.readFileSync(filePath.isilonOfferTrend, 'utf-8').split('\n').filter(a => a).map(a => Number(a));
  onboardReal.isilon = fs.readFileSync(filePath.isilonOnboardTrend, 'utf-8').split('\n').filter(a => a).map(a => Number(a))
  reqReal.ecs = fs.readFileSync(filePath.ecsOfferTrend, 'utf-8').split('\n').filter(a => a).map(a => Number(a))
  onboardReal.ecs = fs.readFileSync(filePath.ecsOnboardTrend, 'utf-8').split('\n').filter(a => a).map(a => Number(a))

  reqReal.overview = reqReal.isilon.map((a, i) => a + reqReal.ecs[i]);
  onboardReal.overview = onboardReal.isilon.map((a, i) => a + onboardReal.ecs[i]);
}
