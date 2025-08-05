export interface Cycle {
  id: string
  user_id: string
  start_date: string // ISO date format
  current_phase: string
  day_of_cycle: number | null
  notes: string | null
  created_at: string
}

// Enum for cycle phases
export enum CyclePhase {
  MENSTRUAL = 'menstrual',
  FOLLICULAR = 'follicular',
  OVULATORY = 'ovulatory',
  LUTEAL = 'luteal'
}