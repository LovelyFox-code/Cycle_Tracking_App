// Common types for content
export type ContentBase = {
  slug: string;
  title: string;
  description: string;
  points: number;
  isPremium: boolean;
  category: 'general' | 'mindset' | 'business';
  heroImage?: string;
  videoUrl?: string;
  duration?: string;
  tags?: {
    cyclePhase?: CyclePhase;
    type?: string;
    intensity?: 'low' | 'medium' | 'high';
    diet?: 'all' | 'vegetarian' | 'vegan' | 'pescetarian';
  };
};

// Cycle phases
export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';

// Phase info
export interface PhaseInfo {
  name: string;
  description: string;
  message: string;
  workout: string;
  nutrition: string;
  recovery: string;
}

// Workout content
export interface Workout extends ContentBase {
  workoutType: 'weights' | 'yoga' | 'pilates' | 'phase_based';
  calories?: number;
}

// Recipe content
export interface Recipe extends ContentBase {
  dietType: 'all' | 'vegetarian' | 'vegan' | 'pescetarian';
  ingredients: string[];
  instructions: string[];
  calories?: number;
  prepTime: string;
}

// Recovery content
export interface Recovery extends ContentBase {
  recoveryType: 'sleep' | 'stretching' | 'meditation';
}

// Cycle data
export interface CycleData {
  phases: Record<CyclePhase, PhaseInfo>;
}

// User data
export interface UserData {
  name: string;
  lastPeriodDate: string;
  cycleLength: number;
  periodLength: number;
  goals?: string[];
  completedTasks?: Record<string, string[]>;
  totalPoints?: number;
}