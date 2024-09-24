import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

/**
 * Animator will handle the following
 * 1. Store the current state(s) of the animator.
 *    There will be some animations that depend on multiple states as trigger
 * 2. Transition between animation
 */

export interface AnimationState {
  state: string;

  prefixDelay: number;
  postfixDelay: number;

  duration: number;
}

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
