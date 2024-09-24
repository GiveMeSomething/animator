import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

/**
 * Animator will handle the following
 * 1. Store the current state(s) of the animator.
 *    There will be some animations that depend on multiple states as trigger
 * 2. Transition between animation
 */

export interface AnimationState<T> {
  state: T;

  prefixDelay: number;
  postfixDelay: number;

  duration: number;
}

interface AnimatorStore<T extends string> {
  state: Record<T, boolean>;

  stateMap: Map<T, AnimationState<T>>;

  // Store initState for future reset
  init: (possibleStates: Array<AnimationState<T>>) => void;

  setState: (key: T, value: boolean) => void;

  reset: () => void;
}

export const useAnimatorStore = <T extends string>() =>
  create<AnimatorStore<T>>()(
    subscribeWithSelector((set) => ({
      state: {} as Record<T, boolean>,
      stateMap: new Map<T, AnimationState<T>>(),

      init: (possibleStates) => {
        const stateMap = new Map<T, AnimationState<T>>();
        const animatorState = {} as Record<T, boolean>;

        for (const state of possibleStates) {
          stateMap.set(state.state, state);
          animatorState[state.state] = false;
        }

        set(() => ({
          state: animatorState,
          stateMap,
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
