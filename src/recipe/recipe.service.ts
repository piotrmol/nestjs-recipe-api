import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user';
import { S3Service } from 'src/aws-s3/s3.service';
import { Repository } from 'typeorm';
import { RecipeDto } from './dto/recipe.dto';
import { Recipe } from './entity/recipe';
import { Express } from 'express';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private s3Service: S3Service,
  ) {}

  async getRecipes(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  async getRecipe(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({ where: { id } });
    if (!recipe) {
      throw new HttpException('No entity found', HttpStatus.NOT_FOUND);
    }
    return recipe;
  }

  async createRecipe(recipeDto: RecipeDto, userEmail: string): Promise<void> {
    const user = await this.userRepository.findOneOrFail({
      where: { email: userEmail },
    });
    await this.recipeRepository.save({ ...recipeDto, user });
  }

  async updateDescription(
    id: string,
    description: string,
    email: string,
  ): Promise<void> {
    const recipe = await this.recipeRepository.findOneOrFail({
      where: { id },
      relations: ['user'],
    });

    if (recipe.user.email !== email) {
      throw new HttpException(
        "You cannot update recipe. It's  not yours!",
        400,
      );
    }

    await this.recipeRepository.update({ id }, { description });
  }

  async deleteRecipe(id: string): Promise<void> {
    await this.recipeRepository.delete({ id });
  }

  async addFileTorecipe(file: Express.Multer.File, id: string, email: string) {
    const recipe = await this.recipeRepository.findOneOrFail({
      where: { id },
      relations: ['user'],
    });

    if (recipe.user.email !== email) {
      throw new HttpException(
        "You cannot update recipe. It's  not yours!",
        400,
      );
    }
    const bucketKey = `${file.fieldname}${Date.now()}`;
    const fileUrl = await this.s3Service.uploadFile(file, bucketKey);

    await this.recipeRepository.update({ id }, { image: fileUrl });
  }
}
