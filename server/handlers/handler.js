import { candidatesHandler } from './candidatesHandler';
import { reqHandler} from './reqHandler';
import { getTrend } from './trendHandler';

export default {
  getOverview,
  getTeam,
  getTrend
};

const KEYS = [ 'onboard', 'offered', 'open', 'cv', 'resume', 'phone', 'onsite', 'reject', 'resumeReject', 'phoneReject', 'onsiteReject' ];
const DEFAULTS = KEYS.reduce((a, b) => { a[b] = 0; return a }, {});

function getOverview () {
  let groupOverall = getTeam();
  let overview = groupOverall.reduce((overview, group, index) => {
    Object.keys(group).forEach(key => {
      if (key !== 'name') {
        if (overview[key]) {
          overview[key] += group[key] ? group[key] : 0;
        } else {
          overview[key] = group[key] ? group[key] : 0;
        }
      }
    })
    return overview;
  }, {});

  return {
    status: {
      onboard: overview.onboard,
      offered: overview.offered,
      open: overview.open -2
    },
    highlight: {
      ttf: 'N/A',
      total: overview.total -2,
      cv: overview.cv,
      resume: overview.resume,
      phone: overview.phone,
      onsite: overview.onsite,
      reject: overview.reject,
      offered: overview.offered,
      onboard: overview.onboard,
      resumeReject: overview.resumeReject,
      phoneReject: overview.phoneReject,
      onsiteReject: overview.onsiteReject
    }
  }

}

function getTeam() {
  return mergeGroup([...reqHandler(), ...candidatesHandler() ], DEFAULTS)
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
