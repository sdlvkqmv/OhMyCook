
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
  const [activeCategory, setActiveCategory] = useState('all');
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

  const categories = ['all', ...INGREDIENT_CATEGORIES];

  const filteredIngredients = ingredients.filter(ing => {
    const categoryMatch = activeCategory === 'all' || getIngredientCategory(ing.name) === activeCategory;
    const searchMatch = searchTerm === '' ||
      getIngredientTranslation(ing.name, 'en').toLowerCase().includes(searchTerm.toLowerCase()) ||
      getIngredientTranslation(ing.name, 'ko').toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header title={t('ingredientManagerTitle')} onBack={onBack} />

      <div className="p-4">
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

        <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap ${activeCategory === cat ? 'bg-brand-primary text-white' : 'bg-surface text-text-secondary'}`}>
              {t(cat as any)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-grow p-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button onClick={() => setIsModalOpen(true)} className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2">
            <PlusIcon className="w-5 h-5" />
            <span>{t('addIngredient')}</span>
          </button>
          <button onClick={() => onNavigate('scan')} className="w-full bg-surface border border-line-dark text-text-primary font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2">
            <CameraIcon className="w-5 h-5" />
            <span>{t('scanWithReceipt')}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filteredIngredients.map(ing => (
            <div key={ing.name} className="bg-surface rounded-xl p-3 shadow-subtle relative flex items-center gap-3">
              <span className="text-3xl">{getIngredientEmoji(ing.name)}</span>
              <div>
                <p className="font-bold text-sm text-text-primary">{getIngredientTranslation(ing.name, language)}</p>
                <p className="text-xs text-text-secondary">{t(getIngredientCategory(ing.name) as any)}</p>
                <p className="text-xs text-text-secondary">{ing.quantity}</p>
              </div>
              <button onClick={() => handleRemoveIngredient(ing.name)} className="absolute top-2 right-2 p-1 text-text-secondary/50 hover:text-red-500">
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        {filteredIngredients.length === 0 && (
          <p className="text-center text-text-secondary mt-10">{searchTerm ? t('noSearchResults') : t('pleaseAddIngredients')}</p>
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