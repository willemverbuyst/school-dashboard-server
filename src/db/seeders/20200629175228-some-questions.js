'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'questions',
      [
        {
          text: 'What is the capital of Belgium?',
          subjectId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'What the highest mountain in the world?',
          subjectId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'What is the official language of Colombia?',
          subjectId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'How many citizens are there in the Netherlands?',
          subjectId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'How many stars and stripes does the US flag have?',
          subjectId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'In which year did humans land on the moon for the first time?',
          subjectId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text:
            'Who was prime minister of the UK for most of the Second World War?',
          subjectId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'Which civilization constructed Machu Picchu complex?',
          subjectId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'In what year did Columbus discover America?',
          subjectId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'Remains of the earliest proposed Homo sapiens, were found in?',
          subjectId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'How much is 4 x 34?',
          subjectId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'How much is 4 + 12?',
          subjectId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'How much is 100 / 4?',
          subjectId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'How much is 10 + 4?',
          subjectId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'How much is 35 / 5?',
          subjectId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('questions', null, {});
  },
};
