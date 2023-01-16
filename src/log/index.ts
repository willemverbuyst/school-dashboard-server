import { log, logFinish, logInit } from "./general";

export const logInitRemoval = (): void =>
  logInit(`STARTING TO REMOVE DATA FROM TABLES...`);

export const logRemoval = (table: string): void =>
  log(`Remove all data from the ${table} table`);

export const logFinishRemoval = (): void =>
  logFinish(`DONE, REMOVED DATA FROM TABLES`);

export const logInitSeed = (): void => logInit(`STARTING TO SEED DATA...`);

export const logSeed = (table: string): void =>
  log(`Add data to the ${table} table`);

export const logFinishSeed = (): void => logFinish(`DONE, SEEDED DATA`);
