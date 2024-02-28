import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

type TDate = string | number | Date;

export const createDate = (date: TDate) => {
  if (typeof date === 'number' && String(Math.ceil(date)).length === 9) {
    return dayjs.unix(date);
  }
  return dayjs(date);
};

export const formatDate = (date: TDate, format: string) => {
  return createDate(date).format(format);
};
