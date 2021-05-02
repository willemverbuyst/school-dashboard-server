import { NextFunction, Request, Response } from 'express';

class LoginController {
  getLogout(_req: Request, res: Response, _next: NextFunction): void {
    res.send('You are logged out');
  }
}
