

import React, { useState } from 'react';
import { UserSettings } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { FireIcon, XIcon, SearchIcon } from './icons';
import { COMMON_INGREDIENTS, getIngredientCategory, getIngredientTranslation, ALL_INGREDIENTS, INGREDIENT_CATEGORIES, getIngredientEmoji } from '../data/ingredients';

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
    ).slice(0, 20);
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
            setSettings({ ...settings, allergies: currentAllergies.filter(a => a !== allergy) });
          } else {
            setSettings({ ...settings, allergies: [...currentAllergies, allergy] });
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
                <button key={s.level} onClick={() => setSettings(prev => ({ ...prev, spicinessPreference: s.level }))}>
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
                  onClick={() => setSettings({ ...settings, maxCookTime: option.value })}
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
            setSettings({ ...settings, availableTools: currentTools.filter(a => a !== tool) });
          } else {
            setSettings({ ...settings, availableTools: [...currentTools, tool] });
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
      case 6: // Initial Ingredients
        return (
          <div className="flex flex-col h-full">
            <h2 className="text-xl font-bold mb-1">{t('ingredientManagerTitle')}</h2>
            <div className="p-4 pb-0 px-0">
              <div className="relative mb-4">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  value={customIngredientSearch}
                  onChange={handleCustomSearchChange}
                  placeholder={t('searchIngredients')}
                  className="w-full bg-surface border border-line-light rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                />
                {searchSuggestions.length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 border border-line-light rounded-lg max-h-60 overflow-y-auto bg-surface shadow-lg">
                    {INGREDIENT_CATEGORIES.map(category => {
                      const categorySuggestions = searchSuggestions.filter(ing => getIngredientCategory(ing.en) === category);
                      if (categorySuggestions.length === 0) return null;

                      return (
                        <React.Fragment key={category}>
                          <li className="px-3 py-1 bg-brand-light/50 text-xs font-bold text-text-secondary uppercase">
                            {t(category as any)}
                          </li>
                          {categorySuggestions.map(ing => (
                            <li key={ing.en}>
                              <button onClick={() => handleSuggestionSelect(ing.en)} className="w-full text-left p-2 pl-4 text-sm text-text-primary hover:bg-brand-light flex items-center gap-2">
                                <span>{getIngredientEmoji(ing.en)}</span>
                                <span>{getIngredientTranslation(ing.en, language)}</span>
                              </button>
                            </li>
                          ))}
                        </React.Fragment>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>

            <div className="flex-grow overflow-y-auto pr-2">
              {selectedInitialIngredients.length === 0 ? (
                <div className="text-center text-text-secondary mt-10">
                  <span className="text-6xl block mb-4 grayscale opacity-50">🥗</span>
                  <p className="text-lg font-medium">{customIngredientSearch ? t('noSearchResults') : t('pleaseAddIngredients')}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {INGREDIENT_CATEGORIES.map(category => {
                    const categoryIngredients = selectedInitialIngredients.filter(ing => getIngredientCategory(ing) === category);
                    if (categoryIngredients.length === 0) return null;

                    return (
                      <div key={category}>
                        <h3 className="text-sm font-bold text-text-secondary uppercase mb-3 ml-1">
                          {t(category as any)}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {categoryIngredients.map(ing => (
                            <div key={ing} className="bg-surface border border-line-light rounded-full pl-3 pr-2 py-2 shadow-sm flex items-center gap-2 animate-fade-in">
                              <span className="text-lg leading-none">{getIngredientEmoji(ing)}</span>
                              <span className="font-semibold text-text-primary text-sm whitespace-nowrap">
                                {getIngredientTranslation(ing, language)}
                              </span>
                              <button
                                onClick={() => handleInitialIngredientToggle(ing)}
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