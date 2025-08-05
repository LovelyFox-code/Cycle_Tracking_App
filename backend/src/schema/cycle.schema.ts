import { z } from 'zod';
import { CyclePhase } from '../models/cycle.model';

// Create a Zod enum from the CyclePhase enum
const cyclePhaseEnum = z.enum([
  CyclePhase.MENSTRUAL,
  CyclePhase.FOLLICULAR,
  CyclePhase.OVULATORY,
  CyclePhase.LUTEAL
]);

// Schema for creating a new cycle
export const createCycleSchema = z.object({
  body: z.object({
    user_id: z.string().uuid('User ID must be a valid UUID'),
    start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD'),
    current_phase: cyclePhaseEnum,
    notes: z.string().optional().nullable()
  })
});

// Schema for updating an existing cycle
export const updateCycleSchema = z.object({
  body: z.object({
    current_phase: cyclePhaseEnum.optional(),
    day_of_cycle: z.number()
      .int('Day of cycle must be an integer')
      .min(1, 'Day of cycle must be at least 1')
      .max(40, 'Day of cycle cannot be more than 40')
      .optional()
      .nullable(),
    notes: z.string().optional().nullable()
  }),
  params: z.object({
    id: z.string().uuid('Invalid cycle ID format')
  })
});

// Types derived from the schemas
export type CreateCycleInput = z.infer<typeof createCycleSchema>['body'];
export type UpdateCycleInput = z.infer<typeof updateCycleSchema>['body'];