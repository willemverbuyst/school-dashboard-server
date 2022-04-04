#!/bin/bash

echo "--start test script--" 

npx prisma migrate reset
npx ts-node ./cypress/scripts/seedTestData.ts

echo "--end test script--"

