import { Request, Response } from 'express'
import cycleService from '../services/cycle.service'
import { CyclePhase } from '../models/cycle.model'

// Get all cycles for a user
export const getUserCyclesHandler = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }
    
    const cycles = await cycleService.getUserCycles(userId)
    res.status(200).json(cycles)
  } catch (error) {
    console.error('Error in getUserCyclesHandler:', error)
    res.status(500).json({ error: 'Failed to fetch cycles' })
  }
}

// Get current cycle for a user
export const getCurrentCycleHandler = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }
    
    const cycle = await cycleService.getCurrentCycle(userId)
    
    if (!cycle) {
      return res.status(404).json({ error: 'No current cycle found for user' })
    }
    
    res.status(200).json(cycle)
  } catch (error) {
    console.error('Error in getCurrentCycleHandler:', error)
    res.status(500).json({ error: 'Failed to fetch current cycle' })
  }
}

// Create a new cycle
export const createCycleHandler = async (req: Request, res: Response) => {
  try {
    const { user_id, start_date, current_phase, day_of_cycle, notes } = req.body
    
    if (!user_id || !start_date || !current_phase) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        required: ['user_id', 'start_date', 'current_phase'] 
      })
    }
    
    // Validate phase
    if (!Object.values(CyclePhase).includes(current_phase as CyclePhase)) {
      return res.status(400).json({ 
        error: 'Invalid cycle phase', 
        valid_phases: Object.values(CyclePhase) 
      })
    }
    
    const cycle = await cycleService.createCycle({
      user_id,
      start_date,
      current_phase,
      day_of_cycle,
      notes
    })
    
    res.status(201).json(cycle)
  } catch (error: any) {
    console.error('Error in createCycleHandler:', error)
    res.status(500).json({ error: error.message || 'Failed to create cycle' })
  }
}

// Update a cycle
export const updateCycleHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { current_phase, day_of_cycle, notes } = req.body
    
    if (!id) {
      return res.status(400).json({ error: 'Cycle ID is required' })
    }
    
    // Validate phase if provided
    if (current_phase && !Object.values(CyclePhase).includes(current_phase as CyclePhase)) {
      return res.status(400).json({ 
        error: 'Invalid cycle phase', 
        valid_phases: Object.values(CyclePhase) 
      })
    }
    
    const cycle = await cycleService.updateCycle(id, {
      current_phase,
      day_of_cycle,
      notes
    })
    
    res.status(200).json(cycle)
  } catch (error: any) {
    console.error(`Error in updateCycleHandler(${req.params.id}):`, error)
    
    if (error.message?.includes('not found')) {
      return res.status(404).json({ error: 'Cycle not found' })
    }
    
    res.status(500).json({ error: 'Failed to update cycle' })
  }
}

// Delete a cycle
export const deleteCycleHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    if (!id) {
      return res.status(400).json({ error: 'Cycle ID is required' })
    }
    
    await cycleService.deleteCycle(id)
    res.status(204).send()
  } catch (error) {
    console.error(`Error in deleteCycleHandler(${req.params.id}):`, error)
    res.status(500).json({ error: 'Failed to delete cycle' })
  }
}