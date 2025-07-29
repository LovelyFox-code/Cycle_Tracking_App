export const getCurrentPhase = (lastPeriodDate, cycleLength) => {
  const today = new Date();
  const periodStart = new Date(lastPeriodDate);
  
  // Calculate days since period started
  const daysSinceStart = Math.floor((today - periodStart) / (1000 * 60 * 60 * 24));
  
  // Handle negative days (future date) or very old dates
  if (daysSinceStart < 0) {
    return 'menstrual'; // Default if date is in future
  }
  
  // Calculate current cycle day (1-based)
  const currentCycleDay = (daysSinceStart % cycleLength) + 1;
  
  return getPhaseForDay(currentCycleDay, cycleLength);
};

export const getPhaseForDay = (cycleDay, cycleLength) => {
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

export const calculateCycleDay = (lastPeriodDate, cycleLength, targetDate) => {
  const periodStart = new Date(lastPeriodDate);
  const target = new Date(targetDate);
  
  // Calculate days since period started
  const daysSinceStart = Math.floor((target - periodStart) / (1000 * 60 * 60 * 24));
  
  if (daysSinceStart < 0) {
    return -1; // Before period start
  }
  
  // Calculate current cycle day (1-based)
  return (daysSinceStart % cycleLength) + 1;
};

export const calculateDaysInPhase = (lastPeriodDate, cycleLength, phase) => {
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

export const getPhaseInfo = (phase) => {
  const phaseData = {
    menstrual: {
      name: 'Menstrual',
      description: 'Time for rest and reflection',
      message: 'Your body is shedding and renewing. Focus on gentle movement, warm foods, and self-care.',
      workout: 'Gentle yoga, stretching, or light walking. Listen to your body and rest when needed.',
      nutrition: 'Warm, nourishing foods rich in iron. Try bone broth, leafy greens, and herbal teas.',
      recovery: 'Prioritize sleep, use heat therapy, and practice mindfulness or meditation.',
    },
    follicular: {
      name: 'Follicular',
      description: 'Energy is building',
      message: 'Rising estrogen brings renewed energy and motivation. Perfect time to start new projects!',
      workout: 'Moderate to high-intensity workouts. Try strength training, running, or dance classes.',
      nutrition: 'Fresh, light foods with plenty of vegetables. Focus on lean proteins and complex carbs.',
      recovery: 'Maintain good sleep habits and stay hydrated. Light stretching after workouts.',
    },
    ovulation: {
      name: 'Ovulation',
      description: 'Peak energy and confidence',
      message: 'You\'re at your peak! High estrogen and testosterone boost energy, mood, and performance.',
      workout: 'High-intensity workouts, challenging strength training, or competitive sports.',
      nutrition: 'Protein-rich foods to support muscle recovery. Include healthy fats and antioxidants.',
      recovery: 'Active recovery with yoga or swimming. Stay well-hydrated and get quality sleep.',
    },
    luteal: {
      name: 'Luteal',
      description: 'Preparing for renewal',
      message: 'Progesterone rises, energy may dip. Focus on steady activities and mood support.',
      workout: 'Moderate workouts like pilates, steady-state cardio, or power walking.',
      nutrition: 'Anti-inflammatory foods, complex carbs for mood stability. Dark chocolate is okay!',
      recovery: 'Stress management is key. Try meditation, journaling, or warm baths.',
    },
  };

  return phaseData[phase] || phaseData.menstrual;
};