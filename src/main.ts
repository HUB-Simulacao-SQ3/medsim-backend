import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiResponseInterceptor } from './intercepts/ApiReponseInterceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new ApiResponseInterceptor());

	const config = new DocumentBuilder().setTitle('Medsim backend').setDescription('Medsim backend API documentation by swagger').setVersion('1.0').addBearerAuth().build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}
bootstrap();
