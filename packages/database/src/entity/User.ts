import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  age!: number;
}
