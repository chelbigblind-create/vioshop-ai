import React, { useState, useEffect } from 'react';
import { View, Product, VideoProject } from './types';
import { StorageService } from './services/storage';
import { getSupabaseClient } from './services/supabase';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProductDiscovery from './components/ProductDiscovery';
import SavedProducts from './components/SavedProducts';
import Wizard from './components/Wizard';
import Editor from './components/Editor';
import History from './components/History';
import Branding from './components/Branding';
import Settings from './components/Settings';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [initProgress, setInitProgress] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.LANDING);
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [videoHistory, setVideoHistory] = useState<VideoProject[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeProject, setActiveProject] = useState<VideoProject | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

  // Monitorar Sessão Supabase
  useEffect(() => {
    const supabase = getSupabaseClient();
    
    // Simulação de progresso de inicialização para feedback visual de que mudou!
    const timer = setInterval(() => {
      setInitProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setTimeout(() => setIsInitializing(false), 2000);
      }).catch(() => {
        setTimeout(() => setIsInitializing(false), 2000);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        if (!session) {
          setCurrentView(View.LANDING);
          setShowAuth(false);
        }
      });

      return () => {
        subscription.unsubscribe();
        clearInterval(timer);
      };
    } else {
      setTimeout(() => setIsInitializing(false), 2000);
    }
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      const products = await StorageService.getSavedProducts();
      const history = await StorageService.getVideoHistory();
      setSavedProducts(products);
      setVideoHistory(history);
    };

    if (session) {
      loadInitialData();
    }

    const checkApiKey = async () => {
      // Usando a definição global de index.tsx para acesso tipado seguro
      if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      }
    };
    checkApiKey();
  }, [session]);

  const handleOpenKeyDialog = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
      await window.aistudio.openSelectKey();
      // Conforme as diretrizes, assumimos sucesso imediatamente para evitar condições de corrida ao trocar de chave
      setHasApiKey(true);
    }
  };

  const toggleSaveProduct = async (product: Product) => {
    const isSaved = savedProducts.find(p => p.id === product.id);
    if (isSaved) {
      const updated = savedProducts.filter(p => p.id !== product.id);
      setSavedProducts(updated);
    } else {
      const updated = await StorageService.saveProduct(product);
      setSavedProducts(updated);
    }
  };

  const startWizard = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView(View.WIZARD);
  };

  const finishWizard = async (project: VideoProject) => {
    setActiveProject(project);
    const updatedHistory = await StorageService.saveVideo(project);
    setVideoHistory(updatedHistory);
    setCurrentView(View.EDITOR);
  };

  const handleLogout = async () => {
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.auth.signOut();
      localStorage.removeItem('vioshop_saved_products');
      localStorage.removeItem('vioshop_video_history');
      setSession(null);
      setShowAuth(false);
      setCurrentView(View.LANDING);
    }
  };

  const handleStartApp = () => {
    if (session) {
      setCurrentView(View.DASHBOARD);
    } else {
      setShowAuth(true);
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-10">
        <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(236,72,153,0.3)] animate-pulse">
          <i className="fas fa-bolt text-white text-4xl"></i>
        </div>
        <div className="w-full max-w-xs space-y-4 text-center">
           <p className="text-[10px] font-black text-white uppercase tracking-[0.5em] mb-2">VioShop Engine v2.5</p>
           <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
              <div className="h-full bg-pink-500 transition-all duration-300" style={{ width: `${initProgress}%` }}></div>
           </div>
           <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest animate-pulse">Estabelecendo conexão segura...</p>
        </div>
      </div>
    );
  }

  if (currentView === View.PRIVACY_POLICY) return <PrivacyPolicy onBack={() => setCurrentView(View.LANDING)} />;
  if (currentView === View.TERMS_OF_SERVICE) return <TermsOfService onBack={() => setCurrentView(View.LANDING)} />;

  if (currentView === View.LANDING && !showAuth) {
    return (
      <LandingPage 
        onStart={handleStartApp} 
        onNavigate={setCurrentView} 
        isLoggedIn={!!session} 
        userEmail={session?.user?.email}
        onLogout={handleLogout}
      />
    );
  }

  if (showAuth && !session) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950">
        <button onClick={() => setShowAuth(false)} className="absolute top-10 left-10 text-zinc-500 hover:text-white flex items-center gap-2 font-bold text-xs uppercase tracking-widest transition-all">
          <i className="fas fa-arrow-left"></i> Voltar
        </button>
        <Auth onSession={(s) => { setSession(s); setShowAuth(false); setCurrentView(View.DASHBOARD); }} />
      </div>
    );
  }

  if (!session) {
    return (
      <LandingPage 
        onStart={handleStartApp} 
        onNavigate={setCurrentView} 
        isLoggedIn={false} 
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-zinc-100 selection:bg-pink-500/30">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        hasApiKey={hasApiKey}
        onActivateKey={handleOpenKeyDialog}
        user={session?.user}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 overflow-y-auto pb-24 lg:pb-0 scroll-smooth">
        <div className="max-w-7xl mx-auto p-4 md:p-12">
          {currentView === View.DASHBOARD && (
            <Dashboard 
              onNewVideo={() => setCurrentView(View.PRODUCT_DISCOVERY)} 
              videoCount={videoHistory.length}
              savedCount={savedProducts.length}
              history={videoHistory}
              hasApiKey={hasApiKey}
              onActivateKey={handleOpenKeyDialog}
              isCloudSync={true}
            />
          )}
          {currentView === View.PRODUCT_DISCOVERY && (
            <ProductDiscovery onSave={toggleSaveProduct} savedProducts={savedProducts} onSelect={startWizard} />
          )}
          {currentView === View.SAVED_PRODUCTS && (
            <SavedProducts products={savedProducts} onRemove={toggleSaveProduct} onSelect={startWizard} />
          )}
          {currentView === View.WIZARD && selectedProduct && (
            <Wizard product={selectedProduct} onComplete={finishWizard} onCancel={() => setCurrentView(View.PRODUCT_DISCOVERY)} />
          )}
          {currentView === View.EDITOR && activeProject && (
            <Editor project={activeProject} onBack={() => setCurrentView(View.HISTORY)} />
          )}
          {currentView === View.HISTORY && (
            <History projects={videoHistory} onEdit={(p) => { setActiveProject(p); setCurrentView(View.EDITOR); }} />
          )}
          {currentView === View.BRANDING && <Branding />}
          {currentView === View.SETTINGS && <Settings />}
        </div>
      </main>
    </div>
  );
};

export default App;