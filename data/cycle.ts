import { CycleData, PhaseInfo } from '@/types/content';

export const cycleData: CycleData = {
  phases: {
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
  }
};