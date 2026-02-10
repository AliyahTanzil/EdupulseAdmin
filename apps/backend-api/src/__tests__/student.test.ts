import sequelize from '../config/database';
import Student from '../models/Student';
import { SchoolCategory } from '../config/constants';

describe('Student Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  }, 30000);

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await Student.destroy({ where: {} });
  });

  it('should create a student with valid data', async () => {
    const studentData = {
      admissionNumber: '12345',
      firstName: 'John',
      lastName: 'Doe',
      schoolCategory: 'PRIMARY' as keyof typeof SchoolCategory,
      currentClass: 'Primary 1',
      gender: 'Male',
      dateOfBirth: new Date('2010-01-01'),
    };
    const student = await Student.create(studentData);
    expect(student).toBeDefined();
    expect(student.studentId).toBeDefined();
    expect(student.admissionNumber).toBe('12345');
  });

  it('should not create a student with an invalid class for the category', async () => {
    const studentData = {
      admissionNumber: '12346',
      firstName: 'Jane',
      lastName: 'Doe',
      schoolCategory: 'SENIOR_SECONDARY' as keyof typeof SchoolCategory,
      currentClass: 'Primary 1', // Invalid class for this category
      gender: 'Female',
      dateOfBirth: new Date('2005-01-01'),
    };
    await expect(Student.create(studentData)).rejects.toThrow(
      `'Primary 1' is not a valid class for the school category 'SENIOR_SECONDARY'.`
    );
  });

  it('should not create a student with a missing schoolCategory', async () => {
    const studentData = {
      admissionNumber: '12347',
      firstName: 'Jim',
      lastName: 'Beam',
      // schoolCategory is missing
      currentClass: 'JSS 1',
      gender: 'Male',
      dateOfBirth: new Date('2008-01-01'),
    };
    // Need to cast to any to bypass TypeScript's check
    await expect(Student.create(studentData as any)).rejects.toThrow(
      'notNull Violation: Student.schoolCategory cannot be null'
    );
  });

  it('should create students for all categories with valid classes', async () => {
    const studentsData = [
      {
        admissionNumber: 'P001',
        firstName: 'Peter',
        lastName: 'Pan',
        schoolCategory: 'PRIMARY' as keyof typeof SchoolCategory,
        currentClass: 'Primary 6',
        gender: 'Male',
        dateOfBirth: new Date('2009-01-01'),
      },
      {
        admissionNumber: 'J001',
        firstName: 'James',
        lastName: 'Bond',
        schoolCategory: 'JUNIOR_SECONDARY' as keyof typeof SchoolCategory,
        currentClass: 'JSS 3',
        gender: 'Male',
        dateOfBirth: new Date('2006-01-01'),
      },
      {
        admissionNumber: 'S001',
        firstName: 'Sarah',
        lastName: 'Connor',
        schoolCategory: 'SENIOR_SECONDARY' as keyof typeof SchoolCategory,
        currentClass: 'SSS 3',
        gender: 'Female',
        dateOfBirth: new Date('2003-01-01'),
      },
    ];

    for (const data of studentsData) {
      const student = await Student.create(data);
      expect(student).toBeDefined();
    }
  });
});
