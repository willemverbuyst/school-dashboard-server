import { Request } from 'express';

export interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

export interface RequestWithBodyAndTeacher extends Request {
  body: { [key: string]: string | undefined };
  teacher: any;
}

export interface RequestWithBodyAndStudent extends Request {
  body: { [key: string]: string | undefined };
  student: any;
}
