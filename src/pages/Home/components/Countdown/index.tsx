import { useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';
import { useCyclesContext } from '../../../../contexts/CyclesContext';
import { CountdownContainer, Separator } from './styles';

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    persistAmountSecondsPassed,
    markCurrentCycleAsFinished,
  } = useCyclesContext();

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = Math.floor(currentSeconds % 60);

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    let interval: number;
    if (activeCycle && differenceInSeconds) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
          persistAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          persistAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeCycle, activeCycleId, totalSeconds, markCurrentCycleAsFinished]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `Ignite Timer - ${minutes}:${seconds}`;
    } else {
      document.title = 'Ignite Timer';
    }
  }, [activeCycle, minutes, seconds]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
