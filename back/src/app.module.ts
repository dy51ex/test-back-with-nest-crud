import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        port: +configService.get('MYSQL_PORT'),
        logging: Boolean(configService.get('MYSQL_LOGGING')),
        host: configService.get('MYSQL_HOST'),
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [User, Product],
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ProductsModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
