import { SensorData } from '@prisma/client';

type Interval = '5min' | '10min' | '30min' | '1h' | '2h';

export default class SensorDataUtils {
  public filterByTimeInterval(data: SensorData[], intervalHours: number): SensorData[] {
    if (data.length === 0) return [];

    const intervalMs = intervalHours * 60 * 60 * 1000;
    const filteredData: SensorData[] = [];
    let lastAddedTimestamp = new Date(data[0].timestamp).getTime();

    filteredData.push(data[0]);

    for (let i = 1; i < data.length; i++) {
      const currentTimestamp = new Date(data[i].timestamp).getTime();
      if (currentTimestamp - lastAddedTimestamp >= intervalMs) {
        filteredData.push(data[i]);
        lastAddedTimestamp = currentTimestamp;
      }
    }

    return filteredData;
  }

  public filterDataByInterval(data: SensorData[], interval: Interval): SensorData[] {
    if (data.length === 0) return [];

    const intervalMs = {
      '5min': 5 * 60 * 1000,
      '10min': 10 * 60 * 1000,
      '30min': 30 * 60 * 1000,
      '1h': 60 * 60 * 1000,
      '2h': 2 * 60 * 60 * 1000,
    }[interval];

    const result: SensorData[] = [data[0]]; // Всегда включаем первую запись
    let lastTimestamp = new Date(data[0].timestamp).getTime();

    for (let i = 1; i < data.length; i++) {
      const currentTimestamp = new Date(data[i].timestamp).getTime();
      if (currentTimestamp - lastTimestamp >= intervalMs) {
        result.push(data[i]);
        lastTimestamp = currentTimestamp;
      }
    }

    return result;
  }
}
