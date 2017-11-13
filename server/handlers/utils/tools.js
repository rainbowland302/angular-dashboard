export const removeBlockRows = (data, list) => data.filter(row => list.filter(number => {
  if(row.indexOf(number)>= 0) {
    console.log(number);
    return true;
  }
  else return false
}).length === 0);

export const removeInvalidRows = (data, validCriterion) => data.filter(
   row =>{
     validCriterion.apply(null,row["ReqNumber"], row[""] )
   }
)

// @param data: any[][]
// @param columnName: string
// return any[]
export const getTargetColumn = (data, columnName) => {
  let headers = data[0],
    values = data.slice(1),
    columnIndex = headers.indexOf(columnName);
  return values.map(row => typeof row[columnIndex] === 'string' ? row[columnIndex].trim() : row[columnIndex]);
}

// @param data: any[][]
// @param columnArray[]
// return any[][]
export const getTargetColumns = (data, columnArray) => {
  let headers = data[0],
      res = [],
      values = data.slice(1);
  columnArray.forEach(columnName => {
      let columnIndex = headers.indexOf(columnName);
      let targetColumn = values.map(row => typeof row[columnIndex] === 'string' ? row[columnIndex].trim() : row[columnIndex]);
      res.push(targetColumn);
       
    })
  return res;
}


// @param dateArray: string|number[]
// return 'xx/xx'[]
export const getNextSunday = (dateArray) => {
  return dateArray
    .filter(t => t)
    .map(t => {
      let date;
      if (typeof t === 'string') {
        date = new Date(t);
        if(isNaN(date)) return '';  //filter invalid string
      }
      else date = new Date((t - (25567 + 2)) * 86400 * 1000) // windows + 2

      let nextSunday = new Date(date.getTime() + 1000 * 3600 * 24 * (7 - date.getDay()));
      return `${nextSunday.getMonth() + 1}/${nextSunday.getDate()}`
    }).filter(t => t);
}
// @param start: Date{}
// @param end: Date{}
export const genterateWeekDomain = (start, end) => {
  const weekPeriod = 7 * 24 * 3600 * 1000;
  let strArr = [],
  startTime = start.getTime(),
  endTime = end.getTime();
  while(startTime <= endTime) {
    let tmp = new Date(startTime);
    strArr.push(tmp.getMonth() + 1 + '/' + tmp.getDate());
    startTime += weekPeriod;
  }
  return strArr;
}

// @param dateArray: string[]
// return {name: string, value: number}[]
export const reduceByDate = (dateArray) => {
  return dateArray
    .reduce((a, b) => {
      let exitIndex = a.findIndex(str => str && str.name === b);
      if (exitIndex >= 0) {
        a[exitIndex].value++;
        return a;
      }
      return [...a, {
        name: b,
        value: 1
      }];
    }, [])
    .reduce((a, b) => {
      return a.length ? [...a, {
        name: b.name,
        value: a[a.length - 1].value + b.value
      }] : [b];
    }, []);
}

// @param keys: string[]
// @param args: { name: string, season:string, value: number }[][]
// return {name: string, ..obj}[]
export const flatGroup = (keys, ...args) => {
  return args[0].map(({name, season}, groupIndex) => {
    let group = { name, season };
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
  let res = [...new Set(group.filter(s => s))].map( a => ({ name: a, value: 0 }) );
  return group.filter(s => s).reduce((a, b, i) => {
      let resIndex = a.findIndex(({name}) => name === b);
      a[resIndex].value += criterion.apply(null, columns.map(column => column[i])) ? 1 : 0;
      return a;
  }, res);
}

// @param group: string[]
//@param quarter: string[]
// @param columns: string|number[][]
// @param criterion: (data?: string|number[]): boolean => {}
// return { name: string, season: string, value: number }[]
export const reduceByGroupAndQuarter= (group, quarter, columns, criterion) => {
  let res = [... new Set(group.filter(s=>s))].map(a => {
    return [...new Set(quarter.filter(f=>f))].map(q=>({name:a, season:q, value:0}))
  });
  let resFlat = [].concat(...res);
  return group.reduce((a,b,i) => {
    let resIndex = a.findIndex(({name, season }) => {
      return name ===b && season === quarter[i]
    });
    if(resIndex !== -1){
      a[resIndex].value += criterion.apply(null, columns.map(column => column[i])) ? 1:0;
    }
    return a;
  }, resFlat);
}

export const getIntervalByGroup = (group, quarter, columns, criterion) => {
  let res = [...new Set(group.filter(s => s))].map( a =>{
    return [...new Set(quarter.filter(f=>f))].map(q=>({name:a, season:q, value:0, count:0}))
  } );
  let resFlat = [].concat(...res);
  return group
    .reduce((a, b, i) => {
      let resIndex = a.findIndex(({name, season}) => {
         return name ===b && season === quarter [i];
      });
      if(resIndex!== -1){
        let cur = criterion.apply(null, columns.map(column => column[i]));
        a[resIndex].value += cur;
        if (cur !== null) a[resIndex].count ++;
      }
      return a;
    }, resFlat)
    .map( a => {
      if(a.count) a.value = Number((a.value / a.count).toFixed(1));
      delete a.count;
      return a;
    });
}

export const sortByKey = (array, key) => {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}
