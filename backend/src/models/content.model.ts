// Base interface for all content types
export interface ContentBase {
  id: string
  title: string
  description: string
  phase_tags: string[]
  is_premium: boolean
}

// Workout content
export interface Workout extends ContentBase {
  type: string // 'yoga', 'cardio', etc.
  image_url: string | null
}

// Recipe content
export interface Recipe extends ContentBase {
  dietary_tags: string[] // 'vegan', 'gluten_free', etc.
  image_url: string | null
}

// Recovery content
export interface Recovery extends ContentBase {
  video_url: string | null
}

// Enums for content types
export enum WorkoutType {
  YOGA = 'yoga',
  CARDIO = 'cardio',
  STRENGTH = 'strength',
  HIIT = 'hiit',
  PILATES = 'pilates',
  STRETCHING = 'stretching'
}

export enum DietaryTag {
  VEGAN = 'vegan',
  VEGETARIAN = 'vegetarian',
  GLUTEN_FREE = 'gluten_free',
  DAIRY_FREE = 'dairy_free',
  KETO = 'keto',
  PALEO = 'paleo',
  LOW_CARB = 'low_carb',
  HIGH_PROTEIN = 'high_protein'
}