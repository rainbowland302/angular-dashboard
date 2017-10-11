import xlsx from 'node-xlsx';
import fs from 'fs';

import { genterateWeekDomain } from './utils/tools'
import { EXPECT_OFFER_TREND, DATE_RANGE } from './utils/constants';

const filePath = {
  isilon: require('path').resolve(__dirname, '../assets/isilon-offer-trend'),
  ecs: require('path').resolve(__dirname, '../assets/ecs-offer-trend'),
}

export const getTrend = (project) => {
  const trendData = loadTrendDate();
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
  return fs.readFileSync(filePath[project], 'utf-8').split('\n').filter(a => a).map(a => Number(a));
}

function getRealOnboardArray(project) {
  
}