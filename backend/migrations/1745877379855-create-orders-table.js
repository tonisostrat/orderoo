module.exports = class CreateOrdersTable1745877379855 {
  async up(queryRunner) {
    queryRunner.query(`
      CREATE TABLE orders
      (
        id SERIAL PRIMARY KEY,
        public_id TEXT NOT NULL UNIQUE,
        external_id TEXT NOT NULL UNIQUE,
        amount NUMERIC(33, 18) NOT NULL,
        currency TEXT NOT NULL,
        due_date TIMESTAMP WITH TIME ZONE NOT NULL,
        description TEXT,
        street TEXT NOT NULL,
        town TEXT NOT NULL,
        country TEXT NOT NULL,
        create_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        update_date TIMESTAMP WITH TIME ZONE,
        delete_date TIMESTAMP WITH TIME ZONE
      );
    `);
  }

  async down(queryRunner) {}
};
