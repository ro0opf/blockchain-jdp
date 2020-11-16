import * as express from 'express';
import controller from './controller';
import { wrapAsync } from '../controllerWrapper';
export default express
  .Router()
  .post('/token', wrapAsync(controller.sendToken))
  .get('/token', wrapAsync(controller.getToken))
  .post('/event', wrapAsync(controller.createEvent))
  .get('/event', wrapAsync(controller.getEventInfo))
  .post('/reward', wrapAsync(controller.sendReward))
  .put('/state', wrapAsync(controller.changeEventState))
  .get('/state', wrapAsync(controller.getEventState));
