import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { SCHEMA_NAME } from '../datastore/constant';
import { v4 } from 'uuid';

@Entity({ schema: SCHEMA_NAME, tableName: 'conversations' })
export class Conversation {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string = v4();

  @Property({
    type: 'datetime',
    onCreate: () => new Date(),
    defaultRaw: 'now()',
  })
  createdAt?: Date = new Date();
}
