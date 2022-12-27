import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({
    comment: 'アカウントID',
  })
  readonly id: number;

  @Column('varchar', { comment: 'アカウント名' })
  name: string;

  @Column('varchar', { comment: 'Email' })
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
