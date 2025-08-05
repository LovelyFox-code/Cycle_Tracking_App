import supabase from '../db/supabase'
import { Cycle, CyclePhase } from '../models/cycle.model'

class CycleService {
  /**
   * Get all cycles for a user
   */
  async getUserCycles(userId: string): Promise<Cycle[]> {
    try {
      const { data, error } = await supabase
        .from('cycles')
        .select('*')
        .eq('user_id', userId)
        .order('start_date', { ascending: false })
      
      if (error) {
        throw error
      }
      
      return data || []
    } catch (error) {
      console.error(`Error in CycleService.getUserCycles(${userId}):`, error)
      throw error
    }
  }

  /**
   * Get a specific cycle by ID
   */
  async getCycleById(id: string): Promise<Cycle | null> {
    try {
      const { data, error } = await supabase
        .from('cycles')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) {
        throw error
      }
      
      return data
    } catch (error) {
      console.error(`Error in CycleService.getCycleById(${id}):`, error)
      throw error
    }
  }

  /**
   * Get the current cycle for a user
   */
  async getCurrentCycle(userId: string): Promise<Cycle | null> {
    try {
      const { data, error } = await supabase
        .from('cycles')
        .select('*')
        .eq('user_id', userId)
        .order('start_date', { ascending: false })
        .limit(1)
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') {
          // No data found
          return null
        }
        throw error
      }
      
      return data
    } catch (error) {
      console.error(`Error in CycleService.getCurrentCycle(${userId}):`, error)
      throw error
    }
  }

  /**
   * Create a new cycle entry
   */
  async createCycle(cycleData: Partial<Cycle>): Promise<Cycle> {
    try {
      // Ensure required fields
      if (!cycleData.user_id || !cycleData.start_date || !cycleData.current_phase) {
        throw new Error('Missing required cycle data: user_id, start_date, or current_phase')
      }

      const { data, error } = await supabase
        .from('cycles')
        .insert([cycleData])
        .select()
      
      if (error) {
        throw error
      }
      
      if (!data || data.length === 0) {
        throw new Error('Failed to create cycle: No data returned')
      }
      
      return data[0]
    } catch (error) {
      console.error('Error in CycleService.createCycle:', error)
      throw error
    }
  }

  /**
   * Update a cycle entry
   */
  async updateCycle(id: string, cycleData: Partial<Cycle>): Promise<Cycle> {
    try {
      const { data, error } = await supabase
        .from('cycles')
        .update(cycleData)
        .eq('id', id)
        .select()
      
      if (error) {
        throw error
      }
      
      if (!data || data.length === 0) {
        throw new Error(`Cycle with ID ${id} not found`)
      }
      
      return data[0]
    } catch (error) {
      console.error(`Error in CycleService.updateCycle(${id}):`, error)
      throw error
    }
  }

  /**
   * Update the current phase of a cycle
   */
  async updateCyclePhase(id: string, phase: CyclePhase, dayOfCycle?: number): Promise<Cycle> {
    const updateData: Partial<Cycle> = {
      current_phase: phase
    }
    
    if (dayOfCycle !== undefined) {
      updateData.day_of_cycle = dayOfCycle
    }
    
    return this.updateCycle(id, updateData)
  }

  /**
   * Delete a cycle entry
   */
  async deleteCycle(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('cycles')
        .delete()
        .eq('id', id)
      
      if (error) {
        throw error
      }
    } catch (error) {
      console.error(`Error in CycleService.deleteCycle(${id}):`, error)
      throw error
    }
  }

  /**
   * Add notes to a cycle
   */
  async addCycleNotes(id: string, notes: string): Promise<Cycle> {
    return this.updateCycle(id, { notes })
  }
}

export default new CycleService()