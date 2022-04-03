#!/bin/bash

echo "--start test script--" 

cd ./src
npx prisma db push --preview-feature
npx ts-node ./prisma/dummyData/_removeDummyData.ts
cd ../
npx ts-node ./cypress/scripts/seedTestData.ts

echo "--end test script--"

