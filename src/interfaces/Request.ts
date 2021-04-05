import { Request } from 'express';

export interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

export interface RequestTeacher extends Request {
  body: { [key: string]: string | undefined };
  teacher: any;
}
