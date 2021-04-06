// import { Model, Optional } from 'sequelize';

// interface SubjectAttributes {
//   id: number;
//   name: string;
// }

// interface SubjectCreationAttributes extends Optional<SubjectAttributes, 'id'> {}

// export interface SubjectInstance
//   extends Model<SubjectAttributes, SubjectCreationAttributes>,
//     SubjectAttributes {
//   createdAt?: Date;
//   updatedAt?: Date;
// }

export interface SubjectWithAnswers {
  id: number;
  name: string;
  tests: Answer[];
}

interface Answer {
  answer1: number;
  answer2: number;
  answer3: number;
}

export interface ITest {
  answer1: number;
  answer2: number;
  answer3: number;
  subject: {
    createdAt: Date;
    id: number;
    name: string;
    updatedAt: Date;
  };
}
