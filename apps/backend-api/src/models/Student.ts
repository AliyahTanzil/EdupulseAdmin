import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface StudentAttributes {
  studentId: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  currentClass: string;
  gender: string;
  dateOfBirth: Date;
  parentContact?: string; // Will be linked to User model
}

interface StudentCreationAttributes extends Optional<StudentAttributes, 'studentId'> {}

class Student extends Model<StudentAttributes, StudentCreationAttributes> implements StudentAttributes {
  public studentId!: string;
  public admissionNumber!: string;
  public firstName!: string;
  public lastName!: string;
  public currentClass!: string;
  public gender!: string;
  public dateOfBirth!: Date;
  public parentContact?: string;

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
    currentClass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    parentContact: {
      type: DataTypes.UUID, // Temporarily UUID, will be foreign key to User model
      allowNull: true, // Allow null for now, as User model is not yet defined
    },
  },
  {
    sequelize,
    tableName: 'Students',
    timestamps: true,
  }
);

export default Student;
