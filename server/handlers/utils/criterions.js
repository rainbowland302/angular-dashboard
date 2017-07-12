
export const isOnboard = status => typeof status === 'string' && status.toLowerCase().indexOf('board') >= 0;
export const isOffered = status => typeof status === 'string' && status.toLowerCase().indexOf('offer') >= 0;
export const isOpen = (status, number) => typeof number === 'string' && number && !isOnboard(status) && !isOffered(status);
export const isCV = date => date;
export const isResume = (cvDate, status) => cvDate && !!status;
export const isPhone = date => date && isPastDate(date);
export const isOnsite = date => date && isPastDate(date);
export const isReject = status => status && status.toLowerCase().indexOf('reject') >= 0;

// @param date: string|number
// return boolean
const isPastDate = (date) => {
  let t;
  let day = 24*3600*1000;
  if (typeof date === 'string') {
    let tmp = new Date(date);
    t = tmp.getTime();
  } else t = (date - (25567 + 2)) * 86400 * 1000 // windows + 2
  return Date.now() - day - t > 0 ? true : false; // today is future
}
