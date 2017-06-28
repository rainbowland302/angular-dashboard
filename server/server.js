/* Server Packages */
import Express from 'express';
import bodyParser from 'body-parser';

import apiRoutes from './controller';

// Initialize Express server
const app = new Express();
const port = process.env.PORT || 3000;

// set static file location
app.use('/', Express.static(require('path').resolve(__dirname, '../dist')));

//Config App
app.use(bodyParser.urlencoded({ extended: false })); // only can deal with key/value
app.use(bodyParser.json()); // use body parser so we can get info from POST and/or URL parameters

// Set API prefix, Use apiRoutes of  Controller to resolve
app.use('/api', apiRoutes);

// Error console
app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> Listening on port ${port}`);
  }
});

export default app;
