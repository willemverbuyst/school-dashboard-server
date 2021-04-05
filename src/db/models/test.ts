import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

interface TestAttributes {
  id: string;
  question1: number;
  question2: number;
  question3: number;
  answer1: number;
  answer2: number;
  answer3: number;
}

interface TestCreationAttributes extends Optional<TestAttributes, 'id'> {}

interface TestInstance
  extends Model<TestAttributes, TestCreationAttributes>,
    TestAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Test = sequelize.define<TestInstance>('test', {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
  },
  question1: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  question2: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  question3: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  answer1: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  answer2: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  answer3: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});

export default Test;
