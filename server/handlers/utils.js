export const getTargetColumn = (data, columnName) => {
  let headers = data[0],
    values = data.slice(1),
    columnIndex = headers.indexOf(columnName);
  return values.map(row => row[columnIndex]);
}

export const getDate = (data) => {
  return data.slice(1).map(t => {
    let date = new Date((t - (25567 + 2)) * 86400 * 1000) // windows + 2
    return `${date.getMonth() + 1}/${date.getDate()}`
  })
}
