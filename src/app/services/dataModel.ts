export const OVERVIEW_STATUS = [{ name: 'Onboard', value: 0 }, { name: 'Offered', value: 0 }, { name: 'Open', value: 0 }];
export const TEAM_HEADER = [
  { key: 'open', value: 'Opened Reqs' },
  { key: 'resume', value: 'Resume Uploaded' },
  { key: 'phone', value: 'Phone Screened' },
  { key: 'onsite', value: 'Onsite Interviews' },
  { key: 'reject', value: 'Rejected' },
  { key: 'offered', value: 'Offered' },
  { key: 'onboard', value: 'Onboard' }
];

export const HIGHLIGHT_HEADER = [
  { key: 'ttf', value: 'TTF' },
  ...TEAM_HEADER
];

export const OVERVIEW_STATUS_KEYS = ['onboard', 'offered', 'open'];
export const OVERVIEW_HIGHLIGHT_KEYS = ['ttf', 'onboard', 'offered', 'resume', 'phone', 'onsite'];


// export const OVERVIEW_HIGHLIGHT = [
//   {
//     name: "TTF",
//     value: "--"
//   },
//   {
//     name: "Onboard",
//     value: "--"
//   },
//   {
//     name: "offered",
//     value: "--"
//   },
//   {
//     name: "Resume Screened",
//     value: "--"
//   },
//   {
//     name: "Phone Screened",
//     value: "--"
//   },
//   {
//     name: "Onsite Interviews",
//     value: "--"
//   }
// ];
