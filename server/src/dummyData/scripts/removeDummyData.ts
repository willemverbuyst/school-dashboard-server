import { cleanUpTables } from '../../../../scripts/cleanupTables'
import { prismaClient } from '../../prisma'

cleanUpTables(prismaClient)
