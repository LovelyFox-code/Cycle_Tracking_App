export type ShopItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  inStock: boolean;
  isPremium?: boolean;
  points?: number;
};

export type ShopCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export const shopCategories: ShopCategory[] = [
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
];

export const shopItems: ShopItem[] = [
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
];