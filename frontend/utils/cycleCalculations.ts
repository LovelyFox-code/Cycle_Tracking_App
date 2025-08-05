import { getPhaseInfo as getPhaseInfoFromContent } from './content';
import { CyclePhase } from '@/types/content';

export const getCurrentPhase = (lastPeriodDate: string, cycleLength: number): CyclePhase => {
  const today = new Date();
  const periodStart = new Date(lastPeriodDate);

  // Calculate days since period started
  const daysSinceStart = Math.floor((today.getTime() - periodStart.getTime()) / (1000 * 60 * 60 * 24));

  // Handle negative days (future date) or very old dates
  if (daysSinceStart < 0) {
    return 'menstrual'; // Default if date is in future
  }

  // Calculate current cycle day (1-based)
  const currentCycleDay = (daysSinceStart % cycleLength) + 1;

  return getPhaseForDay(currentCycleDay, cycleLength);
};

export const getPhaseForDay = (cycleDay: number, cycleLength: number): CyclePhase => {
  if (cycleDay <= 5) {
    return 'menstrual';
  } else if (cycleDay <= Math.floor(cycleLength / 2) - 1) {
    return 'follicular';
  } else if (cycleDay === Math.floor(cycleLength / 2)) {
    return 'ovulation';
  } else {
    return 'luteal';
  }
};

export const calculateCycleDay = (lastPeriodDate: string, cycleLength: number, targetDate: Date | string): number => {
  const periodStart = new Date(lastPeriodDate);
  const target = new Date(targetDate);

  // Calculate days since period started
  const daysSinceStart = Math.floor((target.getTime() - periodStart.getTime()) / (1000 * 60 * 60 * 24));

  if (daysSinceStart < 0) {
    return -1; // Before period start
  }

  // Calculate current cycle day (1-based)
  return (daysSinceStart % cycleLength) + 1;
};

export const calculateDaysInPhase = (lastPeriodDate: string, cycleLength: number, phase: CyclePhase): number => {
  const currentCycleDay = calculateCycleDay(lastPeriodDate, cycleLength, new Date());

  if (currentCycleDay <= 0) return 1;

  switch (phase) {
    case 'menstrual':
      return currentCycleDay <= 5 ? currentCycleDay : 1;
    case 'follicular':
      return currentCycleDay > 5 && currentCycleDay <= Math.floor(cycleLength / 2) - 1
        ? currentCycleDay - 5 : 1;
    case 'ovulation':
      return currentCycleDay === Math.floor(cycleLength / 2) ? 1 : 1;
    case 'luteal':
      return currentCycleDay > Math.floor(cycleLength / 2)
        ? currentCycleDay - Math.floor(cycleLength / 2) : 1;
    default:
      return 1;
  }
};

export const getPhaseInfo = (phase: CyclePhase) => {
  return getPhaseInfoFromContent(phase);
};