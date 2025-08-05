import supabase from '../db/supabase'
import { User } from '../models/user.model'

class UserService {
  /**
   * Get all users from the database
   */
  async getAllUsers(): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
      
      if (error) {
        throw error
      }
      
      return data || []
    } catch (error) {
      console.error('Error in UserService.getAllUsers:', error)
      throw error
    }
  }

  /**
   * Get a user by their ID
   */
  async getUserById(id: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) {
        throw error
      }
      
      return data
    } catch (error) {
      console.error(`Error in UserService.getUserById(${id}):`, error)
      throw error
    }
  }

  /**
   * Get a user by their email
   */
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()
      
      if (error) {
        throw error
      }
      
      return data
    } catch (error) {
      console.error(`Error in UserService.getUserByEmail(${email}):`, error)
      throw error
    }
  }

  /**
   * Create a new user
   */
  async createUser(userData: Partial<User>): Promise<User> {
    try {
      // Set default values if not provided
      const userWithDefaults = {
        ...userData,
        notifications_enabled: userData.notifications_enabled ?? true
      }

      const { data, error } = await supabase
        .from('users')
        .insert([userWithDefaults])
        .select()
      
      if (error) {
        throw error
      }
      
      if (!data || data.length === 0) {
        throw new Error('Failed to create user: No data returned')
      }
      
      return data[0]
    } catch (error) {
      console.error('Error in UserService.createUser:', error)
      throw error
    }
  }

  /**
   * Update a user by their ID
   */
  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', id)
        .select()
      
      if (error) {
        throw error
      }
      
      if (!data || data.length === 0) {
        throw new Error(`User with ID ${id} not found`)
      }
      
      return data[0]
    } catch (error) {
      console.error(`Error in UserService.updateUser(${id}):`, error)
      throw error
    }
  }

  /**
   * Update user theme preference
   */
  async updateThemePreference(id: string, theme: string): Promise<User> {
    return this.updateUser(id, { theme_preference: theme })
  }

  /**
   * Update user dietary preference
   */
  async updateDietaryPreference(id: string, dietary: string): Promise<User> {
    return this.updateUser(id, { dietary_preference: dietary })
  }

  /**
   * Toggle notifications
   */
  async toggleNotifications(id: string, enabled: boolean): Promise<User> {
    return this.updateUser(id, { notifications_enabled: enabled })
  }

  /**
   * Delete a user by their ID
   */
  async deleteUser(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)
      
      if (error) {
        throw error
      }
    } catch (error) {
      console.error(`Error in UserService.deleteUser(${id}):`, error)
      throw error
    }
  }
}

export default new UserService()