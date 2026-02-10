import sequelize from '../config/database';

describe('Database Connection', () => {
  it('should connect to the database successfully', async () => {
    let error: Error | null = null;
    try {
      await sequelize.authenticate();
    } catch (err) {
      error = err as Error;
    }
    expect(error).toBeNull();
  });
});
