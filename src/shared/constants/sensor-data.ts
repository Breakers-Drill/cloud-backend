import { T_TagsMapData, T_TagsMapTypes } from '@shared/types/sensor-data.types';

export const VALID_TYPES: T_TagsMapTypes[] = ['bool', 'об/мин', 'бар', '°C', 'л/с', 'мм/с', 'Н·м', 'град', 'л', '%'];

export const TAGS_MAP = new Map<string, T_TagsMapData>([
  [
    'DC_out_100ms[144]',
    {
      name: 'Сигнал включения гидравлического насоса',
      type: 'bool',
      valueRange: {
        min: 0,
        max: 1,
      },
    },
  ],
  [
    'DC_out_100ms[146]',
    {
      name: 'Сигнал включения системы подачи бурового раствора',
      type: 'bool',
      valueRange: {
        min: 0,
        max: 1,
      },
    },
  ],
  [
    'DC_out_100ms[148]',
    {
      name: 'Скорость вращения ротора',
      type: 'об/мин',
      valueRange: {
        min: 10,
        max: 50,
      },
    },
  ],
  [
    'DC_out_100ms[164]',
    {
      name: 'Давление в гидросистеме',
      type: 'бар',
      valueRange: {
        min: 20,
        max: 80,
      },
    },
  ],
  [
    'DC_out_100ms[165]',
    {
      name: 'Температура масла в гидросистеме',
      type: '°C',
      valueRange: {
        min: 5,
        max: 25,
      },
    },
  ],
  [
    'DC_out_100ms[140].8',
    {
      name: 'Уровень бурового раствора в баке',
      type: '%',
      valueRange: {
        min: 0,
        max: 100,
      },
    },
  ],
  [
    'DC_out_100ms[140].10',
    {
      name: 'Расход раствора через насос',
      type: 'л/с',
      valueRange: {
        min: 0,
        max: 5,
      },
    },
  ],
  [
    'DC_out_100ms[140].9',
    {
      name: 'Скорость подачи трубы',
      type: 'мм/с',
      valueRange: {
        min: 50,
        max: 150,
      },
    },
  ],
  [
    'DC_out_100ms[141].10',
    {
      name: 'Момент на роторе',
      type: 'Н·м',
      valueRange: {
        min: 100,
        max: 200,
      },
    },
  ],
  [
    'DC_out_100ms[141].8',
    {
      name: 'Сигнал активации аварийной остановки',
      type: 'bool',
      valueRange: {
        min: 0,
        max: 1,
      },
    },
  ],
  [
    'DC_out_100ms[141].9',
    {
      name: 'Давление на выходе насоса',
      type: 'бар',
      valueRange: {
        min: 15,
        max: 75,
      },
    },
  ],
  [
    'DC_out_100ms[140].13',
    {
      name: 'Отклонение по вертикали',
      type: 'град',
      valueRange: {
        min: 0,
        max: 10,
      },
    },
  ],
  [
    'DC_out_100ms[140].14',
    {
      name: 'Объём поданного раствора',
      type: 'л',
      valueRange: {
        min: 0,
        max: 500,
      },
    },
  ],
  [
    'DC_out_100ms[141].13',
    {
      name: 'Скорость перемещения каретки',
      type: 'мм/с',
      valueRange: {
        min: 5,
        max: 50,
      },
    },
  ],
]);
