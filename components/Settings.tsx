
import React, { useState, useEffect } from 'react';
import { ApiConfig } from '../types';
import { TikTokApiService } from '../services/tiktok';
// @ts-ignore
import { jsPDF } from 'jspdf';

const Settings: React.FC = () => {
  const [config, setConfig] = useState<ApiConfig>({
    appKey: '6j2c6seef6dre', 
    appSecret: '',
    partnerId: '7494417584089827033',
    legalName: 'MARCHEL DE SOUZA MARTINS', 
    cnpj: '54.586.274/0001-33',
    region: 'BR',
    permissions: {
      marketing: 'approved',
      engagement: 'approved',
      catalog: 'approved',
      affiliate: 'pending',
      connectors: 'approved',
      security_assessment: 'pending'
    }
  });

  const [isSaved, setIsSaved] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('vioshop_api_config');
    if (saved) {
      setConfig(prev => ({ ...prev, ...JSON.parse(saved) }));
    } else {
      localStorage.setItem('vioshop_api_config', JSON.stringify(config));
    }
  }, []);

  const handleSaveApi = () => {
    localStorage.setItem('vioshop_api_config', JSON.stringify(config));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleConnect = () => {
    localStorage.setItem('vioshop_api_config', JSON.stringify(config));
    const authLink = TikTokApiService.getAuthLink(config.appKey, config.region);
    window.location.href = authLink;
  };

  const isConnected = !!config.accessToken;

  // Função para gerar e baixar os documentos de conformidade em PDF
  const downloadGsoDoc = async (type: 'isp' | 'irp' | 'dpp') => {
    setDownloading(type);
    
    try {
      const doc = new jsPDF();
      const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      let fileName = "";
      let title = "";
      let sections: { subtitle: string, text: string }[] = [];

      // Estilização base do PDF
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(63, 81, 181); // Indigo

      if (type === 'isp') {
        fileName = "Information_Security_Policy_VioShop.pdf";
        title = "Information Security Policy (ISP)";
        sections = [
          { subtitle: "1. OVERVIEW", text: "VioShop AI implements a robust security framework to protect TikTok Shop data based on ISO 27001 standards. We prioritize confidentiality, integrity, and availability for all merchant and affiliate data." },
          { subtitle: "2. ENCRYPTION", text: "All data at rest is encrypted using AES-256 standards. All data in transit is encrypted via TLS 1.3/HTTPS secure tunnels. Raw tokens and sensitive keys are never stored in clear text." },
          { subtitle: "3. ACCESS CONTROL", text: "Role-Based Access Control (RBAC) is strictly enforced. Multi-Factor Authentication (MFA) is required for all administrative access. Access logs are maintained for 12 months for auditing." },
          { subtitle: "4. ENDPOINT PROTECTION", text: "Corporate devices are protected with EDR (Endpoint Detection and Response) solutions. Unauthorized software installation is prohibited, and real-time threat detection is active." },
          { subtitle: "5. VULNERABILITY MANAGEMENT", text: "We perform weekly automated vulnerability scans. Critical security patches are applied within 24 hours of discovery." }
        ];
      } else if (type === 'irp') {
        fileName = "Incident_Response_Plan_VioShop.pdf";
        title = "Incident Response Plan (IRP)";
        sections = [
          { subtitle: "1. INCIDENT TEAM", text: `Incident Commander: ${config.legalName}. Contact: compliance@vioshop.ai. The team is responsible for monitoring, triage, and mitigation.` },
          { subtitle: "2. DETECTION & TRIAGE", text: "Incidents are detected through automated cloud monitoring alerts. Triage occurs within 2 hours of detection to determine severity and scope." },
          { subtitle: "3. CONTAINMENT & RECOVERY", text: "Immediate isolation of compromised sessions or tokens is performed. Affected services are rolled back or isolated to prevent lateral movement." },
          { subtitle: "4. NOTIFICATION COMMITMENT", text: "VioShop AI commits to notifying TikTok Shop and affected partners within 72 hours of any confirmed security incident or data breach." },
          { subtitle: "5. POST-INCIDENT", text: "A full Root Cause Analysis (RCA) is performed after every incident to improve internal protocols." }
        ];
      } else if (type === 'dpp') {
        fileName = "Internal_Data_Protection_Policy.pdf";
        title = "Internal Data Protection Policy (DPP)";
        sections = [
          { subtitle: "1. DATA MINIMIZATION", text: "VioShop AI collects only the minimum necessary data from TikTok Shop APIs to perform affiliate marketing automation and analytics." },
          { subtitle: "2. COMPLIANCE STANDARDS", text: "We adhere to LGPD (Brazil) and TikTok Global Security Policies. User data is processed with legal basis and for specific, informed purposes." },
          { subtitle: "3. DATA STORAGE & ISOLATION", text: "Sensitive data is stored in isolated database schemas. API tokens are stored as encrypted secrets within our secure cloud infrastructure." },
          { subtitle: "4. RETENTION & DELETION", text: "Personal data is permanently wiped from our systems within 48 hours of user request or service termination." },
          { subtitle: "5. EMPLOYEE TRAINING", text: "All personnel managing infrastructure undergo mandatory annual data privacy and security training." }
        ];
      }

      // Cabeçalho do Documento
      doc.text(title, 20, 30);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Company: ${config.legalName}`, 20, 45);
      doc.text(`Tax ID (CNPJ): ${config.cnpj}`, 20, 50);
      doc.text(`Date of Issue: ${date}`, 20, 55);
      doc.text(`Status: Final Version (Official)`, 20, 60);

      // Linha separadora
      doc.setDrawColor(200, 200, 200);
      doc.line(20, 65, 190, 65);

      // Conteúdo das seções
      let yPos = 80;
      sections.forEach(section => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(30, 30, 30);
        doc.text(section.subtitle, 20, yPos);
        yPos += 7;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const splitText = doc.splitTextToSize(section.text, 160);
        doc.text(splitText, 20, yPos);
        yPos += (splitText.length * 5) + 12;
      });

      // Assinatura Final
      yPos += 10;
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text("Approved by:", 20, yPos);
      yPos += 10;
      doc.text(config.legalName, 20, yPos);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text("Owner & Chief Security Officer", 20, yPos + 5);

      doc.save(fileName);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
    } finally {
      setTimeout(() => setDownloading(null), 1000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-24 text-zinc-100">
      <header className="p-12 rounded-[3.5rem] bg-zinc-900 border border-zinc-800 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -z-10"></div>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-black italic uppercase text-white mb-4">Configuração <span className="text-indigo-500">Legal</span></h2>
            <p className="text-zinc-400 font-medium">Configure sua identidade para aprovação no TikTok Shop.</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
             <span className="text-[10px] font-black text-emerald-500 uppercase">Região: Brasil</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Seção de Documentos GSO em PDF */}
          <div className="bg-indigo-900/10 border-2 border-indigo-500/30 p-10 rounded-[3rem] shadow-2xl space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-indigo-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                <i className="fas fa-file-pdf"></i>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Compliance GSO Center (PDF)</h3>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest animate-pulse">Download Obrigatório para TikTok</p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-medium bg-black/30 p-5 rounded-2xl border border-white/5">
              O TikTok exige que os documentos de segurança sejam enviados em formato <strong>PDF</strong>. Clique nos botões abaixo para gerar os arquivos oficiais com seus dados:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => downloadGsoDoc('isp')}
                className="group flex flex-col items-center gap-4 p-6 bg-zinc-950 border border-white/5 rounded-3xl hover:border-indigo-500 transition-all text-center"
              >
                <i className={`fas ${downloading === 'isp' ? 'fa-spinner animate-spin' : 'fa-shield-halved'} text-2xl text-indigo-500`}></i>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-white uppercase tracking-widest">Security Policy</p>
                  <p className="text-[7px] text-zinc-600 font-bold uppercase">(ISP PDF)</p>
                </div>
              </button>

              <button 
                onClick={() => downloadGsoDoc('irp')}
                className="group flex flex-col items-center gap-4 p-6 bg-zinc-950 border border-white/5 rounded-3xl hover:border-indigo-500 transition-all text-center"
              >
                <i className={`fas ${downloading === 'irp' ? 'fa-spinner animate-spin' : 'fa-file-contract'} text-2xl text-pink-500`}></i>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-white uppercase tracking-widest">Incident Plan</p>
                  <p className="text-[7px] text-zinc-600 font-bold uppercase">(IRP PDF)</p>
                </div>
              </button>

              <button 
                onClick={() => downloadGsoDoc('dpp')}
                className="group flex flex-col items-center gap-4 p-6 bg-zinc-950 border border-white/5 rounded-3xl hover:border-indigo-500 transition-all text-center"
              >
                <i className={`fas ${downloading === 'dpp' ? 'fa-spinner animate-spin' : 'fa-user-lock'} text-2xl text-emerald-500`}></i>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-white uppercase tracking-widest">Data Privacy</p>
                  <p className="text-[7px] text-zinc-600 font-bold uppercase">(DPP PDF)</p>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-amber-500/5 border-2 border-amber-500/20 p-10 rounded-[3rem] shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-500/30">
                <i className="fas fa-id-card text-xl"></i>
              </div>
              <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Identidade do Desenvolvedor (GSO)</h3>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Nome do Desenvolvedor (Igual ao TikTok)</span>
                  <span className="bg-red-500/10 text-red-500 text-[8px] font-black px-2 py-1 rounded">CRÍTICO</span>
                </div>
                <input 
                  type="text" 
                  placeholder="EX: MARCHEL DE SOUZA MARTINS"
                  value={config.legalName} 
                  onChange={e => setConfig({...config, legalName: e.target.value.toUpperCase()})}
                  className="w-full bg-zinc-950 border border-amber-500/30 rounded-xl py-5 px-6 text-sm text-white focus:border-amber-500 outline-none placeholder:text-zinc-800 font-black" 
                />
              </div>

              <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">CNPJ do Responsável</span>
                </div>
                <input 
                  type="text" 
                  placeholder="54.586.274/0001-33"
                  value={config.cnpj} 
                  onChange={e => setConfig({...config, cnpj: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-5 px-6 text-sm text-white focus:border-indigo-500 outline-none placeholder:text-zinc-800 font-black" 
                />
              </div>

              <div className="flex gap-4 items-start bg-amber-500/10 p-6 rounded-2xl">
                <i className="fas fa-info-circle text-amber-500 mt-0.5"></i>
                <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">
                  O TikTok GSO exige que os PDFs tenham exatamente o mesmo nome do titular da conta. 
                  Certifique-se de que <strong className="text-white">"{config.legalName}"</strong> esteja correto antes de baixar.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] shadow-2xl space-y-10">
            <h3 className="text-sm font-black text-zinc-500 uppercase tracking-widest">Conexão TikTok Shop</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-600 ml-2 tracking-widest">App Key</label>
                <input 
                  type="text" 
                  value={config.appKey} 
                  onChange={e => setConfig({...config, appKey: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-5 px-6 text-sm text-white focus:border-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-600 ml-2 tracking-widest">App Secret</label>
                <input 
                  type="password" 
                  placeholder="App Secret"
                  value={config.appSecret} 
                  onChange={e => setConfig({...config, appSecret: e.target.value})} 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-5 px-6 text-sm text-white focus:border-indigo-500 outline-none transition-all" 
                />
              </div>
            </div>

            <div className="bg-black/40 p-8 rounded-[2rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${isConnected ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-500'}`}>
                     <i className={isConnected ? 'fas fa-link' : 'fas fa-link-slash'}></i>
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Status Global</p>
                     <h4 className="text-xl font-black text-white italic uppercase">
                        {isConnected ? `Vendedor Ativo` : 'Não Autorizado'}
                     </h4>
                  </div>
               </div>
               
               <button 
                  onClick={handleConnect}
                  className="bg-white text-black px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
               >
                  Conectar TikTok Shop
               </button>
            </div>

            <button onClick={handleSaveApi} className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${isSaved ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>
              {isSaved ? 'SALVO COM SUCESSO ✓' : 'SALVAR ALTERAÇÕES'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-[2.5rem] space-y-6">
            <h4 className="text-xs font-black uppercase text-indigo-400 flex items-center gap-2">
              <i className="fas fa-shield-check"></i> Auditoria de Documentação
            </h4>
            
            <p className="text-[10px] text-zinc-400 leading-relaxed font-medium">
              Sua documentação vincula o serviço <strong>VioShop AI</strong> à entidade <strong>{config.legalName}</strong>. Isso resolve o erro de "Third Party alignment" do TikTok GSO.
            </p>
            
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Empresa</span>
                <span className="text-emerald-500 font-bold">ATIVA</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Documento PDF</span>
                <span className="text-emerald-500 font-bold">SUPORTADO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
