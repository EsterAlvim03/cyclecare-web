/* eslint-disable no-unused-vars */
import { create } from 'zustand';

type Store = {
  eventId: string;
  showModal: boolean;
  openModal: (eventId?: string) => void;
  closeModal: () => void;
};

export const useEventModal = create<Store>(set => ({
  eventId: '',
  showModal: false,
  openModal: (eventId?: string) => set({ eventId, showModal: true }),
  closeModal: () => set({ eventId: '', showModal: false }),
}));
