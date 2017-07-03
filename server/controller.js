import Express from 'express';
import { getTrend } from './trendHandler';
import { overviewGroup, hireGroup, detailGroup, trendGroup, forecastGroup, tableHeader, tableContent } from './mock';

const apiRoutes = Express.Router();

apiRoutes.get('/dashboard', (req, res) => {
  res.json({ overviewGroup, hireGroup, detailGroup, trendGroup, forecastGroup, tableHeader, tableContent });
});

apiRoutes.get('/trend', (req, res) => {
  let trend = getTrend();
  res.json(trend);
});



getTrend();

export default apiRoutes;
