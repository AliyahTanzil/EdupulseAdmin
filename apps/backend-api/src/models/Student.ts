import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Class from './Class'; // Import Class model
import { User } from './User'; // Import User model

interface StudentAttributes {
  studentId: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  currentClassId: string; // Foreign Key to Class model
  gender: string;
  dateOfBirth: Date;
  parentContactId?: number; // Foreign Key to User model
}

interface StudentCreationAttributes extends Optional<StudentAttributes, 'studentId'> {}

class Student extends Model<StudentAttributes, StudentCreationAttributes> implements StudentAttributes {
  public studentId!: string;
  public admissionNumber!: string;
  public firstName!: string;
  public lastName!: string;
  public currentClassId!: string;
  public gender!: string;
  public dateOfBirth!: Date;
  public parentContactId?: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Student.init(
  {
    studentId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    admissionNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentClassId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Class,
        key: 'classId',
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    parentContactId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'Students',
    timestamps: true,
  }
);

Student.belongsTo(Class, { foreignKey: 'currentClassId' });
Student.belongsTo(User, { foreignKey: 'parentContactId' });

export default Student;
