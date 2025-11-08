
import React, { useState } from 'react';
import { RecipeFilters } from '../types';
import { XIcon } from './icons';
import { useLanguage } from '../context/LanguageContext';

interface FilterModalProps {
  initialFilters: RecipeFilters;
  onApply: (filters: RecipeFilters) => void;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ initialFilters, onApply, onClose }) => {
  const [filters, setFilters] = useState<RecipeFilters>(initialFilters);
  const { t } = useLanguage();

  const defaultFilters: RecipeFilters = {
    cuisine: 'any',
    servings: 2,
    spiciness: 'medium',
    difficulty: 'medium',
    maxCookTime: 45,
  };

  const handleApply = () => {
    onApply(filters);
  };
  
  const handleReset = () => {
    setFilters(defaultFilters);
  };

  const cuisineOptions: RecipeFilters['cuisine'][] = ['any', 'korean', 'japanese', 'chinese', 'western'];
  const spicinessOptions: RecipeFilters['spiciness'][] = ['mild', 'medium', 'spicy'];
  const difficultyOptions: RecipeFilters['difficulty'][] = ['easy', 'medium', 'hard'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 font-sans animate-fade-in">
      <div className="bg-surface rounded-2xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-text-secondary hover:text-text-primary">
          <XIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-text-primary mb-6">{t('filterModalTitle')}</h2>
        
        <div className="space-y-6">
          {/* Cuisine */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">{t('cuisine')}</label>
            <div className="flex flex-wrap gap-2">
              {cuisineOptions.map(option => (
                <button key={option} onClick={() => setFilters({...filters, cuisine: option})} className={`px-4 py-2 rounded-lg text-sm font-bold ${filters.cuisine === option ? 'bg-brand-primary text-white' : 'bg-background text-text-secondary'}`}>
                  {t(option)}
                </button>
              ))}
            </div>
          </div>

          {/* Servings */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">{t('servings')}: {t('servingsUnit', { count: filters.servings })}</label>
            <div className="flex items-center gap-4">
              <button onClick={() => setFilters(f => ({...f, servings: Math.max(1, f.servings - 1)}))} className="px-4 py-2 rounded-lg bg-background font-bold text-2xl">-</button>
              <span className="text-xl font-bold">{filters.servings}</span>
              <button onClick={() => setFilters(f => ({...f, servings: f.servings + 1}))} className="px-4 py-2 rounded-lg bg-background font-bold text-2xl">+</button>
            </div>
          </div>
          
          {/* Spiciness */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">{t('spiciness')}</label>
             <div className="flex gap-2">
              {spicinessOptions.map(option => (
                <button key={option} onClick={() => setFilters({...filters, spiciness: option})} className={`px-4 py-2 rounded-lg text-sm font-bold flex-1 ${filters.spiciness === option ? 'bg-brand-primary text-white' : 'bg-background text-text-secondary'}`}>
                  {t(option)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Difficulty */}
           <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">{t('difficulty')}</label>
             <div className="flex gap-2">
              {difficultyOptions.map(option => (
                <button key={option} onClick={() => setFilters({...filters, difficulty: option})} className={`px-4 py-2 rounded-lg text-sm font-bold flex-1 ${filters.difficulty === option ? 'bg-brand-primary text-white' : 'bg-background text-text-secondary'}`}>
                  {t(option)}
                </button>
              ))}
            </div>
          </div>

          {/* Max Cook Time */}
          <div>
            <label htmlFor="maxCookTime" className="block text-lg font-semibold text-gray-700 mb-2">{t('maxCookTime')}: {t('maxCookTimeUnit', { time: filters.maxCookTime })}</label>
            <input
              id="maxCookTime"
              type="range"
              min="10"
              max="120"
              step="5"
              value={filters.maxCookTime}
              onChange={(e) => setFilters({...filters, maxCookTime: parseInt(e.target.value, 10)})}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
          </div>

        </div>

        <div className="mt-8 flex justify-between">
          <button onClick={handleReset} className="bg-gray-200 text-text-secondary font-bold py-3 px-6 rounded-xl">
            {t('resetFilters')}
          </button>
          <button onClick={handleApply} className="bg-brand-primary text-white font-bold py-3 px-10 rounded-xl">
            {t('applyFilters')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
