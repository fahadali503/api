import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypegooseModule } from 'nestjs-typegoose';
import { CustomerModule } from './customer/customer.module';
import { SellerModule } from './seller/seller.module';
import { AdminModule } from './admin/admin.module';
import { SuperAdminModule } from './super-admin/super-admin.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      context: ({ req }) => ({ req })
    }),
    TypegooseModule.forRoot('mongodb://localhost:27017/ubinzo'),
    UserModule,
    AuthModule,
    CustomerModule,
    SellerModule,
    AdminModule,
    SuperAdminModule,
  ],
})
export class AppModule { }
