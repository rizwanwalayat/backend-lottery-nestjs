import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // handle all user input validation globally
  app.useGlobalPipes(new ValidateInputPipe());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
