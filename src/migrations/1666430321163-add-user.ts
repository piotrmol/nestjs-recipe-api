import { Role } from 'src/auth/entity/User';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class addUser1666430321163 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'email',
            type: 'varchar',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
            enum: [...Object.values(Role)],
            default: Role.USER,
          },
        ],
      }),
    );

    await queryRunner.addColumn(
      'recipe',
      new TableColumn({
        name: 'userId',
        type: 'varchar',
      }),
    );

    await queryRunner.createForeignKey(
      'recipe',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['email'],
        referencedTableName: 'user',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('recipe');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );

    await queryRunner.dropForeignKey('recipe', foreignKey);
    await queryRunner.dropColumn('recipe', 'userId');
    await queryRunner.dropTable('user');
  }
}
