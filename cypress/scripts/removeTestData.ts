import { cleanUpTables } from '../../scripts/cleanupTables'
import { prismaClient } from '../../src/prisma'

cleanUpTables(prismaClient)
