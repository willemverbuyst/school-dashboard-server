#!/bin/bash

echo "--start dev-db script--" 

npx prisma migrate reset
npx ts-node ./src/dummyData/scripts/removeDummyData.ts
npx ts-node ./src/dummyData/scripts/seedDummyData.ts

echo "--end dev-db script--"

