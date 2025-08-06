import express from 'express'
import {
  getUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler
} from './user'
import {
  getUserCyclesHandler,
  getCurrentCycleHandler,
  createCycleHandler,
  updateCycleHandler,
  deleteCycleHandler
} from './cycle'
import {
  getAllWorkoutsHandler,
  getWorkoutByIdHandler,
  getWorkoutsByPhaseHandler,
  getAllRecipesHandler,
  getRecipeByIdHandler,
  getRecipesByPhaseHandler,
  getRecipesByDietaryHandler,
  getAllRecoveryHandler,
  getRecoveryByIdHandler,
  getRecoveryByPhaseHandler,
  getPersonalizedContentHandler
} from './content'
import {
  registerHandler,
  loginHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  verifyTokenHandler
} from './auth'
import { createUserSchema, updateUserSchema } from '../schema/user.schema'
import { createCycleSchema, updateCycleSchema } from '../schema/cycle.schema'
import {
  getContentByIdSchema,
  getContentByPhaseSchema,
  getRecipesByDietarySchema
} from '../schema/content.schema'
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} from '../schema/auth.schema'
import { validateResource } from '../middleware/validateResource'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Authentication routes
router.post('/auth/register', validateResource(registerSchema), registerHandler)
router.post('/auth/login', validateResource(loginSchema), loginHandler)
router.post('/auth/forgot-password', validateResource(forgotPasswordSchema), forgotPasswordHandler)
router.post('/auth/reset-password', validateResource(resetPasswordSchema), resetPasswordHandler)
router.get('/auth/verify', verifyTokenHandler)

// User routes (protected)
router.get('/users', authenticateToken, getUsersHandler)
router.get('/users/:id', authenticateToken, getUserByIdHandler)
router.post('/users', authenticateToken, validateResource(createUserSchema), createUserHandler)
router.put('/users/:id', authenticateToken, validateResource(updateUserSchema), updateUserHandler)
router.delete('/users/:id', authenticateToken, deleteUserHandler)

// Cycle routes
router.get('/users/:userId/cycles', getUserCyclesHandler)
router.get('/users/:userId/cycles/current', getCurrentCycleHandler)
router.post('/cycles', validateResource(createCycleSchema), createCycleHandler)
router.put('/cycles/:id', validateResource(updateCycleSchema), updateCycleHandler)
router.delete('/cycles/:id', deleteCycleHandler)

// Workout routes
router.get('/workouts', getAllWorkoutsHandler)
router.get('/workouts/:id', validateResource(getContentByIdSchema), getWorkoutByIdHandler)
router.get('/workouts/phase/:phase', validateResource(getContentByPhaseSchema), getWorkoutsByPhaseHandler)

// Recipe routes
router.get('/recipes', getAllRecipesHandler)
router.get('/recipes/:id', validateResource(getContentByIdSchema), getRecipeByIdHandler)
router.get('/recipes/phase/:phase', validateResource(getContentByPhaseSchema), getRecipesByPhaseHandler)
router.get('/recipes/dietary/:dietary', validateResource(getRecipesByDietarySchema), getRecipesByDietaryHandler)

// Recovery routes
router.get('/recovery', getAllRecoveryHandler)
router.get('/recovery/:id', validateResource(getContentByIdSchema), getRecoveryByIdHandler)
router.get('/recovery/phase/:phase', validateResource(getContentByPhaseSchema), getRecoveryByPhaseHandler)

// Personalized content recommendations
router.get('/recommendations/:phase', validateResource(getContentByPhaseSchema), getPersonalizedContentHandler)

export default router