import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/chatapp") , UserModule ,RoomModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

