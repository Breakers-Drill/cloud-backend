import { SensorData } from '@prisma/client';

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
}
