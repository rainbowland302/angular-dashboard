// block specific req number
export const BLACK_LIST = ['183787BR', '183788BR', '183789BR', '184340BR', '184341BR', '184343BR', '184344BR', '184345BR', '184346BR', '188212BR', '188213BR', '188214BR', '188215BR', '188216BR', '188313BR', '188314BR', '188312BR', '188315BR', '188212BR', '188213BR', '188214BR', '188215BR', '188216BR', '188420BR'];

export const GROUP_MAP = {
  'IME DEV': 'IME Dev',
  'IME Sustaining': 'IME Sus',
  'One FS & Data Services': 'Data Management'
};
export const QUARTER_MAP = {
  "Q3 '18" : 'FY18 Q3',
  "Q4 '18" : 'FY18 Q4',
  "Q3'FY18" : 'FY18 Q3',
  "Q4'FY18" : 'FY18 Q4',
  "Q1'FY19" : 'FY19 Q1'
}

export const EXPECT_OFFER_TREND = {
  isilon:   [0, 0, 0, 0, 1, 2, 3, 4, 6, 8, 9, 10, 11, 12, 13, 14, 16, 18, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 35, 37, 38, 39],
  ecs:      [0, 0, 0, 0, 1, 2, 3, 4, 6, 8, 10, 12, 14, 16, 19, 22, 24, 26, 29, 30, 30, 31, 31, 32, 32, 33, 34, 35, 35, 36, 37, 38, 39, 40, 40, 41, 41, 42, 42, 43, 43, 44, 45, 46, 46],
  overview: [0, 0, 0, 0, 2, 4, 6, 8, 12, 16, 19, 22, 25, 28, 32, 36, 40, 44, 53, 55, 56, 58, 59, 61, 62, 64, 67, 68, 70, 73, 75, 77, 39, 40, 40, 41, 41, 42, 42, 43, 43, 44, 45, 46, 46]
}

export const DATE_RANGE = {
  isilon: {
    START: new Date('2017/6/25'),
    END: new Date('2018/1/28')
  },
  ecs: {
    START: new Date('2017/6/25'),
    END: new Date('2018/4/29')
  },
  overview: {
    START: new Date('2017/6/25'),
    END: new Date('2018/4/29')
  }
}