import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitDB1640706454522 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const UsersTable = new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'INT',
          isGenerated: true,
          isPrimary: true,
          generationStrategy: 'increment',
        },
        { name: 'email', type: 'CHAR', length: '30', isNullable: false },
        { name: 'password', type: 'CHAR', length: '40', isNullable: false },
      ],
    });
    await queryRunner.createTable(UsersTable, true);

    const ProductsTable = new Table({
      name: 'products',
      columns: [
        {
          name: 'id',
          type: 'INT',
          isGenerated: true,
          isPrimary: true,
          generationStrategy: 'increment',
        },
        { name: 'name', type: 'CHAR', length: '30', isNullable: false },
      ],
    });
    await queryRunner.createTable(ProductsTable, true);

    await queryRunner.query(
      `INSERT INTO users (email, password) VALUES
        ('admin@admin.ru', '0DPiKuNIrrVmD8IUCuw1hQxNqZc=')`, // 0DPiKuNIrrVmD8IUCuw1hQxNqZc= - admin
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users`);
    await queryRunner.query(`DROP TABLE products`);
  }
}
