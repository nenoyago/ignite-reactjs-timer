import { Cycle, CyclesAction } from './reducer';

export enum CycleActionTypes {
  addNewCycle = 'addNewCycle',
  markCurrentCycleAsFinished = 'markCurrentCycleAsFinished',
  interruptCurrentCycle = 'interruptCurrentCycle',
}

export function addNewCycleAction(newCycle: Cycle): CyclesAction {
  return {
    type: CycleActionTypes.addNewCycle,
    payload: {
      data: newCycle,
    },
  };
}

export function markCurrentCycleAsFinishedAction(): CyclesAction {
  return {
    type: CycleActionTypes.markCurrentCycleAsFinished,
  };
}

export function interruptCurrentCycleAction(): CyclesAction {
  return {
    type: CycleActionTypes.interruptCurrentCycle,
  };
}
