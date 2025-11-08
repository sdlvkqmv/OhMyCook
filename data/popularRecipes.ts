import { Recipe } from '../types';

export const popularRecipesData: Recipe[] = [
  {
    recipeName: "김치찌개 (Kimchi Jjigae)",
    englishRecipeName: "Kimchi Jjigae",
    description: "A classic Korean stew made with kimchi and other ingredients, such as pork, tofu, and green onions.",
    cuisine: "Korean",
    cookTime: 30,
    difficulty: 'Medium',
    spiciness: 4,
    calories: 450,
    servings: 2,
    ingredients: ["Kimchi", "Pork Belly", "Tofu", "Green Onion", "Onion", "Garlic", "Gochujang (Korean Chili Paste)", "Gochugaru (Chili Powder)", "Soy Sauce", "Sugar", "Water"],
    instructions: [
      "Cut the pork belly and kimchi into bite-sized pieces.",
      "In a pot, stir-fry the pork belly until it's slightly browned.",
      "Add the kimchi and continue to stir-fry for a few minutes until it softens.",
      "Add water, gochujang, gochugaru, soy sauce, and sugar. Bring to a boil.",
      "Reduce the heat and let it simmer for 15-20 minutes.",
      "Add tofu, onion, and garlic. Cook for another 5 minutes.",
      "Garnish with chopped green onions before serving."
    ]
  },
  {
    recipeName: "크림 파스타 (Cream Pasta)",
    englishRecipeName: "Cream Pasta",
    description: "A rich and creamy pasta dish made with heavy cream, Parmesan cheese, and bacon.",
    cuisine: "Western",
    cookTime: 25,
    difficulty: 'Easy',
    spiciness: 1,
    calories: 600,
    servings: 2,
    ingredients: ["Pasta", "Heavy Cream", "Bacon", "Onion", "Garlic", "Parmesan Cheese", "Olive Oil", "Salt", "Black Pepper"],
    instructions: [
      "Cook the pasta according to package directions. Drain and set aside.",
      "While the pasta is cooking, heat olive oil in a pan over medium heat.",
      "Add chopped bacon and cook until crispy. Remove from pan and set aside.",
      "In the same pan, sauté chopped onion and minced garlic until softened.",
      "Pour in the heavy cream and bring to a simmer. Let it thicken slightly.",
      "Stir in the Parmesan cheese, salt, and pepper.",
      "Add the cooked pasta and bacon back to the pan. Toss to coat everything in the sauce.",
      "Serve immediately, garnished with more Parmesan cheese if desired."
    ]
  },
  {
    recipeName: "라면 (Ramen)",
    englishRecipeName: "Ramen",
    description: "A simple yet satisfying instant noodle dish, customizable with your favorite toppings.",
    cuisine: "Japanese",
    cookTime: 20,
    difficulty: 'Easy',
    spiciness: 3,
    calories: 500,
    servings: 1,
    ingredients: ["Ramen Noodles", "Egg", "Green Onion", "Mushroom"],
    instructions: [
      "Bring 2 cups of water to a boil in a small pot.",
      "Add the ramen noodles and the soup base packet. Cook for 3-4 minutes.",
      "While the noodles are cooking, slice the green onions and mushrooms.",
      "In the last minute of cooking, crack an egg directly into the pot.",
      "You can either stir the egg to create ribbons or let it poach whole.",
      "Transfer the ramen to a bowl and top with green onions and mushrooms.",
      "Serve hot."
    ]
  },
  {
    recipeName: "김치볶음밥 (Kimchi Fried Rice)",
    englishRecipeName: "Kimchi Fried Rice",
    description: "A popular Korean fried rice dish made with kimchi, rice, and other ingredients.",
    cuisine: "Korean",
    cookTime: 15,
    difficulty: 'Easy',
    spiciness: 3,
    calories: 550,
    servings: 1,
    ingredients: ["Rice", "Kimchi", "Pork Belly", "Egg", "Green Onion", "Sesame Oil", "Soy Sauce"],
    instructions: [
        "Chop kimchi and pork belly into small pieces.",
        "Heat a pan with oil and stir-fry the pork belly.",
        "Add kimchi and cook until it's slightly softened.",
        "Add cooked rice to the pan and break it up with a spoon.",
        "Stir-fry everything together, adding soy sauce for seasoning.",
        "Drizzle sesame oil and mix well. Remove from heat.",
        "In a separate pan, make a sunny-side-up fried egg.",
        "Serve the fried rice with the egg on top and garnish with chopped green onions."
    ]
  },
  {
    recipeName: "야채볶음 (Vegetable Stir-fry)",
    englishRecipeName: "Vegetable Stir-fry",
    description: "A quick and healthy stir-fry with a variety of colorful vegetables.",
    cuisine: "Chinese",
    cookTime: 20,
    difficulty: 'Easy',
    spiciness: 1,
    calories: 300,
    servings: 2,
    ingredients: ["Broccoli", "Carrot", "Bell Pepper", "Onion", "Mushroom", "Garlic", "Soy Sauce", "Oyster Sauce", "Vegetable Oil"],
    instructions: [
        "Chop all vegetables into bite-sized pieces.",
        "Heat vegetable oil in a large pan or wok over high heat.",
        "Add garlic and stir-fry for 30 seconds until fragrant.",
        "Add the harder vegetables first, like carrots and broccoli. Stir-fry for 2-3 minutes.",
        "Add the remaining vegetables (bell pepper, onion, mushrooms) and continue to stir-fry for another 3-4 minutes until tender-crisp.",
        "In a small bowl, mix soy sauce and oyster sauce. Pour over the vegetables.",
        "Toss everything together to coat well. Cook for 1 more minute.",
        "Serve immediately with rice."
    ]
  },
  {
    recipeName: "비빔밥 (Bibimbap)",
    englishRecipeName: "Bibimbap",
    description: "A Korean mixed rice dish topped with assorted seasoned vegetables, meat, and a fried egg.",
    cuisine: "Korean",
    cookTime: 20,
    difficulty: 'Medium',
    spiciness: 2,
    calories: 650,
    servings: 2,
    ingredients: ["Rice", "Spinach", "Carrot", "Bean Sprouts", "Ground Beef", "Egg", "Gochujang (Korean Chili Paste)", "Sesame Oil", "Soy Sauce", "Garlic"],
    instructions: [
        "Cook the ground beef with soy sauce and garlic. Set aside.",
        "Blanch the spinach and bean sprouts separately. Squeeze out excess water and season with salt and sesame oil.",
        "Julienne the carrot and sauté lightly in a pan.",
        "Fry two eggs sunny-side-up.",
        "Assemble the bibimbap: place a serving of warm rice in a bowl.",
        "Arrange the seasoned vegetables and cooked beef neatly on top of the rice.",
        "Place the fried egg in the center.",
        "Serve with a side of gochujang and a drizzle of sesame oil. Mix everything together before eating."
    ]
  }
];