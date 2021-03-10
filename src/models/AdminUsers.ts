import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from "typeorm";
import { Expose, Exclude } from "class-transformer";

@Entity("admin_users")
export default class AdminUsers {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  image: string;

  @Expose({ name: "url_image" })
  getUrlImage(): string | null {
    return this.image ? `http://localhost:3333/files/${this.image}` : null;
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
