import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: 'localhost',
  port: 3306,
  username: '',
  password: '',
  database: '',
  entities: [__dirname + '../**/*.entity.{js,ts}'],
  synchronize: false,
  logging: true,
};
