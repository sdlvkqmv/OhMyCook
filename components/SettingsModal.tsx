
import React, { useState } from 'react';
import { UserSettings } from '../types';
import { XIcon } from './icons';
import { useLanguage } from '../context/LanguageContext';

interface SettingsModalProps {
  initialSettings: UserSettings;
  onSave: (settings: UserSettings) => void;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ initialSettings, onSave, onClose }) => {
  const [settings, setSettings] = useState<UserSettings>(initialSettings);
  const { t } = useLanguage();

  const handleSave = () => {
    onSave(settings);
    onClose();
  };
  
  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof UserSettings) => {
    const value = e.target.value;
    const currentValues = settings[field] as string[];
    if (e.target.checked) {
      setSettings(prev => ({...prev, [field]: [...currentValues, value]}));
    } else {
      setSettings(prev => ({...prev, [field]: currentValues.filter(item => item !== value)}));
    }
  };

  const cookingLevels: UserSettings['cookingLevel'][] = ['Beginner', 'Intermediate', 'Advanced'];
  const cookingLevelKeys = {
    'Beginner': 'beginner',
    'Intermediate': 'intermediate',
    'Advanced': 'advanced'
  } as const;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 font-sans animate-fade-in">
      <div className="bg-white dark:bg-[#1C1C1C] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative border border-gray-200 dark:border-gray-800 animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
          <XIcon className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">{t('yourCookingProfile')}</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">{t('personalizeRecommendations')}</p>
        
        <div className="space-y-6">
          {/* Cooking Level */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('cookingLevel')}</label>
            <div className="flex space-x-4">
              {cookingLevels.map(level => (
                <button key={level} onClick={() => setSettings({...settings, cookingLevel: level})} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${settings.cookingLevel === level ? 'bg-brand-primary text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-brand-primary/20'}`}>
                  {t(cookingLevelKeys[level])}
                </button>
              ))}
            </div>
          </div>

          {/* Max Cook Time */}
           <div>
            <label htmlFor="maxCookTime" className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('maxCookingTime', { time: settings.maxCookTime })}</label>
            <input
              id="maxCookTime"
              type="range"
              min="10"
              max="120"
              step="5"
              value={settings.maxCookTime}
              onChange={(e) => setSettings({...settings, maxCookTime: parseInt(e.target.value, 10)})}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-brand-primary"
            />
          </div>

          {/* Available Tools */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('availableTools')}</label>
            <div className="flex flex-wrap gap-2">
              {['Microwave', 'Air Fryer', 'Oven', 'Blender', 'Instant Pot'].map(tool => (
                <label key={tool} className="flex items-center space-x-2 cursor-pointer bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
                  <input type="checkbox" value={tool} checked={settings.availableTools.includes(tool)} onChange={e => handleMultiSelectChange(e, 'availableTools')} className="form-checkbox h-4 w-4 text-brand-primary rounded focus:ring-brand-primary/50 bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{tool}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Text input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <label htmlFor="allergies" className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('allergies')}</label>
              <input type="text" id="allergies" value={settings.allergies.join(', ')} onChange={e => setSettings({...settings, allergies: e.target.value.split(',').map(s => s.trim())})} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
            </div>
            <div className="w-full">
                <label htmlFor="dislikedIngredients" className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('dislikedIngredients')}</label>
                <input type="text" id="dislikedIngredients" value={settings.dislikedIngredients.join(', ')} onChange={e => setSettings({...settings, dislikedIngredients: e.target.value.split(',').map(s => s.trim())})} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
            </div>
            <div className="w-full md:col-span-2">
                <label htmlFor="preferredCuisines" className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('preferredCuisines')}</label>
                <input type="text" id="preferredCuisines" value={settings.preferredCuisines.join(', ')} onChange={e => setSettings({...settings, preferredCuisines: e.target.value.split(',').map(s => s.trim())})} className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-brand-primary focus:outline-none" placeholder={t('preferredCuisinesPlaceholder')} />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button onClick={handleSave} className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            {t('savePreferences')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
