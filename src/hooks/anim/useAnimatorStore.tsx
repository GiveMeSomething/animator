import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface AnimatorStore {
  state: Record<string, boolean>;

  setState: (key: string, value: boolean) => void;
}

export const useAnimatorStore = create<AnimatorStore>()(
  subscribeWithSelector((set) => ({
    state: {},
    setState: (key, value) =>
      set((state) => ({
        ...state,
        [key]: value,
      })),
  })),
);
