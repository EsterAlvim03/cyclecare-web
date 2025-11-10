/* eslint-disable no-unused-vars */
import { create } from 'zustand';

type Store = {
  cycleId: string;
  showModal: boolean;
  openModal: (cycleId?: string) => void;
  closeModal: () => void;
};

export const useCycleModal = create<Store>(set => ({
  cycleId: '',
  showModal: false,
  openModal: (cycleId?: string) => set({ cycleId, showModal: true }),
  closeModal: () => set({ cycleId: '', showModal: false }),
}));
