import React from 'react';
import Header from './Header';
import { useLanguage } from '../context/LanguageContext';
import { ShoppingListItem } from '../types';
import { XIcon } from './icons';
import { getIngredientTranslation } from '../data/ingredients';

interface ShoppingListProps {
  shoppingList: ShoppingListItem[];
  setShoppingList: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>;
  onBack: () => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ shoppingList, setShoppingList, onBack }) => {
  const { t, language } = useLanguage();

  const handleRemoveItem = (itemName: string) => {
    setShoppingList(prev => prev.filter(item => item.name !== itemName));
  };

  const handleClearList = () => {
    setShoppingList([]);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header title={t('shoppingListTitle')} onBack={onBack} />
      <div className="flex-grow p-4 overflow-y-auto">
        {shoppingList.length > 0 ? (
          <>
            <button onClick={handleClearList} className="w-full mb-4 bg-red-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-red-600 transition-colors">
              {t('clearShoppingList')}
            </button>
            <ul className="space-y-2">
              {shoppingList.map(item => (
                <li key={item.name} className="flex justify-between items-center bg-surface p-3 rounded-xl shadow-subtle">
                  <span className="text-text-primary">{getIngredientTranslation(item.name, language)}</span>
                  <button onClick={() => handleRemoveItem(item.name)} className="text-red-500 hover:text-red-700 p-1">
                    <XIcon className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-center text-text-secondary mt-10">{t('shoppingListEmpty')}</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
