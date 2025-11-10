import { addDays, format, parse } from 'date-fns';

export const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const normalize = (value: string) => {
  return value.replace(/\D/g, '');
};

export const formatDateToEnglish = (dateString: string) => {
  const date = parse(dateString, 'dd/MM/yyyy', new Date());

  return format(date, 'yyyy-MM-dd');
};

export const formatDateToDisplay = (date: Date) => {
  return format(addDays(date, 1), 'dd/MM/yyyy');
};

export const formatDateToInput = (date: Date) => {
  return format(date, 'dd/MM/yyyy HH:mm');
};

export const formatDateToApi = (dateString: string) => {
  const date = parse(dateString, 'dd/MM/yyyy HH:mm', new Date());

  return format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
};
