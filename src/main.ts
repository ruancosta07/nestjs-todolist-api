import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle("Documentação API todolist").setDescription("Documentação de uma api simples de gerenciamento de tarefas com NestJS").setVersion("1.0").addServer("http://localhost:3000").addBearerAuth().build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, documentFactory)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
