import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Ingredient, Recipe } from 'src/recipe/entity/recipe';
import { initialSchema1665490266140 } from 'src/migrations/1665490266140-initial-schema';
import { User } from 'src/auth/entity/user';
import { addUser1666430321163 } from 'src/migrations/1666430321163-add-user';
import { addImageToRecipe1668488964649 } from 'src/migrations/1668488964649-add-image-to-recipe';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  logging: configService.get<boolean>('DB_LOGGING'),
  entities: [Recipe, Ingredient, User],
  migrations: [
    initialSchema1665490266140,
    addUser1666430321163,
    addImageToRecipe1668488964649,
  ],
});
