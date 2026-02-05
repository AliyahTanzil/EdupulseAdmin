import sequelize from '../config/database';
import Class from '../models/Class';
import { SchoolCategory } from '../config/constants';

describe('Class Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  }, 30000);

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await Class.destroy({ where: {} });
  });

  it('should create a class with valid data', async () => {
    const classData = {
      className: 'SSS 1',
      category: 'SENIOR_SECONDARY' as keyof typeof SchoolCategory,
      department: 'Science',
      formTeacherId: 'b7a3c3c0-9a74-4d83-8a21-9d2a6e5b4b7a', // dummy UUID
    };
    const newClass = await Class.create(classData);
    expect(newClass).toBeDefined();
    expect(newClass.classId).toBeDefined();
    expect(newClass.className).toBe('SSS 1');
    expect(newClass.department).toBe('Science');
  });

  it('should not create a class with an invalid department for the category', async () => {
    const classData = {
      className: 'SSS 1',
      category: 'SENIOR_SECONDARY' as keyof typeof SchoolCategory,
      department: 'Invalid Department',
      formTeacherId: 'b7a3c3c0-9a74-4d83-8a21-9d2a6e5b4b7a',
    };
    await expect(Class.create(classData)).rejects.toThrow(
      `'Invalid Department' is not a valid department for the SENIOR_SECONDARY category.`
    );
  });

  it('should not create a class with a department for a non-senior secondary category', async () => {
    const classData = {
      className: 'JSS 1',
      category: 'JUNIOR_SECONDARY' as keyof typeof SchoolCategory,
      department: 'Science',
      formTeacherId: 'b7a3c3c0-9a74-4d83-8a21-9d2a6e5b4b7a',
    };
    await expect(Class.create(classData)).rejects.toThrow(
      'Department can only be set for SENIOR_SECONDARY category.'
    );
  });

  it('should create a class without a department for a senior secondary category', async () => {
    const classData = {
      className: 'SSS 1',
      category: 'SENIOR_SECONDARY' as keyof typeof SchoolCategory,
      formTeacherId: 'b7a3c3c0-9a74-4d83-8a21-9d2a6e5b4b7a',
    };
    const newClass = await Class.create(classData);
    expect(newClass).toBeDefined();
    expect(newClass.classId).toBeDefined();
    expect(newClass.className).toBe('SSS 1');
    expect(newClass.department).toBe(null);
  });
});
