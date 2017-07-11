import {
  candidatesHandler
} from './candidatesHandler';
import {
  reqHandler
} from './reqHandler';

export const getOverview = () => {
  let groupOverall = mergeGroup(reqHandler(), candidatesHandler());
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
      open: overview.open
    },
    highlight: {
      ttf: 'N/A',
      onboard: overview.onboard,
      offered: overview.offered,
      resume: overview.resume,
      phone: overview.phone,
      onsite: overview.onsite,
    }
  }

}

export const getTeam = () => {
  return mergeGroup(reqHandler(), candidatesHandler());

}

export const mergeGroup = (req, candidates) => {

  let defaultCandeGroup = {
    resume: 0,
    phone: 0,
    onsite: 0
  };
  let groupOverall = req.reduce((groupOverall, reqGroup, index) => {
    let reqGroupName = reqGroup.name.toLowerCase();
    reqGroup.filled = reqGroup.offered + reqGroup.onboard;
    reqGroup.total = reqGroup.open + reqGroup.filled;
    let candeGroup = candidates.reduce((result, item) => {
      if (reqGroupName.indexOf(item.name.toLowerCase()) !== -1) {
        result = item;
        //return result;
      }
      return result;
    },{});

    if (Object.keys(candeGroup).length !== 0) {
      return [...groupOverall, Object.assign(reqGroup,candeGroup)];
    } else {
      return [...groupOverall, Object.assign(reqGroup,defaultCandeGroup)];
    }
  }, []);
  return groupOverall;
}