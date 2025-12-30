import {
  AnyEntity,
  EntityManager,
  EntityRepository,
} from '@mikro-orm/postgresql';

export class BaseEntityRepository<
  T extends object,
> extends EntityRepository<T> {
  persist(entity: AnyEntity | AnyEntity[]): EntityManager {
    return this.em.persist(entity);
  }

  remove(entity: AnyEntity): EntityManager {
    return this.em.remove(entity);
  }

  async flush(): Promise<void> {
    return this.em.flush();
  }
}
