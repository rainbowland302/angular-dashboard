export const getTargetColumn = (data, columnName) => {
  let headers = data[0],
    values = data.slice(1),
    columnIndex = headers.indexOf(columnName);
  return values.map(row => row[columnIndex]);
}

export const getLastSunday = (data) => {
  return data
    .filter(t => t)
    .map(t => {
      let date;
      if (typeof t === 'string') date = new Date(t);
      else date = new Date((t - (25567 + 2)) * 86400 * 1000) // windows + 2

      let lastSunday = new Date(date - 1000 * 3600 * 24 * date.getDay());
      return `${lastSunday.getMonth() + 1}/${lastSunday.getDate()}`
    });
}

export const isPastDate = (date) => {
  let t;
  let day = 24*3600*1000;
  if (typeof date === 'string') {
    let tmp = new Date(date);
    t = tmp.getTime();
  } else t = (date - (25567 + 2)) * 86400 * 1000 // windows + 2
  return Date.now() - day - t > 0 ? true : false; // today is future
}

// return: {name: string, ..obj}[]
export const flatGroup = (keys, ...args) => {
  return args[0].map(({name}, groupIndex) => {
    let group = { name };
    keys.forEach((key, i) => {
      group[key] = args[i][groupIndex].value;
    });
    return group;
  });
}

// @param group: string[]
// @param columns: string|number[][]
// @param criterion: (data?: string|number[]): boolean => {}
// return { name: string, value: number }[]
export const reduceByGroup = (group, columns, criterion) => {
  let res = [...new Set(group)].map( a => ({ name: a, value: 0 }) );
  return group.reduce((a, b, i) => {
      let resIndex = a.findIndex(({name}) => name === b);
      a[resIndex].value += criterion.apply(null, columns.map(column => column[i])) ? 1 : 0;
      return a;
  }, res);
}
