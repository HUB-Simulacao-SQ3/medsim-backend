import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiResponseInterceptor } from './intercepts/apiResponseInterceptor';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new ApiResponseInterceptor());
	app.use(bodyParser.json({ limit: '50mb' }));
	app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

	const config = new DocumentBuilder().setTitle('Medsim backend').setDescription('Medsim backend API documentation by swagger').setVersion('1.0').addBearerAuth().build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/', app, document);

	await app.listen(3000);
}
bootstrap();
