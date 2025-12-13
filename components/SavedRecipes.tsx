
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
              <RecipeCard key={`${recipe.recipeName}-${index}`} recipe={recipe} onSelect={() => setSelectedRecipe(recipe)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center opacity-70">
            <div className="text-6xl mb-6">📖</div>
            <h3 className="text-xl font-bold text-text-primary mb-2">
              {t('savedRecipesEmpty')}
            </h3>
            <p className="text-text-secondary max-w-xs mx-auto leading-relaxed">
              {t('savedRecipesDetails')}
            </p>
          </div>
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
