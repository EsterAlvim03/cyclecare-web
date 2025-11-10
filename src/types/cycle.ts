export type TMood =
  | 'ANGRY'
  | 'ANXIOUS'
  | 'SAD'
  | 'TEARFUL'
  | 'STRESSED'
  | 'TIRED'
  | 'SENSITIVE'
  | 'NORMAL'
  | 'CALM'
  | 'HAPPY';

export type TCycle = {
  id: string;
  mood: TMood;
  startDate: Date;
  endDate: Date;
};
