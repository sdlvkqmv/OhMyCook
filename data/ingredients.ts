// This file is the single source of truth for all ingredient data.
// The key is the canonical English name, which is used for state management.
export const INGREDIENT_DATA: {
  [key: string]: { en: string; ko: string; category: keyof typeof CATEGORY_ORDER };
} = {
  // Vegetables
  'Onion': { en: 'Onion', ko: '양파', category: 'vegetables' },
  'Garlic': { en: 'Garlic', ko: '마늘', category: 'vegetables' },
  'Green Onion': { en: 'Green Onion', ko: '대파', category: 'vegetables' },
  'Potato': { en: 'Potato', ko: '감자', category: 'vegetables' },
  'Carrot': { en: 'Carrot', ko: '당근', category: 'vegetables' },
  'Bell Pepper': { en: 'Bell Pepper', ko: '파프리카', category: 'vegetables' },
  'Cabbage': { en: 'Cabbage', ko: '양배추', category: 'vegetables' },
  'Lettuce': { en: 'Lettuce', ko: '상추', category: 'vegetables' },
  'Spinach': { en: 'Spinach', ko: '시금치', category: 'vegetables' },
  'Kale': { en: 'Kale', ko: '케일', category: 'vegetables' },
  'Broccoli': { en: 'Broccoli', ko: '브로콜리', category: 'vegetables' },
  'Cauliflower': { en: 'Cauliflower', ko: '콜리플라워', category: 'vegetables' },
  'Zucchini': { en: 'Zucchini', ko: '애호박', category: 'vegetables' },
  'Eggplant': { en: 'Eggplant', ko: '가지', category: 'vegetables' },
  'Tomato': { en: 'Tomato', ko: '토마토', category: 'vegetables' },
  'Cucumber': { en: 'Cucumber', ko: '오이', category: 'vegetables' },
  'Mushroom': { en: 'Mushroom', ko: '버섯', category: 'vegetables' },
  'Radish': { en: 'Radish', ko: '무', category: 'vegetables' },
  'Sweet Potato': { en: 'Sweet Potato', ko: '고구마', category: 'vegetables' },
  'Pumpkin': { en: 'Pumpkin', ko: '호박', category: 'vegetables' },
  'Asparagus': { en: 'Asparagus', ko: '아스파라거스', category: 'vegetables' },
  'Celery': { en: 'Celery', ko: '샐러리', category: 'vegetables' },
  'Leek': { en: 'Leek', ko: '부추', category: 'vegetables' },
  'Bean Sprouts': { en: 'Bean Sprouts', ko: '콩나물', category: 'vegetables' },
  'Kimchi': { en: 'Kimchi', ko: '김치', category: 'vegetables' },
  'Coriander': { en: 'Coriander', ko: '고수', category: 'vegetables' },

  // Fruits
  'Apple': { en: 'Apple', ko: '사과', category: 'fruits' },
  'Banana': { en: 'Banana', ko: '바나나', category: 'fruits' },
  'Lemon': { en: 'Lemon', ko: '레몬', category: 'fruits' },
  'Lime': { en: 'Lime', ko: '라임', category: 'fruits' },
  'Orange': { en: 'Orange', ko: '오렌지', category: 'fruits' },
  'Avocado': { en: 'Avocado', ko: '아보카도', category: 'fruits' },
  'Strawberry': { en: 'Strawberry', ko: '딸기', category: 'fruits' },
  'Blueberry': { en: 'Blueberry', ko: '블루베리', category: 'fruits' },

  // Meat
  'Chicken Breast': { en: 'Chicken Breast', ko: '닭가슴살', category: 'meat' },
  'Chicken Thigh': { en: 'Chicken Thigh', ko: '닭다리살', category: 'meat' },
  'Pork Belly': { en: 'Pork Belly', ko: '삼겹살', category: 'meat' },
  'Pork Loin': { en: 'Pork Loin', ko: '돼지 등심', category: 'meat' },
  'Beef Sirloin': { en: 'Beef Sirloin', ko: '소고기 등심', category: 'meat' },
  'Ground Beef': { en: 'Ground Beef', ko: '다진 소고기', category: 'meat' },
  'Ground Pork': { en: 'Ground Pork', ko: '다진 돼지고기', category: 'meat' },
  'Sausage': { en: 'Sausage', ko: '소시지', category: 'meat' },
  'Bacon': { en: 'Bacon', ko: '베이컨', category: 'meat' },
  'Ham': { en: 'Ham', ko: '햄', category: 'meat' },
  'Tofu': { en: 'Tofu', ko: '두부', category: 'meat' },
  'Egg': { en: 'Egg', ko: '계란', category: 'meat' },

  // Seafood
  'Shrimp': { en: 'Shrimp', ko: '새우', category: 'seafood' },
  'Salmon': { en: 'Salmon', ko: '연어', category: 'seafood' },
  'Tuna': { en: 'Tuna', ko: '참치', category: 'seafood' },
  'Squid': { en: 'Squid', ko: '오징어', category: 'seafood' },
  'Clams': { en: 'Clams', ko: '조개', category: 'seafood' },

  // Grains & Carbs
  'Rice': { en: 'Rice', ko: '밥', category: 'grainsCarbs' },
  'Pasta': { en: 'Pasta', ko: '파스타', category: 'grainsCarbs' },
  'Bread': { en: 'Bread', ko: '빵', category: 'grainsCarbs' },
  'Flour': { en: 'Flour', ko: '밀가루', category: 'grainsCarbs' },
  'Noodles': { en: 'Noodles', ko: '국수', category: 'grainsCarbs' },
  'Ramen Noodles': { en: 'Ramen Noodles', ko: '라면', category: 'grainsCarbs' },
  'Rice Cakes (Tteok)': { en: 'Rice Cakes (Tteok)', ko: '떡', category: 'grainsCarbs' },
  'Oats': { en: 'Oats', ko: '오트밀', category: 'grainsCarbs' },
  'Quinoa': { en: 'Quinoa', ko: '퀴노아', category: 'grainsCarbs' },
  'Corn': { en: 'Corn', ko: '옥수수', category: 'grainsCarbs' },
  
  // Dairy & Alternatives
  'Milk': { en: 'Milk', ko: '우유', category: 'dairy' },
  'Cheese': { en: 'Cheese', ko: '치즈', category: 'dairy' },
  'Cheddar Cheese': { en: 'Cheddar Cheese', ko: '체다 치즈', category: 'dairy' },
  'Mozzarella Cheese': { en: 'Mozzarella Cheese', ko: '모짜렐라 치즈', category: 'dairy' },
  'Parmesan Cheese': { en: 'Parmesan Cheese', ko: '파마산 치즈', category: 'dairy' },
  'Yogurt': { en: 'Yogurt', ko: '요거트', category: 'dairy' },
  'Butter': { en: 'Butter', ko: '버터', category: 'dairy' },
  'Heavy Cream': { en: 'Heavy Cream', ko: '생크림', category: 'dairy' },
  'Sour Cream': { en: 'Sour Cream', ko: '사워크림', category: 'dairy' },
  'Cream Cheese': { en: 'Cream Cheese', ko: '크림치즈', category: 'dairy' },
  'Soy Milk': { en: 'Soy Milk', ko: '두유', category: 'dairy' },
  'Almond Milk': { en: 'Almond Milk', ko: '아몬드 우유', category: 'dairy' },

  // Spices & Sauces
  'Salt': { en: 'Salt', ko: '소금', category: 'seasoning' },
  'Black Pepper': { en: 'Black Pepper', ko: '후추', category: 'seasoning' },
  'Sugar': { en: 'Sugar', ko: '설탕', category: 'seasoning' },
  'Brown Sugar': { en: 'Brown Sugar', ko: '흑설탕', category: 'seasoning' },
  'Honey': { en: 'Honey', ko: '꿀', category: 'seasoning' },
  'Olive Oil': { en: 'Olive Oil', ko: '올리브 오일', category: 'seasoning' },
  'Vegetable Oil': { en: 'Vegetable Oil', ko: '식용유', category: 'seasoning' },
  'Sesame Oil': { en: 'Sesame Oil', ko: '참기름', category: 'seasoning' },
  'Soy Sauce': { en: 'Soy Sauce', ko: '간장', category: 'seasoning' },
  'Vinegar': { en: 'Vinegar', ko: '식초', category: 'seasoning' },
  'Gochujang (Korean Chili Paste)': { en: 'Gochujang (Korean Chili Paste)', ko: '고추장', category: 'seasoning' },
  'Doenjang (Soybean Paste)': { en: 'Doenjang (Soybean Paste)', ko: '된장', category: 'seasoning' },
  'Gochugaru (Chili Powder)': { en: 'Gochugaru (Chili Powder)', ko: '고춧가루', category: 'seasoning' },
  'Ketchup': { en: 'Ketchup', ko: '케첩', category: 'seasoning' },
  'Mayonnaise': { en: 'Mayonnaise', ko: '마요네즈', category: 'seasoning' },
  'Mustard': { en: 'Mustard', ko: '머스타드', category: 'seasoning' },
  'Chili Flakes': { en: 'Chili Flakes', ko: '칠리 플레이크', category: 'seasoning' },
  'Paprika': { en: 'Paprika', ko: '파프리카 가루', category: 'seasoning' },
  'Cumin': { en: 'Cumin', ko: '큐민', category: 'seasoning' },
  'Turmeric': { en: 'Turmeric', ko: '강황', category: 'seasoning' },
  'Ginger': { en: 'Ginger', ko: '생강', category: 'seasoning' },
  'Rosemary': { en: 'Rosemary', ko: '로즈마리', category: 'seasoning' },
  'Thyme': { en: 'Thyme', ko: '타임', category: 'seasoning' },
  'Basil': { en: 'Basil', ko: '바질', category: 'seasoning' },
  'Oregano': { en: 'Oregano', ko: '오레가노', category: 'seasoning' },
  'Cinnamon': { en: 'Cinnamon', ko: '계피', category: 'seasoning' },
  'Nutmeg': { en: 'Nutmeg', ko: '넛맥', category: 'seasoning' },
  'Fish Sauce': { en: 'Fish Sauce', ko: '액젓', category: 'seasoning' },
  'Oyster Sauce': { en: 'Oyster Sauce', ko: '굴소스', category: 'seasoning' },
  'Mirin': { en: 'Mirin', ko: '미림', category: 'seasoning' },

  // Nuts & Seeds
  'Almonds': { en: 'Almonds', ko: '아몬드', category: 'nutsSeeds' },
  'Walnuts': { en: 'Walnuts', ko: '호두', category: 'nutsSeeds' },
  'Peanuts': { en: 'Peanuts', ko: '땅콩', category: 'nutsSeeds' },
  'Sesame Seeds': { en: 'Sesame Seeds', ko: '참깨', category: 'nutsSeeds' },
  'Chia Seeds': { en: 'Chia Seeds', ko: '치아씨드', category: 'nutsSeeds' },

  // Others
  'Seaweed (Gim)': { en: 'Seaweed (Gim)', ko: '김', category: 'others' },
};

// Define a consistent order for categories
const CATEGORY_ORDER = {
  vegetables: 1,
  fruits: 2,
  meat: 3,
  seafood: 4,
  grainsCarbs: 5,
  dairy: 6,
  seasoning: 7,
  nutsSeeds: 8,
  others: 9,
};

// Derive categories from the data, sorted by the defined order
export const INGREDIENT_CATEGORIES = (Object.keys(CATEGORY_ORDER) as Array<keyof typeof CATEGORY_ORDER>);

export const COMMON_INGREDIENTS = [
    'Onion', 'Garlic', 'Green Onion', 'Potato', 'Carrot',
    'Egg', 'Tofu',
    'Rice', 'Flour',
    'Milk', 'Cheese', 'Butter',
    'Salt', 'Black Pepper', 'Sugar', 'Olive Oil', 'Soy Sauce'
];

/**
 * Gets the translated name of an ingredient.
 * @param englishName The canonical English name of the ingredient.
 * @param language The target language ('en' or 'ko').
 * @returns The translated name, or the English name if not found.
 */
export const getIngredientTranslation = (
  englishName: string,
  language: 'en' | 'ko'
): string => {
  const ingredient = INGREDIENT_DATA[englishName];
  return ingredient ? ingredient[language] : englishName;
};

/**
 * Finds the canonical English name for an ingredient from either its English or Korean name.
 * @param name The name to search for (can be English or Korean).
 * @returns The canonical English name, or undefined if not found.
 */
export const findIngredientEnglishName = (name: string): string | undefined => {
    const lowerCaseName = name.toLowerCase();
    const found = Object.values(INGREDIENT_DATA).find(
        (i) => i.en.toLowerCase() === lowerCaseName || i.ko === lowerCaseName
    );
    return found?.en;
};

/**
 * Gets the category of an ingredient from its canonical English name.
 * @param englishName The canonical English name.
 * @returns The category key, or 'others' if not found.
 */
export const getIngredientCategory = (englishName: string): string => {
    return INGREDIENT_DATA[englishName]?.category || 'others';
}

export const ALL_INGREDIENTS = Object.values(INGREDIENT_DATA);