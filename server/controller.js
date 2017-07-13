import Express from 'express';

import handler from './handlers/handler';


const apiRoutes = Express.Router();

apiRoutes.get('/trend', (req, res) => {
  let trend = handler.getTrend();
  res.json(trend);
});

apiRoutes.get('/overview',(req, res) => {
  let requirements = handler.getOverview();
  res.json(requirements);
})

apiRoutes.get('/team',(req, res) => {
  let requirements = handler.getTeam();
  res.json(requirements);
})

export default apiRoutes;
