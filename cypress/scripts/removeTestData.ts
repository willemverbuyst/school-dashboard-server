import { cleanUpTables } from '../../scripts/cleanupTables'
import { prismaClient } from '../../server/src/prisma'

cleanUpTables(prismaClient)
