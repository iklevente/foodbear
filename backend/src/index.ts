import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
const cors = require('cors');
const bodyParser = require('body-parser');
import { connectionOptions } from '../ormconfig';
import { getAuthRoutes } from './routes/auth.routes';
import { getPartnerRoutes } from './routes/parter.routes';
import { getFoodRoutes } from './routes/food.routes';
import { getOrderRoutes } from './routes/order.routes';
import { getCourierRoutes } from './routes/courier.routes';

console.log('host', process.env.MSSQL_HOST);
createConnection(connectionOptions)
  .then(async (connection) => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use(getAuthRoutes());
    app.use(getPartnerRoutes());
    app.use(getFoodRoutes());
    app.use(getOrderRoutes());
    app.use(getCourierRoutes());

    app.use(function (err, req, res, next) {
      console.error(err.message);
      if (!err.statusCode) err.statusCode = 500;
      res.status(err.statusCode).send(err.message);
    });
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server listening on :${port} ...`);
    });
  })
  .catch((error) => console.log('index error' + error));
