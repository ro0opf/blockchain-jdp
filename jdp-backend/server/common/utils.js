import { Request } from 'express';
import l from './logger';
import crypto from 'crypto';

function _makeArgsList(argsName, args){
  return !args || Object.keys(args).length === 0
    ? ''
    : `, ${argsName} = ${JSON.stringify(args)}`;
}

function _makeReqArgs(argsName, args){
  return !args || Object.keys(args).length === 0
    ? ''
    : `${argsName} = ${JSON.stringify(args)}`;
}

export const requestLogging = (req, fnName) => {
  const queryArgs = _makeArgsList('Query Params', req.query);
  const bodyArgs = _makeArgsList('Body', req.body);
  const params = _makeArgsList('Params ', req.params);
  l.info(
    `Path = ${
      req.baseUrl + req.path
    }, Function = ${fnName}${queryArgs}${bodyArgs}${params}`
  );
};

export const getRequestParams = (req) => {
  const queryArgs = _makeReqArgs('Query Params', req.query);
  const bodyArgs = _makeReqArgs('Body', req.body);
  const params = _makeReqArgs('Params ', req.params);
  return `${queryArgs}${bodyArgs}${params}`;
};

export const getTraceId = (dataId, accessTime) => {
  const traceHash = crypto.createHash('sha256');
  traceHash.update(dataId);
  traceHash.update(accessTime);
  return '0x' + traceHash.digest('hex').substr(0, 40);
};
