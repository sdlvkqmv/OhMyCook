

import React, { useState } from 'react';
import { UserSettings } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { FireIcon, XIcon } from './icons';
import { COMMON_INGREDIENTS, getIngredientCategory, getIngredientTranslation, ALL_INGREDIENTS } from '../data/ingredients';

interface OnboardingProps {
  initialSettings: UserSettings;
  onSave: (settings: UserSettings, initialIngredients: string[]) => void;
  onBack: () => void;
}

const ProgressBar: React.FC<{ step: number; totalSteps: number }> = ({ step, totalSteps }) => (
  <div className="w-full bg-line-light rounded-full h-1.5">
    <div
      className="bg-brand-primary h-1.5 rounded-full transition-all duration-300"
      style={{ width: `${(step / totalSteps) * 100}%` }}
    ></div>
  </div>
);

const Onboarding: React.FC<OnboardingProps> = ({ initialSettings, onSave, onBack }) => {
  const [step, setStep] = useState(1);
  const [settings, setSettings] = useState<UserSettings>(initialSettings);
  const [selectedInitialIngredients, setSelectedInitialIngredients] = useState<string[]>([]);
  const { t, language } = useLanguage();
  const totalSteps = 6;

  const [customIngredientSearch, setCustomIngredientSearch] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<(typeof ALL_INGREDIENTS[0])[]>([]);

  const handleNext = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));
  const handleFinish = () => onSave(settings, selectedInitialIngredients);

  const handleInitialIngredientToggle = (ingredientName: string) => {
    setSelectedInitialIngredients(prev => 
      prev.includes(ingredientName)
        ? prev.filter(i => i !== ingredientName)
        : [...prev, ingredientName]
    );
  };

  const handleCustomSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomIngredientSearch(value);

    if (value.trim().length === 0) {
        setSearchSuggestions([]);
        return;
    }

    const lowerCaseValue = value.toLowerCase();
    const filtered = ALL_INGREDIENTS.filter(
        ing => (ing.en.toLowerCase().includes(lowerCaseValue) || ing.ko.toLowerCase().includes(lowerCaseValue)) && !selectedInitialIngredients.includes(ing.en)
    ).slice(0, 5);
    setSearchSuggestions(filtered);
  };

  const handleSuggestionSelect = (ingredientName: string) => {
      handleInitialIngredientToggle(ingredientName);
      setCustomIngredientSearch('');
      setSearchSuggestions([]);
  };
  
  const renderStep = () => {
    switch (step) {
      case 1: // Cooking Level
        const levels: UserSettings['cookingLevel'][] = ['Beginner', 'Intermediate', 'Advanced'];
        return (
          <div>
            <h2 className="text-xl font-bold mb-1">{t('onboardingTitle')}</h2>
            <p className="text-text-secondary mb-6">{t('onboardingSubtitle')}</p>
            <div className="space-y-3">
              {levels.map(level => (
                <button key={level} onClick={() => setSettings({ ...settings, cookingLevel: level })} className={`w-full text-left p-4 border rounded-xl transition-colors ${settings.cookingLevel === level ? 'border-brand-primary bg-brand-light' : 'border-line-light bg-surface'}`}>
                  <p className="font-bold">{t(level.toLowerCase() as any)}</p>
                  <p className="text-sm text-text-secondary">{t((level.toLowerCase() + 'Desc') as any)}</p>
                </button>
              ))}
            </div>
          </div>
        );
      case 2: // Allergies
        const allergies: (keyof (typeof import('../i18n'))['translations']['en'])[] = ['egg', 'milk', 'nuts', 'shellfish', 'wheat', 'soy', 'fish'];
        const handleAllergyToggle = (allergy: string) => {
            const currentAllergies = settings.allergies;
            if (currentAllergies.includes(allergy)) {
                setSettings({...settings, allergies: currentAllergies.filter(a => a !== allergy)});
            } else {
                setSettings({...settings, allergies: [...currentAllergies, allergy]});
            }
        };
        return (
          <div>
            <h2 className="text-xl font-bold mb-1">{t('allergyTitle')}</h2>
            <p className="text-text-secondary mb-6">{t('allergySubtitle')}</p>
            <div className="flex flex-wrap gap-3">
                {allergies.map(allergyKey => (
                    <button key={allergyKey} onClick={() => handleAllergyToggle(t(allergyKey))} className={`px-4 py-2 border rounded-lg transition-colors ${settings.allergies.includes(t(allergyKey)) ? 'border-brand-primary bg-brand-light' : 'border-line-light bg-surface'}`}>
                        {t(allergyKey)}
                    </button>
                ))}
            </div>
          </div>
        );
       case 3: // Spiciness
            const spicinessLevels = [
                { level: 1, labelKey: "mild" },
                { level: 2, labelKey: "medium" },
                { level: 3, labelKey: "spicy" },
                { level: 4, labelKey: "verySpicy" },
                { level: 5, labelKey: "extremelySpicy" },
            ] as const;
            
            return (
                <div>
                    <h2 className="text-xl font-bold mb-1">{t('spicinessTitle')}</h2>
                    <p className="text-text-secondary mb-8">{t('spicinessSubtitle')}</p>
                    <div className="flex justify-center items-center gap-4">
                        {spicinessLevels.map(s => (
                            <button key={s.level} onClick={() => setSettings(prev => ({...prev, spicinessPreference: s.level}))}>
                                <FireIcon className={`w-8 h-8 transition-colors ${settings.spicinessPreference >= s.level ? 'text-brand-primary' : 'text-line-light'}`} isFilled={settings.spicinessPreference >= s.level} />
                            </button>
                        ))}
                    </div>
                    <p className="text-center text-text-secondary mt-4">{t(spicinessLevels[settings.spicinessPreference - 1].labelKey)}</p>
                </div>
            );
        case 4: // Cook Time
            const timeOptions = [
                { labelKey: 'timeUnder10', value: 10 },
                { labelKey: 'time10to30', value: 30 },
                { labelKey: 'timeOver30', value: 120 }
            ] as const;
            return (
                <div>
                    <h2 className="text-xl font-bold mb-1">{t('cookTimeTitle')}</h2>
                    <p className="text-text-secondary mb-6">{t('cookTimeSubtitle')}</p>
                    <div className="space-y-3">
                        {timeOptions.map(option => (
                            <button 
                                key={option.labelKey} 
                                onClick={() => setSettings({...settings, maxCookTime: option.value})}
                                className={`w-full text-left p-4 border rounded-xl transition-colors ${settings.maxCookTime === option.value ? 'border-brand-primary bg-brand-light' : 'border-line-light bg-surface'}`}
                            >
                                <p className="font-bold">{t(option.labelKey)}</p>
                            </button>
                        ))}
                    </div>
                </div>
            );
        case 5: // Kitchen Tools
             const tools: (keyof (typeof import('../i18n'))['translations']['en'])[] = ['microwave', 'induction', 'gasStove', 'airFryer', 'oven', 'blender'];
             const handleToolToggle = (tool: string) => {
                const currentTools = settings.availableTools;
                if (currentTools.includes(tool)) {
                    setSettings({...settings, availableTools: currentTools.filter(a => a !== tool)});
                } else {
                    setSettings({...settings, availableTools: [...currentTools, tool]});
                }
            };
             return (
                 <div>
                    <h2 className="text-xl font-bold mb-1">{t('kitchenToolsTitle')}</h2>
                    <p className="text-text-secondary mb-6">{t('kitchenToolsSubtitle')}</p>
                    <div className="grid grid-cols-3 gap-3">
                        {tools.map(toolKey => (
                            <button key={toolKey} onClick={() => handleToolToggle(t(toolKey))} className={`py-3 border rounded-lg transition-colors text-center ${settings.availableTools.includes(t(toolKey)) ? 'border-brand-primary bg-brand-light' : 'border-line-light bg-surface'}`}>
                                {t(toolKey)}
                            </button>
                        ))}
                    </div>
                 </div>
             );
        case 6: // Initial Ingredients
             const groupedIngredients = COMMON_INGREDIENTS.reduce((acc, ing) => {
                const category = getIngredientCategory(ing);
                if (!acc[category]) acc[category] = [];
                acc[category].push(ing);
                return acc;
            }, {} as Record<string, string[]>);

            return (
                <div className="flex flex-col h-full">
                    <h2 className="text-xl font-bold mb-1">{t('initialIngredientsTitle')}</h2>
                    <p className="text-text-secondary mb-6">{t('initialIngredientsSubtitle')}</p>
                    
                    <div className="relative mb-4">
                        <label className="text-sm font-bold text-text-secondary block mb-1">{t('addCustomIngredient')}</label>
                        <input 
                            type="text"
                            value={customIngredientSearch}
                            onChange={handleCustomSearchChange}
                            placeholder={t('customIngredientPlaceholder')}
                            className="w-full bg-surface border border-line-light rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                        />
                        {searchSuggestions.length > 0 && (
                            <ul className="absolute z-10 w-full mt-1 border border-line-light rounded-lg max-h-48 overflow-y-auto bg-surface shadow-lg">
                                {searchSuggestions.map(ing => (
                                    <li key={ing.en}>
                                        <button onClick={() => handleSuggestionSelect(ing.en)} className="w-full text-left p-2 text-sm text-text-primary hover:bg-brand-light">
                                            {getIngredientTranslation(ing.en, language)}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="mb-4 p-3 border border-line-light rounded-xl bg-surface min-h-[80px] max-h-32 overflow-y-auto">
                        <h3 className="text-sm font-bold text-text-secondary mb-2">{t('selectedIngredients')}</h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedInitialIngredients.length === 0 ? (
                                <p className="text-sm text-text-secondary">{t('selectIngredientsPlaceholder')}</p>
                            ) : (
                                selectedInitialIngredients.map(ing => (
                                    <div key={ing} className="bg-brand-primary text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm animate-fade-in">
                                        <span>{getIngredientTranslation(ing, language)}</span>
                                        <button onClick={() => handleInitialIngredientToggle(ing)} className="opacity-75 hover:opacity-100">
                                            <XIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    
                    <div className="overflow-y-auto flex-grow">
                        {Object.entries(groupedIngredients).map(([category, ingredients]) => (
                            <div key={category} className="mb-4">
                                <h3 className="font-bold text-text-primary mb-2">{t(category as any)}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {ingredients.map(ing => (
                                        <button 
                                            key={ing}
                                            onClick={() => handleInitialIngredientToggle(ing)}
                                            className={`px-3 py-1.5 border rounded-lg text-sm transition-colors ${selectedInitialIngredients.includes(ing) ? 'border-brand-primary bg-brand-light' : 'border-line-light bg-surface'}`}>
                                            {getIngredientTranslation(ing, language)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background p-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={step === 1 ? onBack : handlePrev} className="text-text-primary text-lg">
          ← {t('previous')}
        </button>
        <span className="text-text-secondary">{step}/{totalSteps}</span>
      </div>
      <ProgressBar step={step} totalSteps={totalSteps} />
      
      <div className="flex-grow my-8 overflow-y-hidden">
        {renderStep()}
      </div>

      <div className="mt-auto">
        {step < totalSteps ? (
          <button onClick={handleNext} className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl">
            {t('next')}
          </button>
        ) : (
          <button onClick={handleFinish} className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl">
            {t('finish')}
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;