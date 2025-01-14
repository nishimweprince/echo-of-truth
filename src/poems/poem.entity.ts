import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../entities';
import { UUID } from '../types';
import { PoemStatus } from './peom.constants';

@Entity('poems')
export class Poem extends AbstractEntity {
  @Column({
    type: 'text',
    nullable: false,
  })
  text: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  messageId: UUID;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  wallet?: string;

  @Column({
    type: 'enum',
    enum: PoemStatus,
    nullable: false,
    default: PoemStatus.SUBMITTED,
  })
  status: PoemStatus;
}
