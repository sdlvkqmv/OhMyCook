// This file is the single source of truth for all ingredient data.
// The key is the canonical English name, which is used for state management.
export const INGREDIENT_DATA: {
  [key: string]: { en: string; ko: string; category: keyof typeof CATEGORY_ORDER; emoji: string };
} = {
  // Vegetables
  'Onion': { en: 'Onion', ko: '양파', category: 'vegetables', emoji: '🧅' },
  'Garlic': { en: 'Garlic', ko: '마늘', category: 'vegetables', emoji: '🧄' },
  'Green Onion': { en: 'Green Onion', ko: '대파', category: 'vegetables', emoji: '🧅' },
  'Potato': { en: 'Potato', ko: '감자', category: 'vegetables', emoji: '🥔' },
  'Carrot': { en: 'Carrot', ko: '당근', category: 'vegetables', emoji: '🥕' },
  'Bell Pepper': { en: 'Bell Pepper', ko: '파프리카', category: 'vegetables', emoji: '🫑' },
  'Cabbage': { en: 'Cabbage', ko: '양배추', category: 'vegetables', emoji: '🥬' },
  'Lettuce': { en: 'Lettuce', ko: '상추', category: 'vegetables', emoji: '🥬' },
  'Spinach': { en: 'Spinach', ko: '시금치', category: 'vegetables', emoji: '🍃' },
  'Kale': { en: 'Kale', ko: '케일', category: 'vegetables', emoji: '🥬' },
  'Broccoli': { en: 'Broccoli', ko: '브로콜리', category: 'vegetables', emoji: '🥦' },
  'Cauliflower': { en: 'Cauliflower', ko: '콜리플라워', category: 'vegetables', emoji: '🥦' },
  'Zucchini': { en: 'Zucchini', ko: '애호박', category: 'vegetables', emoji: '🥒' },
  'Eggplant': { en: 'Eggplant', ko: '가지', category: 'vegetables', emoji: '🍆' },
  'Tomato': { en: 'Tomato', ko: '토마토', category: 'vegetables', emoji: '🍅' },
  'Cucumber': { en: 'Cucumber', ko: '오이', category: 'vegetables', emoji: '🥒' },
  'Mushroom': { en: 'Mushroom', ko: '버섯', category: 'vegetables', emoji: '🍄' },
  'Radish': { en: 'Radish', ko: '무', category: 'vegetables', emoji: '🥔' },
  'Sweet Potato': { en: 'Sweet Potato', ko: '고구마', category: 'vegetables', emoji: '🍠' },
  'Pumpkin': { en: 'Pumpkin', ko: '호박', category: 'vegetables', emoji: '🎃' },
  'Asparagus': { en: 'Asparagus', ko: '아스파라거스', category: 'vegetables', emoji: '🌿' },
  'Celery': { en: 'Celery', ko: '샐러리', category: 'vegetables', emoji: '🌿' },
  'Leek': { en: 'Leek', ko: '부추', category: 'vegetables', emoji: '🧅' },
  'Bean Sprouts': { en: 'Bean Sprouts', ko: '콩나물', category: 'vegetables', emoji: '🌱' },
  'Kimchi': { en: 'Kimchi', ko: '김치', category: 'vegetables', emoji: '🥬' },
  'Coriander': { en: 'Coriander', ko: '고수', category: 'vegetables', emoji: '🌿' },

  // Fruits
  'Apple': { en: 'Apple', ko: '사과', category: 'fruits', emoji: '🍎' },
  'Banana': { en: 'Banana', ko: '바나나', category: 'fruits', emoji: '🍌' },
  'Lemon': { en: 'Lemon', ko: '레몬', category: 'fruits', emoji: '🍋' },
  'Lime': { en: 'Lime', ko: '라임', category: 'fruits', emoji: '🍋' },
  'Orange': { en: 'Orange', ko: '오렌지', category: 'fruits', emoji: '🍊' },
  'Avocado': { en: 'Avocado', ko: '아보카도', category: 'fruits', emoji: '🥑' },
  'Strawberry': { en: 'Strawberry', ko: '딸기', category: 'fruits', emoji: '🍓' },
  'Blueberry': { en: 'Blueberry', ko: '블루베리', category: 'fruits', emoji: '🫐' },

  // Meat
  'Chicken Breast': { en: 'Chicken Breast', ko: '닭가슴살', category: 'meat', emoji: '🐔' },
  'Chicken Thigh': { en: 'Chicken Thigh', ko: '닭다리살', category: 'meat', emoji: '🍗' },
  'Pork Belly': { en: 'Pork Belly', ko: '삼겹살', category: 'meat', emoji: '🥓' },
  'Pork Loin': { en: 'Pork Loin', ko: '돼지 등심', category: 'meat', emoji: '🥩' },
  'Beef Sirloin': { en: 'Beef Sirloin', ko: '소고기 등심', category: 'meat', emoji: '🥩' },
  'Ground Beef': { en: 'Ground Beef', ko: '다진 소고기', category: 'meat', emoji: '🥩' },
  'Ground Pork': { en: 'Ground Pork', ko: '다진 돼지고기', category: 'meat', emoji: '🥩' },
  'Sausage': { en: 'Sausage', ko: '소시지', category: 'meat', emoji: '🌭' },
  'Bacon': { en: 'Bacon', ko: '베이컨', category: 'meat', emoji: '🥓' },
  'Ham': { en: 'Ham', ko: '햄', category: 'meat', emoji: '🍖' },
  'Tofu': { en: 'Tofu', ko: '두부', category: 'meat', emoji: '🧊' },
  'Egg': { en: 'Egg', ko: '계란', category: 'meat', emoji: '🥚' },

  // Seafood
  'Shrimp': { en: 'Shrimp', ko: '새우', category: 'seafood', emoji: '🦐' },
  'Salmon': { en: 'Salmon', ko: '연어', category: 'seafood', emoji: '🐟' },
  'Tuna': { en: 'Tuna', ko: '참치', category: 'seafood', emoji: '🐟' },
  'Squid': { en: 'Squid', ko: '오징어', category: 'seafood', emoji: '🦑' },
  'Clams': { en: 'Clams', ko: '조개', category: 'seafood', emoji: '🐚' },

  // Grains & Carbs
  'Rice': { en: 'Rice', ko: '밥', category: 'grainsCarbs', emoji: '🍚' },
  'Pasta': { en: 'Pasta', ko: '파스타', category: 'grainsCarbs', emoji: '🍝' },
  'Bread': { en: 'Bread', ko: '빵', category: 'grainsCarbs', emoji: '🍞' },
  'Flour': { en: 'Flour', ko: '밀가루', category: 'grainsCarbs', emoji: '🌾' },
  'Noodles': { en: 'Noodles', ko: '국수', category: 'grainsCarbs', emoji: '🍜' },
  'Ramen Noodles': { en: 'Ramen Noodles', ko: '라면', category: 'grainsCarbs', emoji: '🍜' },
  'Rice Cakes (Tteok)': { en: 'Rice Cakes (Tteok)', ko: '떡', category: 'grainsCarbs', emoji: '🍡' },
  'Oats': { en: 'Oats', ko: '오트밀', category: 'grainsCarbs', emoji: '🌾' },
  'Quinoa': { en: 'Quinoa', ko: '퀴노아', category: 'grainsCarbs', emoji: '🌾' },
  'Corn': { en: 'Corn', ko: '옥수수', category: 'grainsCarbs', emoji: '🌽' },

  // Dairy & Alternatives
  'Milk': { en: 'Milk', ko: '우유', category: 'dairy', emoji: '🥛' },
  'Cheese': { en: 'Cheese', ko: '치즈', category: 'dairy', emoji: '🧀' },
  'Cheddar Cheese': { en: 'Cheddar Cheese', ko: '체다 치즈', category: 'dairy', emoji: '🧀' },
  'Mozzarella Cheese': { en: 'Mozzarella Cheese', ko: '모짜렐라 치즈', category: 'dairy', emoji: '🧀' },
  'Parmesan Cheese': { en: 'Parmesan Cheese', ko: '파마산 치즈', category: 'dairy', emoji: '🧀' },
  'Yogurt': { en: 'Yogurt', ko: '요거트', category: 'dairy', emoji: '🍦' },
  'Butter': { en: 'Butter', ko: '버터', category: 'dairy', emoji: '🧈' },
  'Heavy Cream': { en: 'Heavy Cream', ko: '생크림', category: 'dairy', emoji: '🥛' },
  'Sour Cream': { en: 'Sour Cream', ko: '사워크림', category: 'dairy', emoji: '🥣' },
  'Cream Cheese': { en: 'Cream Cheese', ko: '크림치즈', category: 'dairy', emoji: '🧀' },
  'Soy Milk': { en: 'Soy Milk', ko: '두유', category: 'dairy', emoji: '🥛' },
  'Almond Milk': { en: 'Almond Milk', ko: '아몬드 우유', category: 'dairy', emoji: '🥛' },

  // Spices & Sauces
  'Salt': { en: 'Salt', ko: '소금', category: 'seasoning', emoji: '🧂' },
  'Black Pepper': { en: 'Black Pepper', ko: '후추', category: 'seasoning', emoji: '🧂' },
  'Sugar': { en: 'Sugar', ko: '설탕', category: 'seasoning', emoji: '🍬' },
  'Brown Sugar': { en: 'Brown Sugar', ko: '흑설탕', category: 'seasoning', emoji: '🍬' },
  'Honey': { en: 'Honey', ko: '꿀', category: 'seasoning', emoji: '🍯' },
  'Olive Oil': { en: 'Olive Oil', ko: '올리브 오일', category: 'seasoning', emoji: '🫒' },
  'Vegetable Oil': { en: 'Vegetable Oil', ko: '식용유', category: 'seasoning', emoji: '🌻' },
  'Sesame Oil': { en: 'Sesame Oil', ko: '참기름', category: 'seasoning', emoji: '🫗' },
  'Soy Sauce': { en: 'Soy Sauce', ko: '간장', category: 'seasoning', emoji: '🍶' },
  'Vinegar': { en: 'Vinegar', ko: '식초', category: 'seasoning', emoji: '🍶' },
  'Gochujang (Korean Chili Paste)': { en: 'Gochujang (Korean Chili Paste)', ko: '고추장', category: 'seasoning', emoji: '🌶️' },
  'Doenjang (Soybean Paste)': { en: 'Doenjang (Soybean Paste)', ko: '된장', category: 'seasoning', emoji: '🥘' },
  'Gochugaru (Chili Powder)': { en: 'Gochugaru (Chili Powder)', ko: '고춧가루', category: 'seasoning', emoji: '🌶️' },
  'Ketchup': { en: 'Ketchup', ko: '케첩', category: 'seasoning', emoji: '🍅' },
  'Mayonnaise': { en: 'Mayonnaise', ko: '마요네즈', category: 'seasoning', emoji: '🥚' },
  'Mustard': { en: 'Mustard', ko: '머스타드', category: 'seasoning', emoji: '🌭' },
  'Chili Flakes': { en: 'Chili Flakes', ko: '칠리 플레이크', category: 'seasoning', emoji: '🌶️' },
  'Paprika': { en: 'Paprika', ko: '파프리카 가루', category: 'seasoning', emoji: '🌶️' },
  'Cumin': { en: 'Cumin', ko: '큐민', category: 'seasoning', emoji: '🌿' },
  'Turmeric': { en: 'Turmeric', ko: '강황', category: 'seasoning', emoji: '🌿' },
  'Ginger': { en: 'Ginger', ko: '생강', category: 'seasoning', emoji: '🫚' },
  'Rosemary': { en: 'Rosemary', ko: '로즈마리', category: 'seasoning', emoji: '🌿' },
  'Thyme': { en: 'Thyme', ko: '타임', category: 'seasoning', emoji: '🌿' },
  'Basil': { en: 'Basil', ko: '바질', category: 'seasoning', emoji: '🌿' },
  'Oregano': { en: 'Oregano', ko: '오레가노', category: 'seasoning', emoji: '🌿' },
  'Cinnamon': { en: 'Cinnamon', ko: '계피', category: 'seasoning', emoji: '🪵' },
  'Nutmeg': { en: 'Nutmeg', ko: '넛맥', category: 'seasoning', emoji: '🌰' },
  'Fish Sauce': { en: 'Fish Sauce', ko: '액젓', category: 'seasoning', emoji: '🐟' },
  'Oyster Sauce': { en: 'Oyster Sauce', ko: '굴소스', category: 'seasoning', emoji: '🦪' },
  'Mirin': { en: 'Mirin', ko: '미림', category: 'seasoning', emoji: '🍶' },

  // Nuts & Seeds
  'Almonds': { en: 'Almonds', ko: '아몬드', category: 'nutsSeeds', emoji: '🌰' },
  'Walnuts': { en: 'Walnuts', ko: '호두', category: 'nutsSeeds', emoji: '🌰' },
  'Peanuts': { en: 'Peanuts', ko: '땅콩', category: 'nutsSeeds', emoji: '🥜' },
  'Sesame Seeds': { en: 'Sesame Seeds', ko: '참깨', category: 'nutsSeeds', emoji: '🌰' },
  'Chia Seeds': { en: 'Chia Seeds', ko: '치아씨드', category: 'nutsSeeds', emoji: '🌱' },

  // Others
  'Seaweed (Gim)': { en: 'Seaweed (Gim)', ko: '김', category: 'others', emoji: '🍙' },
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

/**
 * Gets the emoji for an ingredient.
 * @param englishName The canonical English name.
 * @returns The emoji string, or a default emoji if not found.
 */
export const getIngredientEmoji = (englishName: string): string => {
  return INGREDIENT_DATA[englishName]?.emoji || '🥘';
};

export const ALL_INGREDIENTS = Object.values(INGREDIENT_DATA);