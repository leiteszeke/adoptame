import * as DateFNS from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDistance = (date: Date, baseDate: Date, options?: any) => {
  return DateFNS.formatDistance(date, baseDate, { ...options, locale: es });
};

export const formatDistanceStrict = (
  date: Date,
  baseDate: Date,
  options?: any,
) => {
  return DateFNS.formatDistanceStrict(date, baseDate, {
    ...options,
    locale: es,
  });
};

export const format = (date: Date, formatStr: string) => {
  return DateFNS.format(date, formatStr, { locale: es });
};
