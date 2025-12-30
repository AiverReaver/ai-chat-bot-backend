import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './services/chat.service';
import { ConfigModule } from '@nestjs/config';
import { OpenAiService } from './services/openai.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, OpenAiService],
})
export class AppModule {}
