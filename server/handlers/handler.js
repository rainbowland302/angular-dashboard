import { candidatesHandler } from './candidatesHandler';
import { reqHandler} from './reqHandler';
import { getTrend } from './trendHandler';

export default {
  getOverview,
  getTeam,
  getTeamNew,
  getTrend
};

const KEYS = [ 'onboard', 'offered', 'open', 'cv', 'resume', 'phone', 'onsite', 'reject', 'resumeReject', 'phoneReject', 'tpReject', 'onsiteReject', 'hirable', 'onsitePoolAugust',
  'cvPhone', 'phoneTP', 'TPOnsite', 'cvTP', 'cvOnsite', 'phoneOnsite' ];

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
  let groupNumber = (key) => groupOverall.reduce((a,b) => a + (b[key] ? 1 : 0), 0);
  let overviewByQuarter = sumByQuarter(groupOverall);
  let overview = getAllValueSum(groupOverall);
  
  return {
    status: {
      offered: overview.offered,
      open: overview.open
    },
    highlight: overviewByQuarter
    // highlight: {
    //   ttf: 'N/A',
    //   total: overview.total,
    //   cv: overview.cv,
    //   resume: overview.resume,
    //   phone: overview.phone,
    //   onsite: overview.onsite,
    //   reject: overview.reject,
    //   offered: overview.offered,
    //   onboard: overview.onboard,
    //   resumeReject: overview.resumeReject,
    //   phoneReject: overview.phoneReject,
    //   tpReject: overview.tpReject,
    //   onsiteReject: overview.onsiteReject,
    //   hirable: overview.hirable,
    //   onsitePoolAugust: overview.onsitePoolAugust
    // },
    // avgTime: {
    //   'cvPhone': Number((overview.cvPhone / groupNumber('cvPhone')).toFixed(1)),
    //   'phoneTP': Number((overview.phoneTP / groupNumber('phoneTP')).toFixed(1)),
    //   'TPOnsite': Number((overview.TPOnsite / groupNumber('TPOnsite')).toFixed(1)),
    //   'cvTP': Number((overview.cvTP / groupNumber('cvTP')).toFixed(1)),
    //   'cvOnsite': Number((overview.cvOnsite / groupNumber('cvOnsite')).toFixed(1)),
    //   'phoneOnsite': Number((overview.phoneOnsite / groupNumber('phoneOnsite')).toFixed(1))
    // }
  }
}

function getTeam(project) {
  if (project === 'overview') {
    return [...getTeam('ecs'), ...getTeam('isilon')];
  }
  let mergedContents = mergeGroup([...reqHandler(project), ...candidatesHandler(project) ], DEFAULTS)
  return mergedContents.map(a => Object.assign({},a, { filled: a.offered , total: a.open + a.offered } ));
}

function getTeamNew(project){
  let mergedContents = getTeam(project);
  let res = formatedGetTeam(mergedContents);
  return res;
}

function formatedGetTeam(teamArrayByQuarter){
  let teams = [...new Set(teamArrayByQuarter.map(({name})=>name))];
  let sameTeams = teams.map(team=>{
   let matchedTeams =  teamArrayByQuarter.filter(tb=>{
      return tb.name === team;
    });
   let filledOpen = matchedTeams.reduce((resSum, team)=>{
      resSum['filled'] += team.filled;
      resSum['open'] += team.open;
      resSum['name'] = team.name;
      resSum['total'] += team.total;
      return resSum;
    },{'filled':0,'open':0,'total':0});
    return {'name':filledOpen.name, 'filled':filledOpen.filled, 'open':filledOpen.open, 'total':filledOpen.total, 'groups':matchedTeams};
  });
  return sameTeams;
}

// Merge the all keys into its corresponding group name without duplicate.
// @params groups: {name: string, ...obj}[]
// @return {name: string, ...obj}[]
function mergeGroup(groups, defaults) {
  let groupAndQuarter = [...new Set(groups.map(({name, season})=> {return {name,season}}))];
  let uniqGroupAndQuarter = new Set(groupAndQuarter.map(e => JSON.stringify(e)));
  let res = Array.from(uniqGroupAndQuarter).map(e => JSON.parse(e));

  return res.map(({name, season}) => {
    let matchGroups =  groups.filter((group) => {
     return  name === group.name && season === group.season;
    });
    return Object.assign({}, defaults, ...matchGroups);
  })
}

function sumByQuarter(groups){
  let quarters = [...new Set(groups.map(({season})=> season))];
  return quarters.map(quarter=>{
    let matchedContents = groups.filter(group=>{
      return group.season === quarter;
    })
    return KEYS.reduce((sumRes, key)=>{
      sumRes[key] = matchedContents.reduce((res,matched)=>{
         res += matched[key]? matched[key] : 0;
         return res;
      },0);
      return sumRes;
    },{'season':quarter})
  })
}
