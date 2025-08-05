import { Recipe } from '@/types/content';

export const recipes: Recipe[] = [
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
];