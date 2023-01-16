import { Role } from "@prisma/client";
import { NextFunction, Response } from "express";
import { toData } from "../auth/jwt";
import { RequestWithBody } from "../interfaces/Requests";
import { userQueries } from "../queries";

const { getUserById } = userQueries;

export const studentAuthMiddleware = async (
  req: RequestWithBody,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const auth =
      req.headers.authorization && req.headers.authorization.split(" ");

    if (!auth || !(auth[0] === "Bearer") || !auth[1]) {
      res.status(401).send({
        message:
          "This endpoint requires an Authorization header with a valid token",
      });
      return;
    }

    const data = toData(auth[1]);
    const user = await getUserById((<{ userId: string }>data).userId);

    if (
      !user ||
      !user.student ||
      !user.student.id ||
      user.role !== Role.STUDENT
    ) {
      res.status(403).send({ message: "Student does not exist" });
      return;
    }

    req.body.studentId = user.student.id;

    next();
  } catch (error) {
    let message;
    let name;
    if (error instanceof Error) {
      message = error.message;
      name = error.name;
    } else {
      message = String(error);
      name = "Error";
    }
    // console.log('ERROR IN AUTH MIDDLEWARE', error)

    if (name === "TokenExpiredError") {
      res.status(401).send({ error: name, message: message });
      return;
    }

    if (name === "JsonWebTokenError") {
      res.status(400).send({ error: name, message: message });
      return;
    }

    res.status(500).send({
      message: "Something went wrong",
    });
  }
};
