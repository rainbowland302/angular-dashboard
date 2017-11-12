import Express from 'express';

import handler from './handlers/handler';


const apiRoutes = Express.Router();

apiRoutes.get('/:project/trend', (req, res) => {
  let project = req.url.split('/')[1];
  let trend = handler.getTrend(project);
  res.json(trend);
});

apiRoutes.get('/:project/overview',(req, res) => {
  let project = req.url.split('/')[1];
  let requirements = handler.getOverview(project);
  res.json(requirements);
})
apiRoutes.get('/:project/teamnew',(req, res) => {
  let project = req.url.split('/')[1];
  let requirements = handler.getTeamNew(project);
  res.json(requirements);
})

apiRoutes.get('/:project/team',(req, res) => {
  let project = req.url.split('/')[1];
  let requirements = handler.getTeam(project);
  res.json(requirements);
})
export default apiRoutes;
