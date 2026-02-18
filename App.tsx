
import React, { useState, useEffect } from 'react';
import { View, Product, VideoProject } from './types';
import { StorageService } from './services/storage';
import { getSupabaseClient } from './services/supabase';
import { TikTokApiService } from './services/tiktok';
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
  const [authStatus, setAuthStatus] = useState<string | null>(null);

  useEffect(() => {
    // Lógica de Roteamento por URL (Crucial para Aprovação TikTok GSO)
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    const code = urlParams.get('code');
    
    // 1. Se o link for direto para políticas (usado no cadastro do TikTok)
    if (page === 'privacy') {
      setCurrentView(View.PRIVACY_POLICY);
      setIsInitializing(false);
      return;
    }
    if (page === 'terms') {
      setCurrentView(View.TERMS_OF_SERVICE);
      setIsInitializing(false);
      return;
    }

    // 2. Detectar retorno da autorização do TikTok
    if (code) {
      setAuthStatus('Finalizando conexão com TikTok Shop...');
      setCurrentView(View.SETTINGS);
      
      TikTokApiService.exchangeCodeForToken(code)
        .then(() => {
          setAuthStatus('Conectado com sucesso!');
          window.history.replaceState({}, document.title, window.location.pathname);
          setTimeout(() => setAuthStatus(null), 5000);
        })
        .catch(err => {
          setAuthStatus(`Erro: ${err.message}`);
          setTimeout(() => setAuthStatus(null), 8000);
        });
    }

    const supabase = getSupabaseClient();
    const timer = setInterval(() => {
      setInitProgress(prev => (prev >= 100 ? 100 : prev + 5));
    }, 80);

    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        // Só muda a view se não houver um parâmetro de página legal forçado
        if (!page) setTimeout(() => setIsInitializing(false), 2000);
      }).catch(() => {
        if (!page) setTimeout(() => setIsInitializing(false), 2000);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        if (!session && !page) {
          setCurrentView(View.LANDING);
          setShowAuth(false);
        }
      });

      return () => {
        subscription.unsubscribe();
        clearInterval(timer);
      };
    } else {
      if (!page) setTimeout(() => setIsInitializing(false), 2000);
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
              <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${initProgress}%` }}></div>
           </div>
           <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest animate-pulse">Sincronizando Módulos TikTok Shop...</p>
        </div>
      </div>
    );
  }

  if (currentView === View.PRIVACY_POLICY) return <PrivacyPolicy onBack={() => {
    // Se estiver em uma URL parametrizada, limpa a URL ao voltar
    if (window.location.search.includes('page=privacy')) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    setCurrentView(session ? View.DASHBOARD : View.LANDING);
  }} />;

  if (currentView === View.TERMS_OF_SERVICE) return <TermsOfService onBack={() => {
    if (window.location.search.includes('page=terms')) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    setCurrentView(session ? View.DASHBOARD : View.LANDING);
  }} />;

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
        {authStatus && (
          <div className="bg-indigo-600 text-white py-3 px-6 text-center text-[10px] font-black uppercase tracking-widest animate-in slide-in-from-top duration-500 flex items-center justify-center gap-4">
            <i className="fas fa-circle-notch animate-spin"></i>
            {authStatus}
          </div>
        )}
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
