import envConfig from '@config/env.config';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const appName = envConfig.APP_NAME;

  const config = new DocumentBuilder()
    .addSecurity('infra', {
      type: 'http',
      scheme: 'bearer',
      in: 'header',
    })
    .setTitle(appName)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: false });
  SwaggerModule.setup('/cloud/docs', app, document, {
    customSiteTitle: appName,
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: '-method',
    },
  });
}
