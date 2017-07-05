import Express from 'express';
import { getTrend } from './trendHandler';
import { getPosition } from './positionHandler';
import {trendGroup, forecastGroup, tableHeader, tableContent } from './mock';

const apiRoutes = Express.Router();

apiRoutes.get('/dashboard', (req, res) => {
  let position = getPosition();
  res.json({ position, trendGroup, forecastGroup, tableHeader, tableContent });
});

apiRoutes.get('/trend', (req, res) => {
  let trend = getTrend();
  res.json(trend);
});

apiRoutes.get('/position',(req, res) => {
  let position = getPosition();
  res.json(position);
})


getTrend();
getPosition();

export default apiRoutes;
