import express from 'express'
import cors from 'cors'
import config from './config/env'
import apiRoutes from './api/routes'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'
import { testDbConnection } from './utils/testConnection'

const app = express()
const PORT = parseInt(config.port, 10)

// Middleware
app.use(cors())
app.use(express.json())

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Women\'s Health API',
    version: '1.0.0',
    status: 'running'
  })
})

// API routes
app.use('/api/v1', apiRoutes)

// Error handling
app.use(notFoundHandler)
app.use(errorHandler)

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on http://localhost:${PORT}`)
  testDbConnection() // Test connection on startup
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Rejection:', err)
  // Close server & exit process
  server.close(() => process.exit(1))
})

export default app
