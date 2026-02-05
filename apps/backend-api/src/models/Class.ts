import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { SchoolCategory } from '../config/constants';

// Define the valid departments for SENIOR_SECONDARY
const validDepartments = ['Science', 'Art', 'Commercial'];

interface ClassAttributes {
  classId: string;
  className: string;
  category: keyof typeof SchoolCategory;
  department?: string;
  formTeacherId: string; // Foreign Key to User/Teacher model
}

interface ClassCreationAttributes extends Optional<ClassAttributes, 'classId'> {}

class Class extends Model<ClassAttributes, ClassCreationAttributes> implements ClassAttributes {
  public classId!: string;
  public className!: string;
  public category!: keyof typeof SchoolCategory;
  public department?: string;
  public formTeacherId!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Class.init(
  {
    classId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    className: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(...Object.keys(SchoolCategory)),
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isValidDepartment(value: string | null) {
          if (this.category !== 'SENIOR_SECONDARY' && value) {
            throw new Error('Department can only be set for SENIOR_SECONDARY category.');
          }
          if (this.category === 'SENIOR_SECONDARY' && value && !validDepartments.includes(value)) {
            throw new Error(`'${value}' is not a valid department for the SENIOR_SECONDARY category.`);
          }
        },
      },
    },
    formTeacherId: {
      type: DataTypes.UUID, // Temporarily UUID, will be foreign key to User model
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Classes',
    timestamps: true,
  }
);

export default Class;
