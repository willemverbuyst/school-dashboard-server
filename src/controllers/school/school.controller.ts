import { NextFunction, Response } from "express";
import { RequestWithBody } from "../../interfaces/Requests";
import { schoolQueries } from "../../queries";
import { controller, get } from "../decorators";

const { getAllSchools } = schoolQueries;

@controller("/schools")
export class SchoolController {
  @get("/")
  async getSchools(
    _req: RequestWithBody,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const schools = await getAllSchools();

      if (!schools) {
        res.send({ message: "No schools found" });
      }

      res.send({ results: schools.length, data: schools });
    } catch (error) {
      next(error);
    }
  }
}
