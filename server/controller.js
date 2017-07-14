import Express from 'express';

import handler from './handlers/handler';


const apiRoutes = Express.Router();

apiRoutes.get('/isilon/trend', (req, res) => {
  let trend = handler.getTrend('isilon');
  res.json(trend);
});

apiRoutes.get('/isilon/overview',(req, res) => {
  let requirements = handler.getOverview('isilon');
  res.json(requirements);
})

apiRoutes.get('/isilon/team',(req, res) => {
  let requirements = handler.getTeam('isilon');
  res.json(requirements);
})

apiRoutes.get('/ecs/trend', (req, res) => {
  let trend = handler.getTrend('ecs');
  res.json(trend);
});

apiRoutes.get('/ecs/overview',(req, res) => {
  let requirements = handler.getOverview('ecs');
  res.json(requirements);
})

apiRoutes.get('/ecs/team',(req, res) => {
  let requirements = handler.getTeam('ecs');
  res.json(requirements);
})

apiRoutes.get('/overview/trend', (req, res) => {
  let trend = handler.getTrend('overview');
  res.json(trend);
});

apiRoutes.get('/overview/overview',(req, res) => {
  let requirements = handler.getOverview('overview');
  res.json(requirements);
})

apiRoutes.get('/overview/team',(req, res) => {
  let requirements = handler.getTeam('overview');
  res.json(requirements);
})

export default apiRoutes;
