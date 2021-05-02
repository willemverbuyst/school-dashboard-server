import 'reflect-metadata';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express';

// To limit the use of the decorator
interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, _desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.Path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.Method, method, target, key);
    };
  };
}

export const del = routeBinder(Methods.Del);
export const get = routeBinder(Methods.Get);
export const patch = routeBinder(Methods.Patch);
export const post = routeBinder(Methods.Post);
export const put = routeBinder(Methods.Put);
