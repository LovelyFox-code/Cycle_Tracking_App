import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'

const execAsync = promisify(exec)

async function runSchema() {
    console.log('📋 Setting up database schema...')

    try {
        // Read the schema file
        const schemaPath = path.join(__dirname, 'schema.sql')
        const schema = fs.readFileSync(schemaPath, 'utf8')

        console.log('✅ Schema file loaded successfully')
        console.log('⚠️  Please run the following SQL in your Supabase SQL editor:')
        console.log('')
        console.log('='.repeat(80))
        console.log(schema)
        console.log('='.repeat(80))
        console.log('')
        console.log('📝 Instructions:')
        console.log('1. Go to your Supabase dashboard')
        console.log('2. Navigate to the SQL Editor')
        console.log('3. Copy and paste the schema above')
        console.log('4. Click "Run" to execute the schema')
        console.log('5. Once complete, run: npm run seed')

    } catch (error) {
        console.error('❌ Error reading schema file:', error)
    }
}

async function checkDatabaseConnection() {
    console.log('🔍 Checking database connection...')

    try {
        // Import supabase client
        const supabase = (await import('../db/supabase')).default

        const { data, error } = await supabase
            .from('cycle_phases')
            .select('count')
            .limit(1)

        if (error) {
            console.error('❌ Database connection failed:', error.message)
            return false
        }

        console.log('✅ Database connection successful')
        return true
    } catch (error) {
        console.error('❌ Database connection failed:', error)
        return false
    }
}

async function main() {
    console.log('🚀 Women\'s Health App Database Setup')
    console.log('='.repeat(50))

    const args = process.argv.slice(2)
    const command = args[0]

    switch (command) {
        case 'schema':
            await runSchema()
            break

        case 'check':
            await checkDatabaseConnection()
            break

        case 'seed':
            console.log('🌱 Running database seeding...')
            try {
                const { seedDatabase } = await import('./seed')
                await seedDatabase()
            } catch (error) {
                console.error('❌ Seeding failed:', error)
            }
            break

        case 'full':
            console.log('🔄 Running full setup...')
            await runSchema()
            console.log('')
            console.log('⏳ Waiting for schema to be applied...')
            console.log('Press Enter when you\'ve run the schema in Supabase, then we\'ll seed the data...')

            // Wait for user input
            process.stdin.once('data', async () => {
                const isConnected = await checkDatabaseConnection()
                if (isConnected) {
                    try {
                        const { seedDatabase } = await import('./seed')
                        await seedDatabase()
                    } catch (error) {
                        console.error('❌ Seeding failed:', error)
                    }
                } else {
                    console.log('❌ Cannot proceed with seeding - database connection failed')
                }
                process.exit(0)
            })
            break

        default:
            console.log('📖 Available commands:')
            console.log('  npm run setup:schema    - Show database schema')
            console.log('  npm run setup:check     - Check database connection')
            console.log('  npm run setup:seed      - Run database seeding')
            console.log('  npm run setup:full      - Run full setup (schema + seed)')
            console.log('')
            console.log('💡 Recommended workflow:')
            console.log('1. npm run setup:schema   (copy schema to Supabase)')
            console.log('2. npm run setup:check    (verify connection)')
            console.log('3. npm run setup:seed     (populate with data)')
            break
    }
}

if (require.main === module) {
    main()
}

export { runSchema, checkDatabaseConnection } 