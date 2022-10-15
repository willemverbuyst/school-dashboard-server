import { School } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { faker } from '@faker-js/faker'

export const schools: Array<School> = Array(4)
  .fill(0)
  .map(() => ({
    id: uuidv4(),
    name: faker.company.name(),
    location: faker.address.city(),
  }))
