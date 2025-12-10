import { isValid, parse } from 'date-fns';

export const validateDate = (
  date: string,
  minimumYear?: number,
  maximumYear?: number,
): boolean => {
  if (!date) {
    return true;
  }

  if (!date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
    return false;
  }

  const parsedDate = parse(date, 'dd/MM/yyyy', new Date());

  if (!isValid(parsedDate)) {
    return false;
  }

  const maxYear = maximumYear || new Date().getFullYear() + 200;
  const minYear = minimumYear || new Date().getFullYear() - 200;

  const year = parsedDate.getFullYear();

  if (year <= minYear) {
    return false;
  }

  if (year >= maxYear) {
    return false;
  }

  return true;
};

export const validateTime = (time: string): boolean => {
  if (!time) {
    return true;
  }

  if (!time.match(/^\d{2}:\d{2}$/)) {
    return false;
  }

  const [hours, minutes] = time.split(':').map(Number);

  if (hours < 0 || hours > 23) {
    return false;
  }

  if (minutes < 0 || minutes > 59) {
    return false;
  }

  return true;
};

export const validateDateTime = (dateTime: string): boolean => {
  if (!dateTime) {
    return false;
  }

  if (!dateTime.match(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/)) {
    return false;
  }

  const [date, time] = dateTime.split(' ');

  return validateDate(date) && validateTime(time);
};

export const validatePhone = (phone?: string) => {
  if (!phone) {
    return false;
  }

  phone = phone.replace(/\D/g, '');
  if (phone.length < 10 || phone.length > 11) {
    return false;
  }

  const ddd = phone.substring(0, 2);
  if (ddd < '11' || ddd > '99') {
    return false;
  }

  const repeatedDigits = phone.split('').every(digit => digit === phone[0]);
  if (repeatedDigits) {
    return false;
  }

  if (phone.length === 11) {
    return phone[2] === '9';
  }

  return true;
};
