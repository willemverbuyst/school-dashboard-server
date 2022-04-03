import { cleanUpTables } from '../../src/prisma/scripts/cleanupTables'
import { prismaClient } from '../../src/prisma'

cleanUpTables(prismaClient)
