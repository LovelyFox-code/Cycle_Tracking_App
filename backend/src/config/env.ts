import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Required environment variables
const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY'
]

// Check for missing environment variables
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar])

if (missingEnvVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingEnvVars.join(', ')}`)
  process.exit(1)
}

// ✅ Log the loaded values (for debugging only)
console.log('✅ SUPABASE_URL:', process.env.SUPABASE_URL)
console.log('✅ SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY?.slice(0, 10) + '...')

// Export validated environment variables
export default {
  port: process.env.PORT || '3001',
  nodeEnv: process.env.NODE_ENV || 'development',
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY!
}
