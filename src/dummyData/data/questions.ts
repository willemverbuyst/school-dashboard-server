import { Question } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { subjects } from "./subjects";

const geography = [
  "What is the capital of Belgium?",
  "What the highest mountain in the world?",
  "What is the official language of Colombia?",
  "How many citizens are there in the Netherlands?",
  "How many stars and stripes does the US flag have?",
];

const history = [
  "In which year did humans land on the moon for the first time?",
  "Who was prime minister of the UK for most of the Second World War?",
  "Which civilization constructed Machu Picchu complex?",
  "In what year did Columbus discover America?",
  "Remains of the earliest proposed Homo sapiens, were found in?",
];

const math = [
  "How much is 4 x 34?",
  "How much is 4 + 12?",
  "How much is 100 / 4?",
  "How much is 10 + 4?",
  "How much is 35 / 5?",
];

export const questionsGeography: Array<Question> = geography.map(
  (question) => ({
    id: uuidv4(),
    text: question,
    subjectId: subjects[0].id,
  })
);

export const questionsHistory: Array<Question> = history.map((question) => ({
  id: uuidv4(),
  text: question,
  subjectId: subjects[1].id,
}));

export const questionsMath: Array<Question> = math.map((question) => ({
  id: uuidv4(),
  text: question,
  subjectId: subjects[2].id,
}));

export const questions: Array<Question> = [
  ...questionsGeography,
  ...questionsHistory,
  ...questionsMath,
];
