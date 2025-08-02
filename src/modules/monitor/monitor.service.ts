import envConfig from '@config/env.config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import mqtt, { MqttClient } from 'mqtt';
import { SensorDataService } from '../sensor-data/sensor-data.service';
import MonitorUtils from './utils';

@Injectable()
export class MonitorService implements OnModuleInit {
  url: string;
  clientId: string;
  client: MqttClient;

  constructor(private readonly sensorDataService: SensorDataService) {}

  onModuleInit() {
    this.url = envConfig.MQTT_BROKER_URL;
    this.clientId = envConfig.MQTT_CLIENT_ID;
    this.client = mqtt.connect(this.url, {
      clientId: this.clientId,
    });
    this.client.on('connect', () => this.onConnect());
    this.client.subscribe('PLC/test');
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.client.on('message', async (_, message) => await this.onMessage(message.toString()));
  }

  onConnect() {
    console.log('🔍 MQTT Monitor starting...');
    console.log(`📡 Connecting to MQTT broker: ${this.url}`);
    console.log(`📋 Topic: ${this.clientId}`);
  }

  async onMessage(message: string) {
    const edgeId = 1;
    const data = MonitorUtils.tryParseMessage(message);
    if (!data) {
      return console.log(`Ошибка получения данных с сообщения: `, message);
    }
    const payload: Prisma.SensorDataCreateInput[] = [];
    Object.entries(data).forEach(([tag, value]) => {
      payload.push({ edgeId, tag, value });
    });
    await this.sensorDataService.createMany(payload);
  }
}
