import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

/**
 * Animator will handle the following
 * 1. Store the current state(s) of the animator.
 *    There will be some animations that depend on multiple states as trigger
 * 2. Transition between animation
 */

interface AnimatorStore<T extends string> {
  state: Record<T, boolean>;

  // Store initState for future reset
  init: (possibleStates: Array<T>) => void;

  // Force the animator to a specific state
  setState: (key: T, value: boolean) => void;

  reset: () => void;
}

export const useAnimatorStore = <T extends string>() =>
  create<AnimatorStore<T>>()(
    subscribeWithSelector((set) => ({
      state: {} as Record<T, boolean>,

      init: (possibleStates) => {
        const animatorState = {} as Record<T, boolean>;
        for (const state of possibleStates) {
          animatorState[state] = false;
        }

        set(() => ({
          state: animatorState,
        }));
      },

      setState: (key, value) => {
        set((state) => ({
          ...state,
          [key]: value,
        }));
      },

      reset: () => {
        set((state) => {
          for (const key in state.state) {
            state.state[key] = false;
          }
          return {
            state: { ...state.state },
          };
        });
      },
    })),
  )();
