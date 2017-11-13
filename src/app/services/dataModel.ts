export const OVERVIEW_STATUS = [{ name: 'Offered', value: 0 }, { name: 'Opened Reqs', value: 0 }];
export const OVERVIEW_STATUS_KEYS = ['offered', 'open'];

export const ISILON_TEAM_HEADER = [
  { key: 'season', value: 'Qtr(FY)'},
  { key: 'total', value: 'Total Reqs' },
  { key: 'cv', value: 'Resume Uploaded' },
  { key: 'resume', value: 'Resume Screened' },
  { key: 'phone', value: 'Phone Screened' },
  { key: 'onsite', value: 'TP/Onsite Interviewed' },
//  { key: 'onsitePoolAugust', value: 'Onsites For August'},
  { key: 'reject', value: 'Failed' },
  { key: 'hirable', value: 'Hirable'},
  { key: 'offered', value: 'Offered' },
  { key: 'onboard', value: 'Onboard' },
];
export const TEAM_HEADER = [
  { key: 'total', value: 'Total Reqs' },
  { key: 'cv', value: 'Resume Uploaded' },
  { key: 'resume', value: 'Resume Screened' },
  { key: 'phone', value: 'Phone Screened' },
  { key: 'onsite', value: 'TP/Onsite Interviewed' },
  { key: 'reject', value: 'Failed' },
 // { key: 'hirable', value: 'Hirable'},
  { key: 'offered', value: 'Offered' },
  { key: 'onboard', value: 'Onboard' },
];

export const HIGHLIGHT_HEADER = [
  { key: 'ttf', value: 'TTF' },
  ...TEAM_HEADER
];
export const TEAM_DETAIL_HEADER = [
  { key: 'name', value: 'Team' },
  ...TEAM_HEADER
];
export const ISILON_TEAM_DETAIL_HEADER = [
  { key: 'name', value: 'Team' },
  ...ISILON_TEAM_HEADER
];
export const ISILON_HIGHLIGHT_HEADER = [
 // { key: 'ttf', value: 'TTF' },
  ...ISILON_TEAM_HEADER
];
