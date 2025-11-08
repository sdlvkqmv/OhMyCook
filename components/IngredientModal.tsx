
import React, { useState } from 'react';
import { Ingredient } from '../types';
import { XIcon } from './icons';
import { useLanguage } from '../context/LanguageContext';
import { INGREDIENT_CATEGORIES, findIngredientEnglishName, ALL_INGREDIENTS, getIngredientTranslation } from '../data/ingredients';

interface IngredientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (newIngredients: Ingredient[]) => void;
}

type Suggestions = Record<string, typeof ALL_INGREDIENTS>;


const IngredientModal: React.FC<IngredientModalProps> = ({ isOpen, onClose, onAdd }) => {
    const { t, language } = useLanguage();
    const [name, setName] = useState('');
    const [category, setCategory] = useState(INGREDIENT_CATEGORIES[0]);
    const [quantity, setQuantity] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestions>({});

    if (!isOpen) return null;

    const resetForm = () => {
        setName('');
        setQuantity('');
        setCategory(INGREDIENT_CATEGORIES[0]);
        setSuggestions({});
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };
    
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);

        if (value.trim().length === 0) {
            setSuggestions({});
            return;
        }

        const lowerCaseValue = value.toLowerCase();
        const filtered = ALL_INGREDIENTS.filter(
            ing => ing.en.toLowerCase().includes(lowerCaseValue) || ing.ko.toLowerCase().includes(lowerCaseValue)
        );

        const grouped = filtered.reduce((acc: Suggestions, ing) => {
            const cat = ing.category;
            if (!acc[cat]) {
                acc[cat] = [];
            }
            acc[cat].push(ing);
            return acc;
        }, {} as Suggestions);

        setSuggestions(grouped);
    };

    const handleSuggestionClick = (ingredient: typeof ALL_INGREDIENTS[0]) => {
        setName(getIngredientTranslation(ingredient.en, language));
        setCategory(ingredient.category);
        setSuggestions({}); // Hide suggestions
    };

    const handleAdd = () => {
        const englishName = findIngredientEnglishName(name);
        if (!englishName) {
            alert('Please select a valid ingredient from the list.');
            return;
        }
        onAdd([{ name: englishName, quantity }]);
        resetForm();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 font-sans">
            <div className="bg-surface rounded-2xl shadow-lg w-full max-w-sm p-6 relative">
                <button onClick={handleClose} className="absolute top-4 right-4 text-text-secondary hover:text-text-primary">
                    <XIcon className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold text-text-primary mb-6 text-center">{t('addIngredientTitle')}</h2>
                
                <div className="space-y-4">
                    <div className="relative">
                        <label className="text-sm font-bold text-text-secondary block mb-1">{t('ingredientName')}</label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            placeholder={t('ingredientNamePlaceholder')}
                            className="w-full bg-background border border-line-light rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                        />
                         {Object.keys(suggestions).length > 0 && (
                            <div className="absolute z-10 w-full mt-1 border border-line-light rounded-lg max-h-48 overflow-y-auto bg-surface shadow-lg">
                                {/* FIX: Replaced `Object.entries` with `Object.keys` to avoid a type inference issue where the value was being treated as 'unknown', causing a crash when calling `.map`. */}
                                {Object.keys(suggestions).map((cat) => (
                                    <div key={cat}>
                                        <p className="p-2 text-xs font-bold text-text-secondary bg-background sticky top-0">{t(cat as any)}</p>
                                        <ul>
                                            {suggestions[cat].map(ing => (
                                                <li key={ing.en}>
                                                    <button 
                                                        onClick={() => handleSuggestionClick(ing)}
                                                        className="w-full text-left p-2 text-sm text-text-primary hover:bg-brand-light"
                                                    >
                                                        {getIngredientTranslation(ing.en, language)}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="text-sm font-bold text-text-secondary block mb-1">{t('category')}</label>
                         <select
                            value={category}
                            // FIX: The type of `e.target.value` is a generic string, which is not assignable to the specific string literal union type of the `category` state. Cast it to the correct type to resolve the type mismatch.
                            onChange={(e) => setCategory(e.target.value as typeof category)}
                            className="w-full bg-background border border-line-light rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 disabled:bg-gray-100"
                            disabled
                         >
                            {INGREDIENT_CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{t(cat as any)}</option>
                            ))}
                         </select>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-text-secondary block mb-1">{t('quantity')}</label>
                        <input
                            type="text"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder={t('quantityPlaceholder')}
                            className="w-full bg-background border border-line-light rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <button onClick={handleAdd} className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-xl">
                        {t('add')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IngredientModal;