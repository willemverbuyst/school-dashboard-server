import { cleanUpTables } from "../../src/scripts/cleanupTables";
import { prismaClient } from "../../src/prisma";

cleanUpTables(prismaClient);
