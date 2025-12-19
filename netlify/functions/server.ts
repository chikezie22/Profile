import express from 'express';
import { createRequestHandler } from '@react-router/express';
import serverless from 'serverless-http';
// @ts-ignore - The build file is generated at build time
import * as build from '../../build/server/index.js';

const app = express();

app.use(
  createRequestHandler({
    build,
    mode: 'production',
  })
);

export const handler = serverless(app);
