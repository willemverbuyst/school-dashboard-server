import { Request } from 'express';

export interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
  teacher?: any;
  student?: any;
}

// export interface RequestWithBodyAndTeacher extends Request {
//   body: { [key: string]: string | undefined };
//   teacher?: any;
// }

// export interface RequestWithBodyAndStudent extends Request {
//   body: { [key: string]: string | undefined };
//   student?: any;
// }
