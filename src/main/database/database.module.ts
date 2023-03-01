import mongoose from 'mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigProperties } from '@/main/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigProperties],
      useFactory: async (configProperties: ConfigProperties) => {
        const { dbName, debugQueries, url: uri } = configProperties.dbConfig;
        mongoose.set('debug', debugQueries);
        return {
          dbName,
          uri,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
