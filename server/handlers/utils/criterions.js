const DAY = 3600 * 24 * 1000;
const HOUR8 = 3600 * 8 * 1000;
const COMPENSATION = 1.5;

export const isOnboard = date => date && isPastDate(date);
export const isOffered = status => typeof status === 'string' && status.toLowerCase().indexOf('offer') >= 0;
export const isOpen = (status, number, idinwd) => ((typeof number === 'string' && number) || (typeof idinwd === 'string' && idinwd)) && !isOnboard(status) && !isOffered(status);
export const isCV = date => date;
export const isResume = (cvDate, status) => cvDate && !!status;
export const isPhone = date => date && isPastDate(date);
export const isOnsite = (onsiteDate, tpDate) => (onsiteDate && isPastDate(onsiteDate)) || (tpDate && isPastDate(tpDate));

export const isReject = status => status && status.toLowerCase().indexOf('reject') >= 0;
export const isResumeReject = (status, resume, phone, tp, onsite) => isReject(status) && resume && !phone && !tp && !onsite;
export const isPhoneReject = (status, phone, tp, onsite) => isReject(status) && phone && !tp && !onsite;
export const isTPReject = (status, tp, onsite) => isReject(status) && tp && !onsite;
export const isOnsiteReject = (status, onsite) => isReject(status) && onsite ;

export const isOnsitePoolAugust = (status) => status && status.toLowerCase().indexOf('onsite') >= 0;

export const getIntervalDay = (start, end) => (start && end ) ? getWorkDayPeriod(start, end) : null;

// @param date: string|number
// return boolean
const isPastDate = (date) => {
  let t;
  //let day = 24 * 3600 * 1000;
  if (typeof date === 'string') {
    let tmp = new Date(date);
    t = tmp.getTime();
  } else t = (date - (25567 + 2)) * 86400 * 1000 // windows + 2
  return Date.now() - t > 0 ? true : false; // today is future
}

const parseDate = (date) => {
    let res;
    if (typeof date === 'string') res = new Date(date); // shows 0:00
    else res = new Date((date - (25567 + 2)) * 86400 * 1000 - HOUR8); // windows + 2, shows 8:00
    return res;
}

const getWorkDayPeriod = (start, end) => {
  let startDate = parseDate(start), endDate = parseDate(end);
  let lastSunday = new Date(startDate.getTime() - DAY * startDate.getDay()),
    nextSaturday = new Date(endDate.getTime() + DAY * (6 - endDate.getDay()) );
  let weekendDays =  Math.floor( (nextSaturday - lastSunday) / DAY / 7) * 2;
  return (endDate - startDate) / DAY - weekendDays + COMPENSATION;
}
// determine  in which quarter that cv is uploaded
export const getQuarter = date => {
  let uploadDate = parseDate(date),
      month = uploadDate.getMonth() + 1;
  switch(true) {
    case [1,2,3].includes(month):
         return 'FY18 Q1';
    case [4,5,6].includes(month):
         return 'FY18 Q3';
    case [7,8,9].includes(month):
         return 'FY18 Q3';
    case [10,11,12].includes(month):
        return 'FY18 Q4';
  }
}
