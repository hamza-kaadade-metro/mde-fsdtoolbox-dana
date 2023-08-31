//Load env variables for local development
import 'dotenv/config';

import Logger from '@metro-mde/logger';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction as ExNext, Request as ExRequest, Response as ExResponse } from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../build/routes';

const port = process.env.DRP_CF_HTTP_PORT || 8080;
const app = express();
app.use('/docs', swaggerUi.serve, async (req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await import('../build/swagger.json')));
});
app.use(bodyParser.json({ limit: '50mb' }));

//CORS

const origin = '*';
app.use(cors({ origin }));
RegisterRoutes(app);

/**
 * *Deploymentspecificroutes
 * */
app.get('/.well-known/live', (req, res) => {
  return res.status(204).send();
});
app.get('/.well-known/ready', (req, res) => {
  return res.status(204).send();
});

/**
 *Errorhandling
 */
app.use((err: any, req: ExRequest, res: ExResponse, next: ExNext) => {
  const status = err.statusCode || 500;
  Logger.error(err);
  res.status(status).send(err);
});

app.listen(port, () => {
  Logger.info(`Demo backend up on port${port}`);
});
