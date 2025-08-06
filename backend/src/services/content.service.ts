import supabase from '../db/supabase'
import { Workout, Recipe, Recovery } from '../models/content.model'

class ContentService {
  /**
   * Get all workouts
   */
  async getAllWorkouts(): Promise<Workout[]> {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error in ContentService.getAllWorkouts:', error)
      throw error
    }
  }

  /**
   * Get workouts by phase
   */
  async getWorkoutsByPhase(phase: string): Promise<Workout[]> {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .contains('tags', { cyclePhase: phase })

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error(`Error in ContentService.getWorkoutsByPhase(${phase}):`, error)
      throw error
    }
  }

  /**
   * Get workout by ID
   */
  async getWorkoutById(id: string): Promise<Workout | null> {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error(`Error in ContentService.getWorkoutById(${id}):`, error)
      throw error
    }
  }

  /**
   * Get all recipes
   */
  async getAllRecipes(): Promise<Recipe[]> {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error in ContentService.getAllRecipes:', error)
      throw error
    }
  }

  /**
   * Get recipes by phase
   */
  async getRecipesByPhase(phase: string): Promise<Recipe[]> {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .contains('tags', { cyclePhase: phase })

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error(`Error in ContentService.getRecipesByPhase(${phase}):`, error)
      throw error
    }
  }

  /**
   * Get recipes by dietary preference
   */
  async getRecipesByDietaryPreference(dietary: string): Promise<Recipe[]> {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .contains('tags', { diet: dietary })

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error(`Error in ContentService.getRecipesByDietaryPreference(${dietary}):`, error)
      throw error
    }
  }

  /**
   * Get recipe by ID
   */
  async getRecipeById(id: string): Promise<Recipe | null> {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error(`Error in ContentService.getRecipeById(${id}):`, error)
      throw error
    }
  }

  /**
   * Get all recovery practices
   */
  async getAllRecovery(): Promise<Recovery[]> {
    try {
      const { data, error } = await supabase
        .from('recovery_items')
        .select('*')

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error in ContentService.getAllRecovery:', error)
      throw error
    }
  }

  /**
   * Get recovery practices by phase
   */
  async getRecoveryByPhase(phase: string): Promise<Recovery[]> {
    try {
      const { data, error } = await supabase
        .from('recovery_items')
        .select('*')
        .contains('tags', { cyclePhase: phase })

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error(`Error in ContentService.getRecoveryByPhase(${phase}):`, error)
      throw error
    }
  }

  /**
   * Get recovery practice by ID
   */
  async getRecoveryById(id: string): Promise<Recovery | null> {
    try {
      const { data, error } = await supabase
        .from('recovery_items')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error(`Error in ContentService.getRecoveryById(${id}):`, error)
      throw error
    }
  }

  /**
   * Get personalized content recommendations based on cycle phase and preferences
   */
  async getPersonalizedContent(phase: string, dietaryPreference?: string): Promise<{
    workouts: Workout[],
    recipes: Recipe[],
    recovery: Recovery[]
  }> {
    try {
      // Get content for the current phase
      const [workouts, recipes, recovery] = await Promise.all([
        this.getWorkoutsByPhase(phase),
        dietaryPreference
          ? this.getRecipesByDietaryPreference(dietaryPreference).then(recipes =>
            recipes.filter(recipe => recipe.tags?.cyclePhase === phase)
          )
          : this.getRecipesByPhase(phase),
        this.getRecoveryByPhase(phase)
      ])

      return {
        workouts: workouts.slice(0, 5), // Limit to 5 items each
        recipes: recipes.slice(0, 5),
        recovery: recovery.slice(0, 5)
      }
    } catch (error) {
      console.error(`Error in ContentService.getPersonalizedContent(${phase}):`, error)
      throw error
    }
  }
}

export default new ContentService()