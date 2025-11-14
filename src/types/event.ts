export type TEventDate = {
  dateTime: Date;
};

export type TEvent = {
  id: string;
  summary: string;
  description: string;
  status: string;
  htmlLink: string;
  start: TEventDate;
  end: TEventDate;
};

export type TEventRequest = {
  summary: string;
  description?: string;
  startDateTime: Date;
  endDateTime: Date;
};
