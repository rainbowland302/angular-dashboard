export const removeBlockRows = (data, list) => data.filter(row => list.filter(number=> row.indexOf(number)>= 0).length === 0);

// @param data: any[][]
// @param columnName: string
// return any[]
export const getTargetColumn = (data, columnName) => {
  let headers = data[0],
    values = data.slice(1),
    columnIndex = headers.indexOf(columnName);
  return values.map(row => typeof row[columnIndex] === 'string' ? row[columnIndex].trim() : row[columnIndex]);
}

// @param dateArray: string|number[]
// return 'xx/xx'[]
export const getLastSunday = (dateArray) => {
  return dateArray
    .filter(t => t)
    .map(t => {
      let date;
      if (typeof t === 'string') date = new Date(t);
      else date = new Date((t - (25567 + 2)) * 86400 * 1000) // windows + 2

      let lastSunday = new Date(date - 1000 * 3600 * 24 * date.getDay());
      return `${lastSunday.getMonth() + 1}/${lastSunday.getDate()}`
    });
}

// @param keys: string[]
// @param args: { name: string, value: number }[][]
// return {name: string, ..obj}[]
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
