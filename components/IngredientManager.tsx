
import React, { useState } from 'react';
import { PlusIcon, SearchIcon, XIcon, CameraIcon } from './icons';
import { Ingredient } from '../types';
import IngredientModal from './IngredientModal';
import { useLanguage } from '../context/LanguageContext';
import { getIngredientCategory, getIngredientTranslation, INGREDIENT_CATEGORIES, getIngredientEmoji } from '../data/ingredients';
import Header from './Header';

interface IngredientManagerProps {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  onBack: () => void;
  onNavigate: (view: 'scan') => void;
}

const IngredientManager: React.FC<IngredientManagerProps> = ({ ingredients, setIngredients, onBack, onNavigate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { t, language } = useLanguage();

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setIngredients(prev => prev.filter(ing => ing.name !== ingredientToRemove));
  };

  const handleAddIngredients = (newIngredients: Ingredient[]) => {
    const currentNames = new Set(ingredients.map(i => i.name));
    const additions = newIngredients.filter(i => !currentNames.has(i.name));
    setIngredients(prev => [...prev, ...additions]);
  }

  const filteredIngredients = ingredients.filter(ing => {
    const searchMatch = searchTerm === '' ||
      getIngredientTranslation(ing.name, 'en').toLowerCase().includes(searchTerm.toLowerCase()) ||
      getIngredientTranslation(ing.name, 'ko').toLowerCase().includes(searchTerm.toLowerCase());
    return searchMatch;
  });

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header title={t('ingredientManagerTitle')} onBack={onBack} />

      <div className="p-4 pb-0">
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchIngredients')}
            className="w-full bg-surface border border-line-light rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          />
        </div>
      </div>

      <div className="flex-grow p-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2 mb-6">
          <button onClick={() => setIsModalOpen(true)} className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2">
            <PlusIcon className="w-5 h-5" />
            <span>{t('addIngredient')}</span>
          </button>
          <button onClick={() => onNavigate('scan')} className="w-full bg-surface border border-line-dark text-text-primary font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2">
            <CameraIcon className="w-5 h-5" />
            <span>{t('scanWithReceipt')}</span>
          </button>
        </div>

        {filteredIngredients.length === 0 ? (
          <p className="text-center text-text-secondary mt-10">{searchTerm ? t('noSearchResults') : t('pleaseAddIngredients')}</p>
        ) : (
          <div className="space-y-6">
            {INGREDIENT_CATEGORIES.map(category => {
              const categoryIngredients = filteredIngredients.filter(ing => getIngredientCategory(ing.name) === category);
              if (categoryIngredients.length === 0) return null;

              return (
                <div key={category}>
                  <h3 className="text-sm font-bold text-text-secondary uppercase mb-3 ml-1">
                    {t(category as any)}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categoryIngredients.map(ing => (
                      <div key={ing.name} className="bg-surface border border-line-light rounded-full pl-3 pr-2 py-2 shadow-sm flex items-center gap-2">
                        <span className="text-lg leading-none">{getIngredientEmoji(ing.name)}</span>
                        <span className="font-semibold text-text-primary text-sm whitespace-nowrap">
                          {getIngredientTranslation(ing.name, language)}
                        </span>
                        <button
                          onClick={() => handleRemoveIngredient(ing.name)}
                          className="ml-1 p-1 text-text-secondary hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <IngredientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddIngredients}
      />
    </div>
  );
};

export default IngredientManager;
