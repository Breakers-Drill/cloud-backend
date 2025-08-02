export default class MonitorUtils {
  public static tryParseMessage(message: string): Record<string, number> | null {
    try {
      const jsonData: Record<string, number> = JSON.parse(message).payload;
      return jsonData;
    } catch {
      return null;
    }
  }
}
