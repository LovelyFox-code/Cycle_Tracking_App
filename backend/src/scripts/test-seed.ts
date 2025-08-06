import supabase from '../db/supabase'

async function testDatabaseConnection() {
    console.log('🔍 Testing database connection...')

    try {
        const { data, error } = await supabase
            .from('cycle_phases')
            .select('count')
            .limit(1)

        if (error) {
            console.error('❌ Database connection failed:', error)
            return false
        }

        console.log('✅ Database connection successful')
        return true
    } catch (error) {
        console.error('❌ Database connection failed:', error)
        return false
    }
}

async function testCyclePhases() {
    console.log('🌙 Testing cycle phases...')

    try {
        const { data, error } = await supabase
            .from('cycle_phases')
            .select('*')

        if (error) {
            console.error('❌ Error fetching cycle phases:', error)
            return false
        }

        console.log(`✅ Found ${data?.length || 0} cycle phases`)
        if (data && data.length > 0) {
            console.log('Sample phase:', data[0].name)
        }
        return true
    } catch (error) {
        console.error('❌ Error testing cycle phases:', error)
        return false
    }
}

async function testWorkouts() {
    console.log('💪 Testing workouts...')

    try {
        const { data, error } = await supabase
            .from('workouts')
            .select('*')

        if (error) {
            console.error('❌ Error fetching workouts:', error)
            return false
        }

        console.log(`✅ Found ${data?.length || 0} workouts`)
        if (data && data.length > 0) {
            console.log('Sample workout:', data[0].title)
        }
        return true
    } catch (error) {
        console.error('❌ Error testing workouts:', error)
        return false
    }
}

async function testRecipes() {
    console.log('🍳 Testing recipes...')

    try {
        const { data, error } = await supabase
            .from('recipes')
            .select('*')

        if (error) {
            console.error('❌ Error fetching recipes:', error)
            return false
        }

        console.log(`✅ Found ${data?.length || 0} recipes`)
        if (data && data.length > 0) {
            console.log('Sample recipe:', data[0].title)
        }
        return true
    } catch (error) {
        console.error('❌ Error testing recipes:', error)
        return false
    }
}

async function testRecoveryItems() {
    console.log('🧘 Testing recovery items...')

    try {
        const { data, error } = await supabase
            .from('recovery_items')
            .select('*')

        if (error) {
            console.error('❌ Error fetching recovery items:', error)
            return false
        }

        console.log(`✅ Found ${data?.length || 0} recovery items`)
        if (data && data.length > 0) {
            console.log('Sample recovery item:', data[0].title)
        }
        return true
    } catch (error) {
        console.error('❌ Error testing recovery items:', error)
        return false
    }
}

async function testShopCategories() {
    console.log('🛍️ Testing shop categories...')

    try {
        const { data, error } = await supabase
            .from('shop_categories')
            .select('*')

        if (error) {
            console.error('❌ Error fetching shop categories:', error)
            return false
        }

        console.log(`✅ Found ${data?.length || 0} shop categories`)
        if (data && data.length > 0) {
            console.log('Sample category:', data[0].name)
        }
        return true
    } catch (error) {
        console.error('❌ Error testing shop categories:', error)
        return false
    }
}

async function testShopItems() {
    console.log('🛒 Testing shop items...')

    try {
        const { data, error } = await supabase
            .from('shop_items')
            .select('*')

        if (error) {
            console.error('❌ Error fetching shop items:', error)
            return false
        }

        console.log(`✅ Found ${data?.length || 0} shop items`)
        if (data && data.length > 0) {
            console.log('Sample item:', data[0].name)
        }
        return true
    } catch (error) {
        console.error('❌ Error testing shop items:', error)
        return false
    }
}

async function testTaggedContent() {
    console.log('🏷️ Testing tagged content...')

    try {
        // Test workouts by phase
        const { data: follicularWorkouts, error: workoutError } = await supabase
            .from('workouts')
            .select('*')
            .contains('tags', { cyclePhase: 'follicular' })

        if (workoutError) {
            console.error('❌ Error fetching tagged workouts:', workoutError)
            return false
        }

        console.log(`✅ Found ${follicularWorkouts?.length || 0} follicular workouts`)

        // Test recipes by diet
        const { data: veganRecipes, error: recipeError } = await supabase
            .from('recipes')
            .select('*')
            .contains('tags', { diet: 'vegan' })

        if (recipeError) {
            console.error('❌ Error fetching tagged recipes:', recipeError)
            return false
        }

        console.log(`✅ Found ${veganRecipes?.length || 0} vegan recipes`)

        return true
    } catch (error) {
        console.error('❌ Error testing tagged content:', error)
        return false
    }
}

async function main() {
    console.log('🧪 Testing Database Seeding')
    console.log('='.repeat(50))

    const tests = [
        testDatabaseConnection,
        testCyclePhases,
        testWorkouts,
        testRecipes,
        testRecoveryItems,
        testShopCategories,
        testShopItems,
        testTaggedContent
    ]

    const results = await Promise.all(tests.map(test => test()))
    const successCount = results.filter(Boolean).length
    const totalCount = results.length

    console.log('')
    console.log('='.repeat(50))
    console.log(`📊 Test Results: ${successCount}/${totalCount} tests passed`)

    if (successCount === totalCount) {
        console.log('🎉 All tests passed! Your database is ready to use.')
    } else {
        console.log('⚠️ Some tests failed. Please check the errors above.')
    }
}

if (require.main === module) {
    main()
}

export { main as testSeed } 