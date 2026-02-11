
import React, { useState, useEffect } from 'react';
import { View, Product, VideoProject } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProductDiscovery from './components/ProductDiscovery';
import SavedProducts from './components/SavedProducts';
import Wizard from './components/Wizard';
import Editor from './components/Editor';
import History from './components/History';
import Branding from './components/Branding';
import LandingPage from './components/LandingPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [videoHistory, setVideoHistory] = useState<VideoProject[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeProject, setActiveProject] = useState<VideoProject | null>(null);
  const [isTikTokConnected, setIsTikTokConnected] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const checkApiKey = async () => {
      // @ts-ignore
      if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        // @ts-ignore
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      }
    };
    checkApiKey();
  }, []);

  const handleOpenKeyDialog = async () => {
    // @ts-ignore
    if (window.aistudio && window.aistudio.openSelectKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const connectTikTok = () => {
    setIsTikTokConnected(true);
  };

  const toggleSaveProduct = (product: Product) => {
    setSavedProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  const startWizard = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView(View.WIZARD);
  };

  const finishWizard = (project: VideoProject) => {
    setActiveProject(project);
    setVideoHistory(prev => [project, ...prev]);
    setCurrentView(View.EDITOR);
  };

  // Lógica de visualização para usuários não autenticados (Landing e Legal)
  if (!isAuthenticated) {
    if (currentView === View.PRIVACY_POLICY) {
      return <PrivacyPolicy onBack={() => setCurrentView(View.DASHBOARD)} />;
    }
    if (currentView === View.TERMS_OF_SERVICE) {
      return <TermsOfService onBack={() => setCurrentView(View.DASHBOARD)} />;
    }
    return <LandingPage onStart={() => setIsAuthenticated(true)} onNavigate={setCurrentView} />;
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100 selection:bg-pink-500/30">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isTikTokConnected={isTikTokConnected} 
        hasApiKey={hasApiKey}
        onActivateKey={handleOpenKeyDialog}
      />
      
      <main className="flex-1 overflow-y-auto pb-24 lg:pb-0">
        <div className="max-w-7xl mx-auto p-4 md:p-10">
          {currentView === View.DASHBOARD && (
            <Dashboard 
              onNewVideo={() => setCurrentView(View.PRODUCT_DISCOVERY)} 
              videoCount={videoHistory.length}
              savedCount={savedProducts.length}
              history={videoHistory}
              isTikTokConnected={isTikTokConnected}
              onConnect={connectTikTok}
              hasApiKey={hasApiKey}
              onActivateKey={handleOpenKeyDialog}
            />
          )}
          {currentView === View.PRODUCT_DISCOVERY && (
            <ProductDiscovery 
              onSave={toggleSaveProduct} 
              savedProducts={savedProducts} 
              onSelect={startWizard} 
            />
          )}
          {currentView === View.SAVED_PRODUCTS && (
            <SavedProducts 
              products={savedProducts} 
              onRemove={toggleSaveProduct} 
              onSelect={startWizard} 
            />
          )}
          {currentView === View.WIZARD && selectedProduct && (
            <Wizard 
              product={selectedProduct} 
              onComplete={finishWizard} 
              onCancel={() => setCurrentView(View.PRODUCT_DISCOVERY)}
            />
          )}
          {currentView === View.EDITOR && activeProject && (
            <Editor 
              project={activeProject} 
              onBack={() => setCurrentView(View.HISTORY)} 
            />
          )}
          {currentView === View.HISTORY && (
            <History 
              projects={videoHistory} 
              onEdit={(p) => { setActiveProject(p); setCurrentView(View.EDITOR); }} 
            />
          )}
          {currentView === View.BRANDING && (
            <Branding />
          )}
          {(currentView === View.PRIVACY_POLICY) && (
            <PrivacyPolicy onBack={() => setCurrentView(View.DASHBOARD)} />
          )}
          {(currentView === View.TERMS_OF_SERVICE) && (
            <TermsOfService onBack={() => setCurrentView(View.DASHBOARD)} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
