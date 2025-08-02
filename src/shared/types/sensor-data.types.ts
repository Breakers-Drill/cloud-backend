export enum EDateInterval {
  'hour' = 1,
  '2hour' = 2,
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
