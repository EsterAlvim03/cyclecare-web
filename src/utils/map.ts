import { TMood } from '@/types/cycle';

export const moodEmojiMap: Record<TMood, string> = {
  ANGRY: '😠',
  ANXIOUS: '😰',
  SAD: '😢',
  TEARFUL: '😭',
  STRESSED: '😤',
  TIRED: '😴',
  SENSITIVE: '🥺',
  NORMAL: '😐',
  CALM: '😌',
  HAPPY: '😊',
};

export const moodTextMap: Record<TMood, string> = {
  ANGRY: 'Irritada',
  ANXIOUS: 'Ansiosa',
  SAD: 'Triste',
  TEARFUL: 'Chorosa',
  STRESSED: 'Estressada',
  TIRED: 'Cansada',
  SENSITIVE: 'Sensível',
  NORMAL: 'Normal',
  CALM: 'Calma',
  HAPPY: 'Feliz',
};
