import { UserRole } from 'src/auth/entity/user';
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
            name: 'userRole',
            type: 'varchar',
            isNullable: false,
            enum: [...Object.values(UserRole)],
            default: UserRole.USER,
          },
        ],
      }),
    );

    await queryRunner.addColumn(
      'recipe',
      new TableColumn({
        name: 'userEmail',
        type: 'varchar',
      }),
    );

    await queryRunner.createForeignKey(
      'recipe',
      new TableForeignKey({
        columnNames: ['userEmail'],
        referencedColumnNames: ['email'],
        referencedTableName: 'user',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('recipe');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userEmail') !== -1,
    );

    await queryRunner.dropForeignKey('recipe', foreignKey);
    await queryRunner.dropColumn('recipe', 'userEmail');
    await queryRunner.dropTable('user');
  }
}
