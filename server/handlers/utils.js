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
