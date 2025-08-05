import { workouts } from '@/data/workouts';
import { recipes } from '@/data/recipes';
import { recoveryItems } from '@/data/recovery';
import { cycleData } from '@/data/cycle';
import { ContentBase, CyclePhase, PhaseInfo, Workout, Recipe, Recovery } from '@/types/content';

/**
 * Get content by slug from any content type
 */
export function getContentBySlug<T extends ContentBase>(
  contentType: 'workout' | 'recipe' | 'recovery',
  slug: string
): T | undefined {
  switch (contentType) {
    case 'workout':
      return workouts.find(item => item.slug === slug) as unknown as T;
    case 'recipe':
      return recipes.find(item => item.slug === slug) as unknown as T;
    case 'recovery':
      return recoveryItems.find(item => item.slug === slug) as unknown as T;
    default:
      return undefined;
  }
}

/**
 * Get all workouts with optional filtering
 */
export function getWorkouts(filters?: {
  cyclePhase?: CyclePhase;
  type?: string;
  intensity?: 'low' | 'medium' | 'high';
  isPremium?: boolean;
  category?: string;
}): Workout[] {
  if (!filters) return workouts;

  return workouts.filter(workout => {
    // Apply filters
    if (filters.cyclePhase && workout.tags?.cyclePhase !== filters.cyclePhase) return false;
    if (filters.type && workout.workoutType !== filters.type) return false;
    if (filters.intensity && workout.tags?.intensity !== filters.intensity) return false;
    if (filters.isPremium !== undefined && workout.isPremium !== filters.isPremium) return false;
    if (filters.category && workout.category !== filters.category) return false;
    
    return true;
  });
}

/**
 * Get all recipes with optional filtering
 */
export function getRecipes(filters?: {
  cyclePhase?: CyclePhase;
  diet?: 'all' | 'vegetarian' | 'vegan' | 'pescetarian';
  isPremium?: boolean;
  category?: string;
}): Recipe[] {
  if (!filters) return recipes;

  return recipes.filter(recipe => {
    // Apply filters
    if (filters.cyclePhase && recipe.tags?.cyclePhase !== filters.cyclePhase) return false;
    if (filters.diet && recipe.dietType !== filters.diet && recipe.dietType !== 'all') return false;
    if (filters.isPremium !== undefined && recipe.isPremium !== filters.isPremium) return false;
    if (filters.category && recipe.category !== filters.category) return false;
    
    return true;
  });
}

/**
 * Get all recovery items with optional filtering
 */
export function getRecoveryItems(filters?: {
  cyclePhase?: CyclePhase;
  type?: 'sleep' | 'stretching' | 'meditation';
  intensity?: 'low' | 'medium' | 'high';
  isPremium?: boolean;
  category?: string;
}): Recovery[] {
  if (!filters) return recoveryItems;

  return recoveryItems.filter(item => {
    // Apply filters
    if (filters.cyclePhase && item.tags?.cyclePhase !== filters.cyclePhase) return false;
    if (filters.type && item.recoveryType !== filters.type) return false;
    if (filters.intensity && item.tags?.intensity !== filters.intensity) return false;
    if (filters.isPremium !== undefined && item.isPremium !== filters.isPremium) return false;
    if (filters.category && item.category !== filters.category) return false;
    
    return true;
  });
}

/**
 * Get content recommendations based on cycle phase
 */
export function getPhaseRecommendations(phase: CyclePhase) {
  return {
    workouts: getWorkouts({ cyclePhase: phase }),
    recipes: getRecipes({ cyclePhase: phase }),
    recovery: getRecoveryItems({ cyclePhase: phase }),
    phaseInfo: getPhaseInfo(phase),
  };
}

/**
 * Get phase info by phase name
 */
export function getPhaseInfo(phase: CyclePhase): PhaseInfo {
  return cycleData.phases[phase] || cycleData.phases.menstrual;
}

/**
 * Get content by tag
 */
export function getContentByTag<T extends ContentBase>(
  contentType: 'workout' | 'recipe' | 'recovery',
  tagName: string,
  tagValue: string
): T[] {
  let contentArray: ContentBase[];
  
  switch (contentType) {
    case 'workout':
      contentArray = workouts;
      break;
    case 'recipe':
      contentArray = recipes;
      break;
    case 'recovery':
      contentArray = recoveryItems;
      break;
    default:
      return [];
  }

  return contentArray.filter(item => {
    if (!item.tags) return false;
    return item.tags[tagName as keyof typeof item.tags] === tagValue;
  }) as T[];
}

/**
 * Get premium content
 */
export function getPremiumContent() {
  return {
    workouts: workouts.filter(item => item.isPremium),
    recipes: recipes.filter(item => item.isPremium),
    recovery: recoveryItems.filter(item => item.isPremium),
  };
}

/**
 * Get featured content (could be based on any criteria)
 */
export function getFeaturedContent() {
  // Example: get one item from each category
  return {
    workout: workouts.find(item => item.slug === 'morning-energizer'),
    recipe: recipes.find(item => item.slug === 'hormone-balancing-breakfast'),
    recovery: recoveryItems.find(item => item.slug === 'deep-breathing'),
  };
}