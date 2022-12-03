import { produce } from 'immer';
import { CycleActionTypes } from './actions';

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export type CyclesAction =
  | { type: CycleActionTypes.addNewCycle; payload: { data: Cycle } }
  | {
      type: CycleActionTypes.markCurrentCycleAsFinished;
      payload?: { id: string };
    }
  | { type: CycleActionTypes.interruptCurrentCycle; payload?: { id: string } };

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export const initialCycleState: CyclesState = {
  activeCycleId: null,
  cycles: [],
};

export function cyclesReducer(state: CyclesState, action: CyclesAction) {
  switch (action.type) {
    case CycleActionTypes.addNewCycle:
      return produce(state, draft => {
        draft.cycles.push(action.payload.data);
        draft.activeCycleId = action.payload.data.id;
      });
    case CycleActionTypes.markCurrentCycleAsFinished: {
      const currentCycleIndex = state.cycles.findIndex(
        cycle => cycle.id === state.activeCycleId
      );
      if (currentCycleIndex < 0) {
        return state;
      }
      return produce(state, draft => {
        draft.cycles[currentCycleIndex].finishedDate = new Date();
        draft.activeCycleId = null;
      });
    }
    case CycleActionTypes.interruptCurrentCycle: {
      const currentCycleIndex = state.cycles.findIndex(
        cycle => cycle.id === state.activeCycleId
      );
      if (currentCycleIndex < 0) {
        return state;
      }
      return produce(state, draft => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date();
        draft.activeCycleId = null;
      });
    }
    default:
      return state;
  }
}
