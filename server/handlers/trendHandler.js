import xlsx from 'node-xlsx';
import fs from 'fs';

import { genterateWeekDomain, getTargetColumn, getNextSunday, reduceByDate} from './utils/tools'
import { EXPECT_OFFER_TREND, DATE_RANGE } from './utils/constants';

const filePath = {
  isilon: require('path').resolve(__dirname, '../assets/isilon-offer-trend'),
  ecs: require('path').resolve(__dirname, '../assets/ecs-offer-trend'),
  overview: require('path').resolve(__dirname, '../assets/overview-offer-trend'),
}

const reqTrackFilePath = {
  isilon: require('path').resolve(__dirname, '../assets/Isilon Hiring Req Track Sheet.xlsx'),
  ecs: require('path').resolve(__dirname, '../assets/ECS Hiring Plan.xlsx')
}

export const getTrend = (project) => {
  let dateRange = genterateWeekDomain(DATE_RANGE[project].START, DATE_RANGE[project].END);
  return {
    reqExpect: getCombined(dateRange, EXPECT_OFFER_TREND[project]),
    reqReal: getCombined(dateRange, getRealOfferArray(project)),
    onboardReal: getCombined(dateRange, getRealOnboardArray(project))

  }
}

function getCombined(dates, values) {
  return values.map((value, index) => {
    return {
      name: dates[index],
      value
    }
  });
}

function getRealOfferArray(project) {
  let arr = [];
  try {
    arr = fs.readFileSync(filePath[project], 'utf-8').split('\n').filter(a => a).map(a => Number(a));
  } catch(e) {
    // we do not serve persist file in dev mode
    console.log(e);
  }
  return arr;
}

function getRealOnboardArray(project) {
  if(project === 'overview'){
    let isilonOnboardArray = getProjectOnboardArray('isilon');
    let ecsOnboardArray = getProjectOnboardArray('ecs');
    return isilonOnboardArray.map((num, idx)=>{
      return num + ecsOnboardArray[idx];
    })
  }
  else{
    return getProjectOnboardArray(project);
  }
}

function getProjectOnboardArray(project){
  const reqRawData = xlsx.parse(reqTrackFilePath[project])[1].data;
  let onBoardRawData = getTargetColumn(reqRawData, 'On Board Date');
  let customizedOnBoardData = getNextSunday(onBoardRawData.sort());
  let reducedOnboardData = reduceByDate(customizedOnBoardData);
  let dateToday = new Date();
  let dateRange = genterateWeekDomain(DATE_RANGE[project].START, dateToday);
  let realOnboardArray = [];
  dateRange.forEach(function(date, finalIndex){
    let dateIndex = reducedOnboardData.findIndex(dateValuePair=>{
      return dateValuePair.name === date;
    })
    if(dateIndex>=0){
      realOnboardArray.push(reducedOnboardData[dateIndex].value);
    }
    else{
      if(finalIndex!==0){
        realOnboardArray.push(realOnboardArray[finalIndex-1]);
        
      }else{
        realOnboardArray.push(0);
      }
      
    }
  })
  return realOnboardArray;
}