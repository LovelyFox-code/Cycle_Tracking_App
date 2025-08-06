import supabase from '../db/supabase'

// Inline data to avoid import issues
const cycleData = {
    phases: {
        menstrual: {
            name: 'Menstrual',
            description: 'Time for rest and reflection',
            message: 'Your body is shedding and renewing. Focus on gentle movement, warm foods, and self-care.',
            workout: 'Gentle yoga, stretching, or light walking. Listen to your body and rest when needed.',
            nutrition: 'Warm, nourishing foods rich in iron. Try bone broth, leafy greens, and herbal teas.',
            recovery: 'Prioritize sleep, use heat therapy, and practice mindfulness or meditation.',
        },
        follicular: {
            name: 'Follicular',
            description: 'Energy is building',
            message: 'Rising estrogen brings renewed energy and motivation. Perfect time to start new projects!',
            workout: 'Moderate to high-intensity workouts. Try strength training, running, or dance classes.',
            nutrition: 'Fresh, light foods with plenty of vegetables. Focus on lean proteins and complex carbs.',
            recovery: 'Maintain good sleep habits and stay hydrated. Light stretching after workouts.',
        },
        ovulation: {
            name: 'Ovulation',
            description: 'Peak energy and confidence',
            message: 'You\'re at your peak! High estrogen and testosterone boost energy, mood, and performance.',
            workout: 'High-intensity workouts, challenging strength training, or competitive sports.',
            nutrition: 'Protein-rich foods to support muscle recovery. Include healthy fats and antioxidants.',
            recovery: 'Active recovery with yoga or swimming. Stay well-hydrated and get quality sleep.',
        },
        luteal: {
            name: 'Luteal',
            description: 'Preparing for renewal',
            message: 'Progesterone rises, energy may dip. Focus on steady activities and mood support.',
            workout: 'Moderate workouts like pilates, steady-state cardio, or power walking.',
            nutrition: 'Anti-inflammatory foods, complex carbs for mood stability. Dark chocolate is okay!',
            recovery: 'Stress management is key. Try meditation, journaling, or warm baths.',
        },
    }
}

const workouts = [
    {
        slug: 'morning-energizer',
        title: 'Morning Energizer',
        description: 'Quick strength warm-up to kickstart your day',
        duration: '15 min',
        points: 10,
        workoutType: 'weights',
        isPremium: false,
        category: 'general',
        calories: 120,
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        tags: {
            intensity: 'medium',
            cyclePhase: 'follicular',
        },
    },
    {
        slug: 'full-body-strength',
        title: 'Full Body Strength',
        description: 'Comprehensive strength training for the entire body',
        duration: '30 min',
        points: 20,
        workoutType: 'weights',
        isPremium: true,
        category: 'general',
        calories: 250,
        tags: {
            intensity: 'high',
            cyclePhase: 'follicular',
        },
    },
    {
        slug: 'cardio-blast',
        title: 'Cardio Blast',
        description: 'High-intensity cardio to boost energy',
        duration: '25 min',
        points: 15,
        workoutType: 'phase_based',
        isPremium: false,
        category: 'general',
        calories: 200,
        tags: {
            intensity: 'high',
            cyclePhase: 'ovulation',
        },
    },
    {
        slug: 'yoga-flow',
        title: 'Yoga Flow',
        description: 'Relaxing and grounding flow to release tension',
        duration: '20 min',
        points: 15,
        workoutType: 'yoga',
        isPremium: false,
        category: 'mindset',
        calories: 100,
        videoUrl: 'https://www.w3schools.com/html/movie.mp4',
        tags: {
            intensity: 'low',
            cyclePhase: 'menstrual',
        },
    },
    {
        slug: 'core-workout',
        title: 'Core Workout',
        description: 'Focused core strengthening exercises',
        duration: '10 min',
        points: 10,
        workoutType: 'pilates',
        isPremium: false,
        category: 'business',
        calories: 80,
        tags: {
            intensity: 'medium',
            cyclePhase: 'luteal',
        },
    },
    {
        slug: 'meditation-and-movement',
        title: 'Meditation & Movement',
        description: 'Mindful movement combined with meditation',
        duration: '15 min',
        points: 15,
        workoutType: 'yoga',
        isPremium: false,
        category: 'mindset',
        calories: 50,
        tags: {
            intensity: 'low',
            cyclePhase: 'menstrual',
        },
    },
    {
        slug: 'quick-office-break',
        title: 'Quick Office Break',
        description: 'Short exercises you can do at your desk',
        duration: '5 min',
        points: 5,
        workoutType: 'pilates',
        isPremium: false,
        category: 'business',
        calories: 30,
        tags: {
            intensity: 'low',
        },
    },
    {
        slug: 'advanced-hiit',
        title: 'Advanced HIIT',
        description: 'High-intensity interval training for maximum results',
        duration: '35 min',
        points: 25,
        workoutType: 'phase_based',
        isPremium: true,
        category: 'general',
        calories: 350,
        tags: {
            intensity: 'high',
            cyclePhase: 'ovulation',
        },
    },
    {
        slug: 'hiit-blast',
        title: 'HIIT Blast',
        description: 'High intensity interval training to boost energy',
        duration: '25 min',
        points: 20,
        workoutType: 'phase_based',
        isPremium: true,
        category: 'general',
        calories: 220,
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        tags: {
            intensity: 'high',
            cyclePhase: 'ovulation',
        },
    },
]

const recipes = [
    {
        slug: 'hormone-balancing-breakfast',
        title: 'Hormone-Balancing Breakfast',
        description: 'Protein-rich morning meal',
        points: 15,
        dietType: 'vegetarian',
        isPremium: false,
        category: 'general',
        ingredients: [
            '2 eggs',
            '1/2 avocado, sliced',
            '1 cup spinach',
            '1/4 cup pumpkin seeds',
            '1 tablespoon olive oil',
            'Salt and pepper to taste'
        ],
        instructions: [
            'Heat olive oil in a pan over medium heat.',
            'Add spinach and cook until wilted, about 1 minute.',
            'Crack eggs into the pan and cook to your preference.',
            'Plate the eggs and spinach, add sliced avocado and pumpkin seeds.',
            'Season with salt and pepper.'
        ],
        calories: 450,
        prepTime: '15 minutes',
        heroImage: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?q=80&w=2013&auto=format&fit=crop',
        tags: {
            cyclePhase: 'menstrual',
            diet: 'vegetarian',
        },
    },
    {
        slug: 'anti-inflammatory-lunch',
        title: 'Anti-Inflammatory Lunch',
        description: 'Colorful veggies and healthy fats',
        points: 15,
        dietType: 'vegan',
        isPremium: true,
        category: 'general',
        ingredients: [
            '1 cup quinoa, cooked',
            '1 cup mixed greens',
            '1/2 cup cherry tomatoes, halved',
            '1/4 cup walnuts, chopped',
            '1/4 cup blueberries',
            '1 tablespoon olive oil',
            '1 tablespoon apple cider vinegar',
            'Salt and pepper to taste'
        ],
        instructions: [
            'Combine cooked quinoa, mixed greens, cherry tomatoes, walnuts, and blueberries in a bowl.',
            'In a small bowl, whisk together olive oil and apple cider vinegar.',
            'Pour dressing over salad and toss to combine.',
            'Season with salt and pepper.'
        ],
        calories: 380,
        prepTime: '10 minutes',
        heroImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop',
        tags: {
            cyclePhase: 'luteal',
            diet: 'vegan',
        },
    },
    {
        slug: 'energy-boosting-snack',
        title: 'Energy-Boosting Snack',
        description: 'Natural sugars and protein',
        points: 10,
        dietType: 'vegan',
        isPremium: false,
        category: 'business',
        ingredients: [
            '1 banana',
            '2 tablespoons almond butter',
            '1 tablespoon chia seeds',
            '1 tablespoon honey (optional)',
            'Dash of cinnamon'
        ],
        instructions: [
            'Slice banana lengthwise.',
            'Spread almond butter over banana slices.',
            'Sprinkle with chia seeds and cinnamon.',
            'Drizzle with honey if desired.'
        ],
        calories: 250,
        prepTime: '5 minutes',
        heroImage: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1974&auto=format&fit=crop',
        tags: {
            cyclePhase: 'follicular',
            diet: 'vegan',
        },
    },
    {
        slug: 'magnesium-rich-dinner',
        title: 'Magnesium-Rich Dinner',
        description: 'Leafy greens and whole grains',
        points: 15,
        dietType: 'vegetarian',
        isPremium: false,
        category: 'mindset',
        ingredients: [
            '1 cup brown rice, cooked',
            '2 cups kale, chopped',
            '1 cup black beans, cooked',
            '1/2 cup pumpkin seeds',
            '1 avocado, sliced',
            '2 tablespoons olive oil',
            '1 lemon, juiced',
            'Salt and pepper to taste'
        ],
        instructions: [
            'In a large bowl, combine cooked brown rice, chopped kale, and black beans.',
            'In a small bowl, whisk together olive oil and lemon juice.',
            'Pour dressing over rice mixture and toss to combine.',
            'Top with sliced avocado and pumpkin seeds.',
            'Season with salt and pepper.'
        ],
        calories: 650,
        prepTime: '20 minutes',
        heroImage: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop',
        tags: {
            cyclePhase: 'menstrual',
            diet: 'vegetarian',
        },
    },
    {
        slug: 'brain-food-lunch',
        title: 'Brain Food Lunch',
        description: 'Omega-3 rich foods for focus',
        points: 15,
        dietType: 'pescetarian',
        isPremium: false,
        category: 'mindset',
        ingredients: [
            '4 oz salmon fillet',
            '1 cup mixed greens',
            '1/2 cup quinoa, cooked',
            '1/4 cup walnuts, chopped',
            '1/2 avocado, sliced',
            '1 tablespoon olive oil',
            '1 lemon, juiced',
            'Salt and pepper to taste'
        ],
        instructions: [
            'Preheat oven to 400°F (200°C).',
            'Season salmon with salt and pepper, and bake for 12-15 minutes.',
            'In a bowl, combine mixed greens, quinoa, walnuts, and avocado.',
            'In a small bowl, whisk together olive oil and lemon juice.',
            'Pour dressing over salad and toss to combine.',
            'Serve salmon over salad.'
        ],
        calories: 500,
        prepTime: '25 minutes',
        heroImage: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1974&auto=format&fit=crop',
        tags: {
            cyclePhase: 'ovulation',
            diet: 'pescetarian',
        },
    },
    {
        slug: 'meal-prep-guide',
        title: 'Meal Prep Guide',
        description: 'Save time with prepared meals',
        points: 20,
        dietType: 'pescetarian',
        isPremium: true,
        category: 'business',
        ingredients: [
            '2 cups quinoa',
            '4 chicken breasts',
            '2 sweet potatoes',
            '1 bunch broccoli',
            '2 bell peppers',
            '1 cup cherry tomatoes',
            '4 tablespoons olive oil',
            'Salt, pepper, and herbs to taste'
        ],
        instructions: [
            'Cook quinoa according to package instructions.',
            'Season chicken breasts with salt, pepper, and herbs, and bake at 375°F (190°C) for 25-30 minutes.',
            'Dice sweet potatoes and roast at 400°F (200°C) for 20-25 minutes.',
            'Cut broccoli into florets and steam for 5 minutes.',
            'Slice bell peppers and cherry tomatoes.',
            'Divide all ingredients into meal prep containers.',
            'Store in refrigerator for up to 4 days.'
        ],
        calories: 450,
        prepTime: '60 minutes (for 4-5 meals)',
        heroImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop',
        tags: {
            diet: 'pescetarian',
        },
    },
    {
        slug: 'hydration-tracker',
        title: 'Hydration Tracker',
        description: 'Track your water intake',
        points: 10,
        dietType: 'all',
        isPremium: false,
        category: 'general',
        ingredients: [],
        instructions: [
            'Track your daily water intake',
            'Aim for 8 glasses of water per day',
            'Set reminders throughout the day',
            'Note how you feel with proper hydration'
        ],
        prepTime: 'All day',
        tags: {
            diet: 'all',
        },
    },
]

const recoveryItems = [
    {
        slug: 'deep-breathing',
        title: 'Deep Breathing',
        description: '5 minutes of focused breathing',
        points: 10,
        recoveryType: 'meditation',
        isPremium: false,
        category: 'mindset',
        duration: '5 min',
        videoUrl: 'https://example.com/deep-breathing.mp4',
        tags: {
            cyclePhase: 'luteal',
            intensity: 'low',
        },
    },
    {
        slug: 'stretching',
        title: 'Stretching',
        description: '10-minute gentle stretch routine',
        points: 15,
        recoveryType: 'stretching',
        isPremium: false,
        category: 'general',
        duration: '10 min',
        videoUrl: 'https://example.com/stretching.mp4',
        tags: {
            cyclePhase: 'menstrual',
            intensity: 'low',
        },
    },
    {
        slug: 'meditation',
        title: 'Meditation',
        description: 'Guided meditation session',
        points: 20,
        recoveryType: 'meditation',
        isPremium: true,
        category: 'mindset',
        duration: '10 min',
        videoUrl: 'https://example.com/meditation.mp4',
        tags: {
            cyclePhase: 'menstrual',
            intensity: 'low',
        },
    },
    {
        slug: 'epsom-salt-bath',
        title: 'Epsom Salt Bath',
        description: '20-minute relaxation soak',
        points: 15,
        recoveryType: 'stretching',
        isPremium: false,
        category: 'general',
        duration: '20 min',
        tags: {
            cyclePhase: 'menstrual',
            intensity: 'low',
        },
    },
    {
        slug: 'sleep-hygiene',
        title: 'Sleep Hygiene',
        description: 'Prepare for quality sleep',
        points: 10,
        recoveryType: 'sleep',
        isPremium: false,
        category: 'general',
        duration: '15 min',
        tags: {
            cyclePhase: 'luteal',
            intensity: 'low',
        },
    },
    {
        slug: 'quick-desk-stretch',
        title: 'Quick Desk Stretch',
        description: '2-minute office recovery',
        points: 5,
        recoveryType: 'stretching',
        isPremium: false,
        category: 'business',
        duration: '2 min',
        tags: {
            intensity: 'low',
        },
    },
    {
        slug: 'stress-management',
        title: 'Stress Management',
        description: 'Advanced relaxation techniques',
        points: 25,
        recoveryType: 'sleep',
        isPremium: true,
        category: 'business',
        duration: '30 min',
        videoUrl: 'https://example.com/stress-management.mp4',
        tags: {
            cyclePhase: 'luteal',
            intensity: 'medium',
        },
    },
]

const shopCategories = [
    {
        id: 'supplements',
        name: 'Supplements',
        description: 'Vitamins and supplements for women\'s health',
        icon: 'pill',
    },
    {
        id: 'apparel',
        name: 'Apparel',
        description: 'Comfortable workout clothes',
        icon: 'shirt',
    },
    {
        id: 'equipment',
        name: 'Equipment',
        description: 'Fitness and workout equipment',
        icon: 'dumbbell',
    },
    {
        id: 'wellness',
        name: 'Wellness',
        description: 'Self-care and wellness products',
        icon: 'sparkles',
    },
]

const shopItems = [
    // Supplements
    {
        id: 'supp-1',
        name: 'Women\'s Multivitamin',
        description: 'Daily multivitamin formulated for women\'s health',
        price: 24.99,
        category: 'supplements',
        inStock: true,
        points: 50,
    },
    {
        id: 'supp-2',
        name: 'Iron Support',
        description: 'Iron supplement with vitamin C for better absorption',
        price: 18.99,
        category: 'supplements',
        inStock: true,
        points: 35,
    },
    {
        id: 'supp-3',
        name: 'Cycle Balance',
        description: 'Herbal supplement to support hormonal balance',
        price: 29.99,
        category: 'supplements',
        inStock: true,
        isPremium: true,
        points: 60,
    },

    // Apparel
    {
        id: 'app-1',
        name: 'Yoga Leggings',
        description: 'High-waisted leggings with pocket',
        price: 49.99,
        category: 'apparel',
        inStock: true,
        points: 75,
    },
    {
        id: 'app-2',
        name: 'Sports Bra',
        description: 'Medium support sports bra for any workout',
        price: 34.99,
        category: 'apparel',
        inStock: true,
        points: 50,
    },
    {
        id: 'app-3',
        name: 'Workout Tank',
        description: 'Breathable tank top for intense workouts',
        price: 29.99,
        category: 'apparel',
        inStock: false,
        points: 45,
    },

    // Equipment
    {
        id: 'equip-1',
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat with alignment markers',
        price: 39.99,
        category: 'equipment',
        inStock: true,
        points: 65,
    },
    {
        id: 'equip-2',
        name: 'Resistance Bands Set',
        description: 'Set of 3 resistance bands with different strengths',
        price: 24.99,
        category: 'equipment',
        inStock: true,
        points: 40,
    },
    {
        id: 'equip-3',
        name: 'Adjustable Dumbbells',
        description: 'Space-saving adjustable dumbbells 2-20lbs',
        price: 149.99,
        category: 'equipment',
        inStock: true,
        isPremium: true,
        points: 200,
    },

    // Wellness
    {
        id: 'well-1',
        name: 'Essential Oil Diffuser',
        description: 'Ultrasonic aromatherapy diffuser with LED lights',
        price: 34.99,
        category: 'wellness',
        inStock: true,
        points: 55,
    },
    {
        id: 'well-2',
        name: 'Period Relief Heat Pad',
        description: 'Rechargeable heat pad for menstrual pain relief',
        price: 42.99,
        category: 'wellness',
        inStock: true,
        isPremium: true,
        points: 70,
    },
    {
        id: 'well-3',
        name: 'Sleep Mask',
        description: 'Silk sleep mask for better rest',
        price: 19.99,
        category: 'wellness',
        inStock: true,
        points: 30,
    },
]

interface CyclePhase {
    id: string
    name: string
    description: string
    message: string
    workout: string
    nutrition: string
    recovery: string
    created_at: string
    updated_at: string
}

interface WorkoutData {
    id: string
    slug: string
    title: string
    description: string
    duration: string
    points: number
    workout_type: string
    is_premium: boolean
    category: string
    calories: number
    video_url?: string
    tags: Record<string, any>
    created_at: string
    updated_at: string
}

interface RecipeData {
    id: string
    slug: string
    title: string
    description: string
    points: number
    diet_type: string
    is_premium: boolean
    category: string
    ingredients: string[]
    instructions: string[]
    calories: number
    prep_time: string
    hero_image?: string
    tags: Record<string, any>
    created_at: string
    updated_at: string
}

interface RecoveryData {
    id: string
    slug: string
    title: string
    description: string
    points: number
    recovery_type: string
    is_premium: boolean
    category: string
    duration: string
    video_url?: string
    tags: Record<string, any>
    created_at: string
    updated_at: string
}

interface ShopItemData {
    id: string
    name: string
    description: string
    price: number
    image_url?: string
    category: string
    in_stock: boolean
    is_premium?: boolean
    points?: number
    created_at: string
    updated_at: string
}

interface ShopCategoryData {
    id: string
    name: string
    description: string
    icon: string
    created_at: string
    updated_at: string
}

const now = new Date().toISOString()

async function seedCyclePhases() {
    console.log('🌙 Seeding cycle phases...')

    const cyclePhases: CyclePhase[] = Object.entries(cycleData.phases).map(([key, phase]: [string, any]) => ({
        id: key,
        name: phase.name,
        description: phase.description,
        message: phase.message,
        workout: phase.workout,
        nutrition: phase.nutrition,
        recovery: phase.recovery,
        created_at: now,
        updated_at: now
    }))

    const { data, error } = await supabase
        .from('cycle_phases')
        .upsert(cyclePhases, { onConflict: 'id' })

    if (error) {
        console.error('Error seeding cycle phases:', error)
        return false
    }

    console.log(`✅ Seeded ${cyclePhases.length} cycle phases`)
    return true
}

async function seedWorkouts() {
    console.log('💪 Seeding workouts...')

    const workoutData: WorkoutData[] = workouts.map((workout: any, index: number) => ({
        id: `workout-${index + 1}`,
        slug: workout.slug,
        title: workout.title,
        description: workout.description,
        duration: workout.duration,
        points: workout.points,
        workout_type: workout.workoutType,
        is_premium: workout.isPremium,
        category: workout.category,
        calories: workout.calories,
        video_url: workout.videoUrl,
        tags: workout.tags,
        created_at: now,
        updated_at: now
    }))

    const { data, error } = await supabase
        .from('workouts')
        .upsert(workoutData, { onConflict: 'slug' })

    if (error) {
        console.error('Error seeding workouts:', error)
        return false
    }

    console.log(`✅ Seeded ${workoutData.length} workouts`)
    return true
}

async function seedRecipes() {
    console.log('🍳 Seeding recipes...')

    const recipeData: RecipeData[] = recipes.map((recipe: any, index: number) => ({
        id: `recipe-${index + 1}`,
        slug: recipe.slug,
        title: recipe.title,
        description: recipe.description,
        points: recipe.points,
        diet_type: recipe.dietType,
        is_premium: recipe.isPremium,
        category: recipe.category,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        calories: recipe.calories,
        prep_time: recipe.prepTime,
        hero_image: recipe.heroImage,
        tags: recipe.tags,
        created_at: now,
        updated_at: now
    }))

    const { data, error } = await supabase
        .from('recipes')
        .upsert(recipeData, { onConflict: 'slug' })

    if (error) {
        console.error('Error seeding recipes:', error)
        return false
    }

    console.log(`✅ Seeded ${recipeData.length} recipes`)
    return true
}

async function seedRecoveryItems() {
    console.log('🧘 Seeding recovery items...')

    const recoveryData: RecoveryData[] = recoveryItems.map((item: any, index: number) => ({
        id: `recovery-${index + 1}`,
        slug: item.slug,
        title: item.title,
        description: item.description,
        points: item.points,
        recovery_type: item.recoveryType,
        is_premium: item.isPremium,
        category: item.category,
        duration: item.duration,
        video_url: item.videoUrl,
        tags: item.tags,
        created_at: now,
        updated_at: now
    }))

    const { data, error } = await supabase
        .from('recovery_items')
        .upsert(recoveryData, { onConflict: 'slug' })

    if (error) {
        console.error('Error seeding recovery items:', error)
        return false
    }

    console.log(`✅ Seeded ${recoveryData.length} recovery items`)
    return true
}

async function seedShopCategories() {
    console.log('🛍️ Seeding shop categories...')

    const categoryData: ShopCategoryData[] = shopCategories.map((category: any) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        icon: category.icon,
        created_at: now,
        updated_at: now
    }))

    const { data, error } = await supabase
        .from('shop_categories')
        .upsert(categoryData, { onConflict: 'id' })

    if (error) {
        console.error('Error seeding shop categories:', error)
        return false
    }

    console.log(`✅ Seeded ${categoryData.length} shop categories`)
    return true
}

async function seedShopItems() {
    console.log('🛒 Seeding shop items...')

    const itemData: ShopItemData[] = shopItems.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image_url: item.imageUrl,
        category: item.category,
        in_stock: item.inStock,
        is_premium: item.isPremium,
        points: item.points,
        created_at: now,
        updated_at: now
    }))

    const { data, error } = await supabase
        .from('shop_items')
        .upsert(itemData, { onConflict: 'id' })

    if (error) {
        console.error('Error seeding shop items:', error)
        return false
    }

    console.log(`✅ Seeded ${itemData.length} shop items`)
    return true
}

async function main() {
    console.log('🚀 Starting database seeding...')

    try {
        // Test connection first
        const { data: testData, error: testError } = await supabase
            .from('cycle_phases')
            .select('count')
            .limit(1)

        if (testError) {
            console.error('❌ Database connection failed:', testError)
            return
        }

        console.log('✅ Database connection successful')

        // Seed all data
        const results = await Promise.all([
            seedCyclePhases(),
            seedWorkouts(),
            seedRecipes(),
            seedRecoveryItems(),
            seedShopCategories(),
            seedShopItems()
        ])

        const successCount = results.filter(Boolean).length
        const totalCount = results.length

        if (successCount === totalCount) {
            console.log('🎉 All data seeded successfully!')
        } else {
            console.log(`⚠️ ${successCount}/${totalCount} seeding operations completed successfully`)
        }

    } catch (error) {
        console.error('❌ Seeding failed:', error)
    }
}

// Run the seeding script
if (require.main === module) {
    main()
}

export { main as seedDatabase } 