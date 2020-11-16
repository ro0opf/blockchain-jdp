import responseTemplate from '../../common/responseTemplate';
import { Request, Response, NextFunction } from 'express';
import { requestLogging } from '../../common/utils';

const wrapAsync = (fn, doNotLogging) => (
  req,
  res,
  next
) => {
  if (!doNotLogging) requestLogging(req, fn.name);
  fn(req, res, next)
    .then((result) => res.json(responseTemplate(result)))
    .catch(next);
};

const wrapSync = (fn, doNotLogging) => (
    req,
    res,
    next
) => {
  if (!doNotLogging) requestLogging(req, fn.name);
  res.json(responseTemplate(fn(req, res, next)));
};

export { wrapAsync, wrapSync };
