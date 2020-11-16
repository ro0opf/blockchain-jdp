import examplesRouter from './api/controllers/examples/router';
import votesRouter from './api/controllers/votes/router';

export default function routes(app) {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/votes', votesRouter);
}
