export const OVERVIEW_STATUS = [{ name: 'Onboard', value: 0 }, { name: 'Offered', value: 0 }, { name: 'Opened Reqs', value: 0 }];
export const TEAM_HEADER = [
  { key: 'total', value: 'Total Reqs' },
  { key: 'cv', value: 'Resume Uploaded' },
  { key: 'resume', value: 'Resume Screened' },
  { key: 'phone', value: 'Phone Screened' },
  { key: 'onsite', value: 'TP/Onsite Interviewed' },
  { key: 'onsitePoolAugust', value: 'Onsite Pool For August'},
  { key: 'reject', value: 'Failed' },
  { key: 'offered', value: 'Offered' },
  { key: 'onboard', value: 'Onboard' },
];

export const HIGHLIGHT_HEADER = [
  { key: 'ttf', value: 'TTF' },
  ...TEAM_HEADER
];

export const OVERVIEW_STATUS_KEYS = ['onboard', 'offered', 'open'];
