import { faker } from "@faker-js/faker";
import { School } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { numberOfSchools } from "./config";

export const schools: Array<School> = Array(numberOfSchools)
  .fill(0)
  .map(() => ({
    id: uuidv4(),
    name: faker.company.name(),
    location: faker.address.city(),
  }));
