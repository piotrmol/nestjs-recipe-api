import { Unit } from 'src/recipe/dto/recipe.dto';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class initialSchema1665490266140 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'recipe',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'ingredient',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'unit',
            type: 'varchar',
            isNullable: false,
            enum: [...Object.values(Unit)],
          },
          {
            name: 'quantity',
            type: 'integer',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.addColumn(
      'ingredient',
      new TableColumn({
        name: 'recipeId',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'ingredient',
      new TableForeignKey({
        columnNames: ['recipeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'recipe',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('ingredient');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('recipeId') !== -1,
    );

    await queryRunner.dropForeignKey('ingredient', foreignKey);
    await queryRunner.dropColumn('ingredient', 'recipeId');
    await queryRunner.dropTable('ingredient');
    await queryRunner.dropTable('recipe');
  }
}
