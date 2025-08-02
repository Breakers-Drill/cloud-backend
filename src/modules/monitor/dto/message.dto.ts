import z from 'zod';

export const messageSchema = z.object({
  deviceId: z.string(),
  temp: z.number(),
  humidity: z.number(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  timestamp: z.string().datetime(),
});

export type T_MessageData = z.infer<typeof messageSchema>;
