


import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { UserSettings, Ingredient, ShoppingListItem, Recipe, User } from './types';
import Header from './components/Header';
import IngredientManager from './components/IngredientManager';
import RecipeRecommendations from './components/RecipeRecommendations';
import AIChef from './components/AIChef';
import PopularRecipes from './components/PopularRecipes';
import Onboarding from './components/Onboarding';
import ShoppingList from './components/ShoppingList';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { LogoIcon, ProfileIcon, FridgeIcon, SpatulaIcon, ChatBubbleIcon, TrendingUpIcon, ShoppingCartIcon, BookmarkIcon } from './components/icons';
import { INGREDIENT_DATA } from './data/ingredients';
import Spinner from './components/Spinner';
import SavedRecipes from './components/SavedRecipes';
import Auth from './components/Auth';

const defaultSettings: UserSettings = {
  cookingLevel: 'Beginner',
  allergies: [],
  preferredCuisines: [],
  dislikedIngredients: [],
  availableTools: [],
  spicinessPreference: 3,
  maxCookTime: 30,
};

type View = 'home' | 'onboarding' | 'ingredients' | 'recommendations' | 'chat' | 'popular' | 'shoppingList' | 'savedRecipes' | 'auth';


const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
  });
};

// Receipt Scanner Page Component Removed
// const ReceiptScanner: React.FC ... 


const HomeHeader: React.FC<{
  currentUser: User | null;
  onNavigate: (view: View) => void;
  onLogout: () => void;
}> = ({ currentUser, onNavigate, onLogout }) => {
  const { t, language, setLanguage } = useLanguage();
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
            <LogoIcon className="w-7 h-7" />
          </div>
          <span className="font-bold text-xl text-text-primary">{t('mainTitle')}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')} className="text-xs font-bold text-text-secondary bg-surface border border-line-light px-2 py-1 rounded-md">
            {language === 'en' ? 'KO' : 'EN'}
          </button>
          {currentUser ? (
            <>
              <button onClick={() => onNavigate('onboarding')} className="text-text-primary p-2" title={t('profileTitle')}><ProfileIcon className="w-6 h-6" /></button>
              <button onClick={() => onNavigate('savedRecipes')} className="text-text-primary p-2" title={t('savedRecipesTitle')}><BookmarkIcon className="w-6 h-6" /></button>
              <button onClick={() => onNavigate('shoppingList')} className="text-text-primary p-2" title={t('shoppingListTitle')}><ShoppingCartIcon className="w-6 h-6" /></button>
              <button onClick={onLogout} className="text-sm bg-gray-200 px-3 py-1.5 rounded-md font-semibold">{t('logout')}</button>
            </>
          ) : (
            <button onClick={() => onNavigate('auth')} className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg">
              {t('login')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};


// Home Screen Component
const HomeScreen: React.FC<{ onNavigate: (view: View) => void, currentUser: User | null }> = ({ onNavigate, currentUser }) => {
  const { t } = useLanguage();

  const menuItems = [
    { view: 'ingredients', icon: FridgeIcon, title: t('ingredientsTitle'), subtitle: t('ingredientsSubtitle') },
    { view: 'recommendations', icon: SpatulaIcon, title: t('recommendationsTitle'), subtitle: t('recommendationsSubtitle') },
    { view: 'popular', icon: TrendingUpIcon, title: t('popularTitle'), subtitle: t('popularSubtitle') },
    { view: 'chat', icon: ChatBubbleIcon, title: t('chatTitle'), subtitle: t('chatSubtitle') },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="text-center my-8">
        <h1 className="text-3xl font-bold text-text-primary">{currentUser ? t('welcomeUser', { email: currentUser.email.split('@')[0] }) : t('mainTitle')}</h1>
        <p className="text-text-secondary mt-2">{t('mainSubtitle')}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {menuItems.map(item => (
          <button key={item.view} onClick={() => onNavigate(item.view as View)} className="bg-surface p-4 rounded-2xl shadow-subtle text-left hover:scale-105 transition-transform duration-200">
            <item.icon className="w-14 h-14 p-3 bg-brand-light text-brand-primary rounded-xl mb-4" />
            <h2 className="font-bold text-text-primary">{item.title}</h2>
            <p className="text-xs text-text-secondary mt-1">{item.subtitle}</p>
          </button>
        ))}
      </div>
      <footer className="text-center py-8 mt-8">
        <p className="text-sm text-text-secondary">{t('homeFooter')}</p>
      </footer>
    </div>
  );
};

// Main App Content Component
const AppContent: React.FC = () => {
  const [settings, setSettings] = useLocalStorage<UserSettings>('ohmycook-settings', defaultSettings);
  const [ingredients, setIngredients] = useLocalStorage<Ingredient[]>('ohmycook-ingredients', []);
  const [shoppingList, setShoppingList] = useLocalStorage<ShoppingListItem[]>('ohmycook-shoppinglist', []);
  const [savedRecipes, setSavedRecipes] = useLocalStorage<Recipe[]>('ohmycook-savedrecipes', []);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const [currentView, setCurrentView] = useState<View>('home');
  const [previousView, setPreviousView] = useState<View>('home');
  const [chatContext, setChatContext] = useState<Recipe | null>(null);

  const [users, setUsers] = useLocalStorage<User[]>('ohmycook-users', []);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('ohmycook-currentUser', null);

  const { language, t } = useLanguage();

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t('appTitle');
  }, [language, t]);

  const handleNavigate = (view: View) => {
    setPreviousView(currentView);
    setCurrentView(view);
  };

  const handleStartChat = (recipe: Recipe) => {
    setChatContext(recipe);
    handleNavigate('chat');
  };

  const handleSaveSettings = (newSettings: UserSettings, initialIngredients: string[] = []) => {
    setSettings(newSettings);

    if (initialIngredients.length > 0) {
      const currentIngredientNames = new Set(ingredients.map(i => i.name));
      const newIngredientsToAdd = initialIngredients
        .filter(name => !currentIngredientNames.has(name))
        .map(name => ({ name, quantity: t('basicUnit') }));

      setIngredients(prev => [...prev, ...newIngredientsToAdd]);
    }

    // Mark onboarding as complete for the current user
    if (currentUser && !currentUser.hasCompletedOnboarding) {
      const updatedUsers = users.map(user =>
        user.email === currentUser.email
          ? { ...user, hasCompletedOnboarding: true }
          : user
      );
      setUsers(updatedUsers);

      // Also update the currentUser state to reflect the change immediately
      setCurrentUser(prevUser => (prevUser ? { ...prevUser, hasCompletedOnboarding: true } : null));
    }

    setCurrentView('home');
  };



  const handleToggleShoppingListItem = (itemName: string) => {
    setShoppingList(prev => {
      const exists = prev.some(item => item.name === itemName);
      if (exists) {
        return prev.filter(item => item.name !== itemName);
      } else {
        return [...prev, { name: itemName }];
      }
    });
  };

  const handleToggleSaveRecipe = (recipeToToggle: Recipe) => {
    setSavedRecipes(prev => {
      const exists = prev.some(r => r.recipeName === recipeToToggle.recipeName);
      if (exists) {
        return prev.filter(r => r.recipeName !== recipeToToggle.recipeName);
      } else {
        return [...prev, recipeToToggle];
      }
    });
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.hasCompletedOnboarding) {
      setCurrentView('home');
    } else {
      setCurrentView('onboarding');
    }
  };

  const handleSignup = (newUser: Pick<User, 'email' | 'password'>) => {
    setUsers(prev => [...prev, { ...newUser, hasCompletedOnboarding: false }]);
    // Go back to auth view for user to log in
    setCurrentView('auth');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const renderView = () => {
    if (isInitialLoad) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;

    switch (currentView) {
      case 'auth':
        return <Auth onLogin={handleLogin} onSignup={handleSignup} users={users} onBack={() => setCurrentView('home')} />;
      case 'onboarding':
        return <Onboarding initialSettings={settings} onSave={handleSaveSettings} onBack={() => setCurrentView(currentUser ? 'home' : 'auth')} />;
      case 'ingredients':
        return <IngredientManager ingredients={ingredients} setIngredients={setIngredients} onBack={() => setCurrentView('home')} />;
      case 'recommendations':
        return <RecipeRecommendations
          ingredients={ingredients}
          onBack={() => setCurrentView('home')}
          shoppingList={shoppingList}
          onToggleShoppingListItem={handleToggleShoppingListItem}
          savedRecipes={savedRecipes}
          onToggleSaveRecipe={handleToggleSaveRecipe}
          onStartChat={handleStartChat}
        />;
      case 'chat':
        return <AIChef
          settings={settings}
          onBack={() => { setCurrentView(previousView); setChatContext(null); }}
          recipeContext={chatContext}
        />;
      case 'popular':
        return <PopularRecipes
          onBack={() => setCurrentView('home')}
          shoppingList={shoppingList}
          onToggleShoppingListItem={handleToggleShoppingListItem}
          savedRecipes={savedRecipes}
          onToggleSaveRecipe={handleToggleSaveRecipe}
          onStartChat={handleStartChat}
        />;

      case 'shoppingList':
        return <ShoppingList shoppingList={shoppingList} setShoppingList={setShoppingList} onBack={() => setCurrentView('home')} />;
      case 'savedRecipes':
        return <SavedRecipes
          savedRecipes={savedRecipes}
          onBack={() => setCurrentView('home')}
          shoppingList={shoppingList}
          onToggleShoppingListItem={handleToggleShoppingListItem}
          onToggleSaveRecipe={handleToggleSaveRecipe}
          onStartChat={handleStartChat}
        />;
      case 'home':
      default:
        return (
          <>
            <HomeHeader currentUser={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} />
            <HomeScreen onNavigate={handleNavigate} currentUser={currentUser} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans transition-colors duration-300 max-w-lg mx-auto">
      {renderView()}
    </div>
  );
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;