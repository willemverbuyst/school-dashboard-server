#!/bin/bash

echo "--start test script--" 

npx ts-node ./cypress/scripts/removeTestData.ts
npx ts-node ./cypress/scripts/seedTestData.ts

echo "--end test script--"

