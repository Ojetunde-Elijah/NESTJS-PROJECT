import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe} from "@nestjs/common";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(Logger)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
