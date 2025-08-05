import { Request, Response } from 'express'
import { User } from '../models/user.model'
import userService from '../services/user.service'

// Re-export for backward compatibility with index.ts
export const getAllUsers = async (): Promise<User[]> => {
  return userService.getAllUsers()
}

// Express route handlers
export const getUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

export const getUserByIdHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await userService.getUserById(id)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
}

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    
    if (!userData.email) {
      return res.status(400).json({ error: 'Email is required' })
    }
    
    const user = await userService.createUser(userData)
    res.status(201).json(user)
  } catch (error: any) {
    const statusCode = error.code === '23505' ? 409 : 500
    const message = error.code === '23505' ? 'User with this email already exists' : 'Failed to create user'
    
    res.status(statusCode).json({ error: message })
  }
}

export const updateUserHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userData = req.body
    
    const user = await userService.updateUser(id, userData)
    res.status(200).json(user)
  } catch (error: any) {
    if (error.message?.includes('not found')) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    res.status(500).json({ error: 'Failed to update user' })
  }
}

export const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await userService.deleteUser(id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
}
