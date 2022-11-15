import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user';
import { AwsS3Module } from 'src/aws-s3/s3.module';
import { Recipe } from './entity/recipe';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService],
  imports: [TypeOrmModule.forFeature([Recipe, User]), AwsS3Module],
  exports: [TypeOrmModule],
})
export class RecipeModule {}
