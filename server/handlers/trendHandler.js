import xlsx from 'node-xlsx';

const filePath = require('path').resolve(__dirname, '../assets/hiringtrend.xlsx');

export const getTrend = () => {
  const rawData = xlsx.parse(filePath)[0].data;
  const reqExpect = getCombined(getDate(rawData[0]), getReduce(rawData[1]));
  const reqReal = getCombined(getDate(rawData[0]), getReduce(rawData[2]));
  const resumeExpect = getCombined(getDate(rawData[3]), getReduce(rawData[4]));
  const resumeReal = getCombined(getDate(rawData[3]), getReduce(rawData[5]));
  const interviewExpect = getCombined(getDate(rawData[6]), getReduce(rawData[7]));
  const interviewReal = getCombined(getDate(rawData[6]), getReduce(rawData[8]));
  return {
    reqExpect,
    reqReal,
    resumeExpect,
    resumeReal,
    interviewExpect,
    interviewReal
  }
}

const getDate = (data) => {
  return data.slice(1).map(t => {
    let date = new Date((t - (25567 + 2)) * 86400 * 1000) // windows + 2
    return `${date.getMonth() + 1}/${date.getDate()}`
  })
}

const getReduce = (data) => {
  return data.slice(1).reduce((a, b) => {
    return a.length ? [...a, a[a.length - 1] + b] : [b];
  }, []);
}

const getCombined = (dates, values) => {
  return values.map((value, index) => {
    return {
      name: dates[index],
      value
    }
  });
}
