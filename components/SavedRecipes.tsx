
import React, { useState } from 'react';
import Header from './Header';
import { useLanguage } from '../context/LanguageContext';
import { Recipe, ShoppingListItem } from '../types';
import RecipeCard, { RecipeDetailModal } from './RecipeCard';

interface SavedRecipesProps {
  savedRecipes: Recipe[];
  onBack: () => void;
  shoppingList: ShoppingListItem[];
  onToggleShoppingListItem: (itemName: string) => void;
  onToggleSaveRecipe: (recipe: Recipe) => void;
  onStartChat: (recipe: Recipe) => void;
}

const SavedRecipes: React.FC<SavedRecipesProps> = ({ savedRecipes, onBack, shoppingList, onToggleShoppingListItem, onToggleSaveRecipe, onStartChat }) => {
  const { t } = useLanguage();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header title={t('savedRecipesTitle')} onBack={onBack} />
      <div className="flex-grow p-4 overflow-y-auto">
        {savedRecipes.length > 0 ? (
          <div className="space-y-4">
            {savedRecipes.map((recipe, index) => (
              <RecipeCard key={`${recipe.recipeName}-${index}`} recipe={recipe} onSelect={() => setSelectedRecipe(recipe)}/>
            ))}
          </div>
        ) : (
          <p className="text-center text-text-secondary mt-10">{t('savedRecipesEmpty')}</p>
        )}

        {selectedRecipe && (
          <RecipeDetailModal 
            recipe={selectedRecipe} 
            onClose={() => setSelectedRecipe(null)}
            shoppingList={shoppingList}
            onToggleShoppingListItem={onToggleShoppingListItem}
            isSaved={savedRecipes.some(r => r.recipeName === selectedRecipe.recipeName)}
            onToggleSaveRecipe={onToggleSaveRecipe}
            onStartChat={onStartChat}
          />
        )}
      </div>
    </div>
  );
};

export default SavedRecipes;
