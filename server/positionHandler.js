import xlsx from 'node-xlsx';
export const getPosition = ()=>{
    const positions = xlsx.parse(`${__dirname}/assets/Hiring Req Track Sheet.xlsx`)[0].data;
    const candidates = xlsx.parse(`${__dirname}/assets/Hiring Candidates Track Sheet.xlsx`)[0].data;
    const overviewGroup = positionStatus(positions);
    const detailGroup = positionDeatil(candidates,positions);
    const hireGroup = positionGroup(positions);
    return {
        overviewGroup,
        detailGroup,
        hireGroup
    }
}
const positionGroup = (data) =>{

   // hireGroup = [
  //{ name: 'IME DEV', filled: 5, total: 10 },
 // { name: 'EAT', filled: 3, total: 10 },
 // { name: 'IME Sustain', filled: 10, total: 10 },
 // { name: 'IME Validation', filled: 7, total: 10 },
 // { name: 'Central Test', filled: 5, total: 10 },
 // { name: 'IT Infra', filled: 2, total: 4 }
//]
    let hireGroupColumn = 'Group',
        hireStatuaCloumn = 'Hiring Status',
        group = [],
        hireGroupValues = getTargetColumn(data,hireGroupColumn),
        hireStatuaValues = getTargetColumn(data,hireStatuaCloumn);

    hireGroupValues.forEach((value,index)=>{
        let groupIndex = group.findIndex(item=>{
           return item && item.name === value;
        });
        if(groupIndex===-1){
           let record = {name:value,filled:0,total:1}
           record.filled = hireStatuaValues[index]==='filled'?1:0;
           group.push(record)
        }
        else{
           group[groupIndex].total += 1;
           group[groupIndex].filled += hireStatuaValues[index]==='filled'?1:0;
        }
    })
    return group;
    
}
const positionStatus = (data)=>{
   // let overviewGroup =[
   //     {"name": "filled", "value": 0},
   //     {"name": "opened", "value": 0}];
    let targetColumn = 'Hiring Status',
        group = [],
        categoryCount = {},
        targetColumnValues = getTargetColumn(data,targetColumn);

    categoryCount = targetColumnValues.reduce((wordCount,word)=>{
      wordCount[word] = ++wordCount[word] || 1;
      return wordCount;
    },{})
    //convert data fromat from {'a':1,'b':2} to [{'name':'a','value':1},{'name':'b','value':2}]
    for(let key in categoryCount){
        group.push({name:key,value:categoryCount[key]});
    }
    return group;
}
const positionDeatil = (candidates,positions)=>{

    // These values has not been settled down yet, hard code it here for now.
    let group =[],
        phoneScreenedColumn = 'Phone Interview Comments',
        onsiteInterviewColumn = 'TP/Onsite Interview Comments',
        degreeColumn = 'Degree',
        workingYearColumn = 'Years of Experience',
        candidatesNumber = candidates.length,
        positionNumber = positions.length,
        phoneInterviewNumber = getTargetColumn(candidates,phoneScreenedColumn).length,
        onsiteInterviewNumber = getTargetColumn(candidates,onsiteInterviewColumn).length,
        offerQuality = `${positionNumber}/${candidatesNumber}`,
        masterDegreeNumber = getTargetColumn(candidates,degreeColumn).reduce((count,degree)=>{
            if(degree==='master'){
                count += 1;
            }
            return count;
        },0),
        masterDegreePercent = Math.round((masterDegreeNumber/candidatesNumber)*100) + '%',
        workingYearSum =  getTargetColumn(candidates,workingYearColumn).reduce((count,workingYear)=>{
           return count + parseInt(workingYear); // as we convert value to string in common place
        },0),
        averageWorkingYear  =  (workingYearSum/candidatesNumber).toPrecision(2);

    group = [
        { name: 'TTF', value: '25' },// this value is not defined yet , leave it hard code
        { name: 'Resume Screened', value: candidatesNumber },
        { name: 'Phone Screened', value: phoneInterviewNumber },
        { name: 'Onsite Interviews', value: onsiteInterviewNumber },
        { name: 'Matrix Interviews', value: onsiteInterviewNumber },// this value id not defined yet, keep it same as onsite interview
        { name: 'Offer Quality', value: offerQuality },
        { name: 'Master + Degree', value: masterDegreePercent },
        { name: 'From China Top 20 Unv.', value: '65%' },// same as TTF
        { name: 'From MNC', value: '70%' },// same as TTF
        { name: 'Avg. Working Yr', value: averageWorkingYear }
    ]
    return group;

}
const getTargetColumn = (data,targetColumn)=>{
    let targetColumnValues = [];
    let columnIndex = data[0].findIndex(item=>{return item===targetColumn});
    data.slice(1).forEach(row=>{
        let value = row[columnIndex];
        if(value && value!== ''){
            value = value.toString().trim();//remove all white space in string ignore blank cells
            targetColumnValues.push(value);
        }
    })
    return targetColumnValues;
}