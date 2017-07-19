import { candidatesHandler } from './candidatesHandler';
import { reqHandler} from './reqHandler';
import { getTrend } from './trendHandler';

export default {
  getOverview,
  getTeam,
  getTrend
};

const KEYS = [ 'onboard', 'offered', 'open', 'cv', 'resume', 'phone', 'onsite', 'reject', 'resumeReject', 'phoneReject', 'onsiteReject', 'onsitePoolAugust' ];
const DEFAULTS = KEYS.reduce((a, b) => { a[b] = 0; return a }, {});
//total is need in hightlight
const NEWKEYS = KEYS.push('total')

//@params rawData{name:string,onboard:0,offered:0,open:0}[]
//@return number
function getTargetValueSum(rawData,key){
  let sum =  rawData.reduce((res, group, index) =>{
    return res+= group[key] ? group[key] : 0;
  },0)
  return sum;
}
//@params rawData{name:string,onboard:0,offered:0,open:0}[]
//@return object[]
function getAllValueSum(rawData){
  let allSum = KEYS.reduce((res, key)=>{
    res[key] = getTargetValueSum(rawData,key);
    return res;
  },{})
  return allSum;
}
function getOverview(project){
  let groupOverall = getTeam(project);
  let overview = getAllValueSum(groupOverall);
  return {
    status: {
      onboard: overview.onboard,
      offered: overview.offered,
      open: overview.open
    },
    highlight: {
      ttf: 'N/A',
      total: overview.total,
      cv: overview.cv,
      resume: overview.resume,
      phone: overview.phone,
      onsite: overview.onsite,
      reject: overview.reject,
      offered: overview.offered,
      onboard: overview.onboard,
      resumeReject: overview.resumeReject,
      phoneReject: overview.phoneReject,
      onsiteReject: overview.onsiteReject,
      onsitePoolAugust: overview.onsitePoolAugust
    }
  }
}

function getTeam(project) {
  if (project === 'overview') {
    return [...getTeam('ecs'), ...getTeam('isilon')];
  }
  return mergeGroup([...reqHandler(project), ...candidatesHandler(project) ], DEFAULTS)
    .map(a => Object.assign({},a, { filled: a.offered + a.onboard, total: a.open + a.offered + a.onboard } ));
}

// Merge the all keys into its corresponding group name without duplicate.
// @params groups: {name: string, ...obj}[]
// @return {name: string, ...obj}[]
function mergeGroup(groups, defaults) {
  let groupNames = [...new Set(groups.map(({name})=> name))];
  return groupNames.map(targetName => {
    let matchGroups =  groups.filter(({name}) => name === targetName);
    return Object.assign({}, defaults, ...matchGroups);
  })
}
