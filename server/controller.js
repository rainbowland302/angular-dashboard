import Express from 'express';
import { overviewGroup, hireGroup, detailGroup, trendGroup, forecastGroup, tableHeader, tableContent } from './mock';

const apiRoutes = Express.Router();

apiRoutes.get('/dashboard', (req, res) => {
  res.json({ overviewGroup, hireGroup, detailGroup, trendGroup, forecastGroup, tableHeader, tableContent });
});

export default apiRoutes;
