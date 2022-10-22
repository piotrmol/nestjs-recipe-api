import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/User';
import { Recipe } from './entity/recipe';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService],
  imports: [TypeOrmModule.forFeature([Recipe, User])],
})
export class RecipeModule {}
