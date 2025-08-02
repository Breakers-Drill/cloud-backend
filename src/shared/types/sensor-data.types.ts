export enum EDateInterval {
  '5min' = 5 * 60 * 1000,
  '10min' = 10 * 60 * 1000,
  '30min' = 30 * 60 * 1000,
  '1h' = 60 * 60 * 1000,
  '2h' = 2 * 60 * 60 * 1000,
}

export type T_TagsMapTypes = 'bool' | 'об/мин' | 'бар' | '°C' | 'л/с' | 'мм/с' | 'Н·м' | 'град' | 'л' | '%';

export type T_TagsMapData = {
  name: string;
  type: T_TagsMapTypes;
  valueRange: T_TagsMapValueRange;
};

type T_TagsMapValueRange = {
  min: number;
  max: number;
};
