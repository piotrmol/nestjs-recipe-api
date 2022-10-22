import { Recipe } from 'src/recipe/entity/recipe';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn()
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'varchar', default: Role.USER })
  role: Role;

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipes: Recipe;
}
