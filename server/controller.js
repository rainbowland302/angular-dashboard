import Express from 'express';
import { getTrend } from './handlers/trendHandler';
import { getPosition } from './handlers/positionHandler';
import { overviewGroup, hireGroup, detailGroup, trendGroup, forecastGroup, tableHeader, tableContent } from './assets/mock';

const apiRoutes = Express.Router();

// TODO: mock data (will be removed later)
apiRoutes.get('/dashboard', (req, res) => {
  res.json({ overviewGroup, hireGroup, detailGroup, trendGroup, forecastGroup, tableHeader, tableContent });
});

apiRoutes.get('/trend', (req, res) => {
  let trend = getTrend();
  res.json(trend);
});

apiRoutes.get('/position',(req, res) => {
  let position = getPosition();
  res.json(position);
})

export default apiRoutes;
