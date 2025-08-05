import { Request, Response } from 'express'
import contentService from '../services/content.service'

// Get all workouts
export const getAllWorkoutsHandler = async (req: Request, res: Response) => {
  try {
    const workouts = await contentService.getAllWorkouts()
    res.status(200).json(workouts)
  } catch (error) {
    console.error('Error in getAllWorkoutsHandler:', error)
    res.status(500).json({ error: 'Failed to fetch workouts' })
  }
}

// Get workout by ID
export const getWorkoutByIdHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    if (!id) {
      return res.status(400).json({ error: 'Workout ID is required' })
    }
    
    const workout = await contentService.getWorkoutById(id)
    
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' })
    }
    
    res.status(200).json(workout)
  } catch (error) {
    console.error(`Error in getWorkoutByIdHandler(${req.params.id}):`, error)
    res.status(500).json({ error: 'Failed to fetch workout' })
  }
}

// Get workouts by phase
export const getWorkoutsByPhaseHandler = async (req: Request, res: Response) => {
  try {
    const { phase } = req.params
    
    if (!phase) {
      return res.status(400).json({ error: 'Phase is required' })
    }
    
    const workouts = await contentService.getWorkoutsByPhase(phase)
    res.status(200).json(workouts)
  } catch (error) {
    console.error(`Error in getWorkoutsByPhaseHandler(${req.params.phase}):`, error)
    res.status(500).json({ error: 'Failed to fetch workouts by phase' })
  }
}

// Get all recipes
export const getAllRecipesHandler = async (req: Request, res: Response) => {
  try {
    const recipes = await contentService.getAllRecipes()
    res.status(200).json(recipes)
  } catch (error) {
    console.error('Error in getAllRecipesHandler:', error)
    res.status(500).json({ error: 'Failed to fetch recipes' })
  }
}

// Get recipe by ID
export const getRecipeByIdHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    if (!id) {
      return res.status(400).json({ error: 'Recipe ID is required' })
    }
    
    const recipe = await contentService.getRecipeById(id)
    
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }
    
    res.status(200).json(recipe)
  } catch (error) {
    console.error(`Error in getRecipeByIdHandler(${req.params.id}):`, error)
    res.status(500).json({ error: 'Failed to fetch recipe' })
  }
}

// Get recipes by phase
export const getRecipesByPhaseHandler = async (req: Request, res: Response) => {
  try {
    const { phase } = req.params
    
    if (!phase) {
      return res.status(400).json({ error: 'Phase is required' })
    }
    
    const recipes = await contentService.getRecipesByPhase(phase)
    res.status(200).json(recipes)
  } catch (error) {
    console.error(`Error in getRecipesByPhaseHandler(${req.params.phase}):`, error)
    res.status(500).json({ error: 'Failed to fetch recipes by phase' })
  }
}

// Get recipes by dietary preference
export const getRecipesByDietaryHandler = async (req: Request, res: Response) => {
  try {
    const { dietary } = req.params
    
    if (!dietary) {
      return res.status(400).json({ error: 'Dietary preference is required' })
    }
    
    const recipes = await contentService.getRecipesByDietaryPreference(dietary)
    res.status(200).json(recipes)
  } catch (error) {
    console.error(`Error in getRecipesByDietaryHandler(${req.params.dietary}):`, error)
    res.status(500).json({ error: 'Failed to fetch recipes by dietary preference' })
  }
}

// Get all recovery practices
export const getAllRecoveryHandler = async (req: Request, res: Response) => {
  try {
    const recovery = await contentService.getAllRecovery()
    res.status(200).json(recovery)
  } catch (error) {
    console.error('Error in getAllRecoveryHandler:', error)
    res.status(500).json({ error: 'Failed to fetch recovery practices' })
  }
}

// Get recovery practice by ID
export const getRecoveryByIdHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    if (!id) {
      return res.status(400).json({ error: 'Recovery ID is required' })
    }
    
    const recovery = await contentService.getRecoveryById(id)
    
    if (!recovery) {
      return res.status(404).json({ error: 'Recovery practice not found' })
    }
    
    res.status(200).json(recovery)
  } catch (error) {
    console.error(`Error in getRecoveryByIdHandler(${req.params.id}):`, error)
    res.status(500).json({ error: 'Failed to fetch recovery practice' })
  }
}

// Get recovery practices by phase
export const getRecoveryByPhaseHandler = async (req: Request, res: Response) => {
  try {
    const { phase } = req.params
    
    if (!phase) {
      return res.status(400).json({ error: 'Phase is required' })
    }
    
    const recovery = await contentService.getRecoveryByPhase(phase)
    res.status(200).json(recovery)
  } catch (error) {
    console.error(`Error in getRecoveryByPhaseHandler(${req.params.phase}):`, error)
    res.status(500).json({ error: 'Failed to fetch recovery practices by phase' })
  }
}

// Get personalized content recommendations
export const getPersonalizedContentHandler = async (req: Request, res: Response) => {
  try {
    const { phase } = req.params
    const { dietary } = req.query
    
    if (!phase) {
      return res.status(400).json({ error: 'Cycle phase is required' })
    }
    
    const recommendations = await contentService.getPersonalizedContent(
      phase, 
      dietary as string | undefined
    )
    
    res.status(200).json(recommendations)
  } catch (error) {
    console.error(`Error in getPersonalizedContentHandler:`, error)
    res.status(500).json({ error: 'Failed to fetch personalized content' })
  }
}