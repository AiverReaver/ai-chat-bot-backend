import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { repositories } from './repositories';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { entities } from './entities';
import dbConfig from './datastore/mikro-orm.config';

@Module({
  providers: [...repositories],
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: async () => {
        return dbConfig;
      }
    }),
    MikroOrmModule.forFeature([...entities]),
  ],
  exports: [...repositories],
})
export class DatabaseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}
