import { config } from 'dotenv';
import { z } from 'zod';

config({
  path: '.env',
});

const configSchema = z.object({
  APP_NAME: z.string(),
  APP_PORT: z.coerce.number(),
  APP_CORS_ORIGIN: z.string(),

  INFRA_SECRET_KEY: z.string(),

  SENSOR_DATA_GET_LIMIT: z.coerce.number(),
  SENSOR_DATA_GET_DEFAULT_INTERVAL: z.coerce.number(),

  MQTT_BROKER_URL: z.string(),
  MQTT_CLIENT_ID: z.string(),
});

const configServer = configSchema.safeParse(process.env);

if (!configServer.success) {
  console.error('Invalid environment variables');
  console.error(configServer.error.format());
  process.exit(1);
}

const envConfig = configServer.data;

export default envConfig;
