import { z } from 'zod';
import { CyclePhase } from '../models/cycle.model';
import { WorkoutType, DietaryTag } from '../models/content.model';

// Create Zod enums from the model enums
const cyclePhaseEnum = z.enum([
  CyclePhase.MENSTRUAL,
  CyclePhase.FOLLICULAR,
  CyclePhase.OVULATORY,
  CyclePhase.LUTEAL
]);

const workoutTypeEnum = z.enum([
  WorkoutType.YOGA,
  WorkoutType.CARDIO,
  WorkoutType.STRENGTH,
  WorkoutType.HIIT,
  WorkoutType.PILATES,
  WorkoutType.STRETCHING
]);

const dietaryTagEnum = z.enum([
  DietaryTag.VEGAN,
  DietaryTag.VEGETARIAN,
  DietaryTag.GLUTEN_FREE,
  DietaryTag.DAIRY_FREE,
  DietaryTag.KETO,
  DietaryTag.PALEO,
  DietaryTag.LOW_CARB,
  DietaryTag.HIGH_PROTEIN
]);

// Schema for content ID parameter
const contentIdParam = z.object({
  id: z.string().uuid('Invalid content ID format')
});

// Schema for phase parameter
const phaseParam = z.object({
  phase: cyclePhaseEnum
});

// Schema for dietary parameter
const dietaryParam = z.object({
  dietary: dietaryTagEnum
});

// Export schemas for route validation
export const getContentByIdSchema = z.object({
  params: contentIdParam
});

export const getContentByPhaseSchema = z.object({
  params: phaseParam
});

export const getRecipesByDietarySchema = z.object({
  params: dietaryParam
});

// Types derived from the schemas
export type ContentIdParam = z.infer<typeof getContentByIdSchema>['params'];
export type PhaseParam = z.infer<typeof getContentByPhaseSchema>['params'];
export type DietaryParam = z.infer<typeof getRecipesByDietarySchema>['params'];