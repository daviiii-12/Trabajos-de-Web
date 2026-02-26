import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, FileText, Calendar, MessageCircle, Send, User, Bot, 
  CheckCircle, FileJson, AlertTriangle, Clock, Activity, Settings, 
  RefreshCw, GitMerge, Terminal, Truck, BookOpen
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('live_chat');
  const [mensaje, setMensaje] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  
  // Estado Complejo del Simulador
  const [chat, setChat] = useState([
    { sender: 'bot', text: '¡Hola! Soy Victoria, tu agente legal autónomo. ¿En qué puedo ayudarte hoy?', time: '10:00 AM' }
  ]);
  
  const [jsonOutput, setJsonOutput] = useState('{\n  "estado": "ESCUCHANDO_WEBHOOKS",\n  "entidades": {}\n}');
  const [logs, setLogs] = useState(['[SISTEMA] Conexión API Funnelchat establecida...', '[SISTEMA] Motor NLP spaCy cargado.']);

  // Auto-scroll en el chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat, isTyping]);

  const addLog = (newLog) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${newLog}`]);
  };

  const enviarMensaje = (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;
    
    // 1. Mensaje del Usuario
    const userMsg = mensaje;
    setChat(prev => [...prev, { sender: 'user', text: userMsg, time: 'Ahora' }]);
    setMensaje('');
    setIsTyping(true);
    addLog(`POST /webhook/funnelchat - Mensaje recibido: "${userMsg.substring(0, 20)}..."`);

    // 2. Simulando Triaje y Extracción (1.5 segundos)
    setTimeout(() => {
      setJsonOutput(`{
  "tipo_documento": "Acuerdo de Confidencialidad",
  "riesgo_legal": "BAJO",
  "estado_triaje": "AUTO_RESOLUBLE",
  "entidades_extraidas": {
    "empresa": "Detectada",
    "nit": "Validando con API RUES..."
  }
}`);
      addLog(`[NLP] Analizando intenciones y extrayendo entidades (spaCy).`);
    }, 1500);

    // 3. Respuesta de Victoria (3 segundos)
    setTimeout(() => {
      setIsTyping(false);
      setChat(prev => [...prev, { 
        sender: 'bot', 
        text: 'He clasificado tu solicitud como un Acuerdo de Confidencialidad de bajo riesgo. Estoy conectándome con el CRM para validar los datos y generar el documento en PDF.', 
        time: 'Ahora' 
      }]);
      setJsonOutput(`{
  "tipo_documento": "Acuerdo de Confidencialidad",
  "riesgo_legal": "BAJO",
  "estado_triaje": "COMPLETO",
  "entidades_extraidas": {
    "empresa": "TechCorp S.A.S",
    "nit": "900.123.456-7",
    "representante": "Validado"
  },
  "accion_api": "RENDER_PDF"
}`);
      addLog(`[API] GET /crm/clientes?nit=900123456 - 200 OK`);
      addLog(`[EJECUCIÓN] Renderizando PDF con plantilla inamovible v2.1...`);
    }, 3500);
    
    // 4. Cierre y Seguimiento (5 segundos)
    setTimeout(() => {
      addLog(`[WEBHOOK] POST /funnelchat/send_pdf - Documento enviado a WhatsApp.`);
      addLog(`[CRON] Evento creado en calendario para seguimiento en 5 días.`);
    }, 5000);
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-800">
      
      {/* SIDEBAR B2B MEJORADO */}
      <div className="w-72 bg-slate-900 text-slate-300 flex flex-col shadow-2xl z-20">
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center gap-4">
          <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-900/50">
            <Shield className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-widest text-white">VICTORIA</h1>
            <p className="text-[10px] text-blue-400 font-bold tracking-widest uppercase mt-1">Motor Autónomo B2B</p>
          </div>
        </div>
        
        <div className="px-6 py-4 border-b border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Servidor FastAPI</span>
            <span className="text-slate-500">22ms</span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-3">
          <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-4">Demo Hackathon</p>
          <button onClick={() => setActiveTab('live_chat')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${activeTab === 'live_chat' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'}`}>
            <MessageCircle size={18} /> Simulador Interactivo
          </button>
          
          <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-6">Centro de Mando</p>
          <button onClick={() => setActiveTab('triaje')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${activeTab === 'triaje' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Activity size={18} /> Bandeja de Triaje (NLP)
          </button>
          <button onClick={() => setActiveTab('aprendizaje')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${activeTab === 'aprendizaje' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'}`}>
            <BookOpen size={18} /> RLHF / Aprendizaje
          </button>
          <button onClick={() => setActiveTab('logistica')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${activeTab === 'logistica' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Truck size={18} /> Logística & Tiempos
          </button>
        </nav>

        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold border-2 border-slate-800">
              AB
            </div>
            <div>
              <p className="text-sm font-bold text-white">Firma Partner</p>
              <p className="text-xs text-slate-500">Plan Enterprise (Ilimitado)</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50 relative">
        
        {/* TOP HEADER */}
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              {activeTab === 'live_chat' && 'Simulación End-to-End: Extracción y Ejecución'}
              {activeTab === 'triaje' && 'Bandeja de Operaciones: Casos Activos'}
              {activeTab === 'aprendizaje' && 'Centro de Re-entrenamiento del Modelo Legal'}
              {activeTab === 'logistica' && 'Radar Logístico y Envíos Físicos'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">Supervisión en tiempo real de agentes autónomos.</p>
          </div>
          <div className="flex gap-3">
            <span className="flex items-center gap-2 text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full font-bold border border-emerald-200">
              <RefreshCw size={14} className="animate-spin" /> Conectado a Funnelchat
            </span>
          </div>
        </header>

        {/* CONTENIDO DINÁMICO DE PESTAÑAS */}
        <main className="flex-1 overflow-auto p-6">

          {/* ---------------- PESTAÑA 1: SIMULADOR (EL PITCH PRINCIPAL) ---------------- */}
          {activeTab === 'live_chat' && (
            <div className="flex flex-col h-full gap-6">
              {/* Arriba: Chat y JSON */}
              <div className="flex gap-6 h-3/5">
                
                {/* WHATSAPP MOCK */}
                <div className="w-1/2 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                  <div className="bg-[#075E54] p-4 text-white flex justify-between items-center shadow-md z-10">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-full"><User size={20} /></div>
                      <div>
                        <h3 className="font-bold text-sm">Cliente PyME (WhatsApp)</h3>
                        <p className="text-[10px] text-emerald-100">En línea</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 bg-[#efeae2] space-y-4" style={{backgroundImage: "url('https://i.pinimg.com/originals/8f/ba/cb/8fbacbd464e996966eb9d4a6b7a9c21e.jpg')", backgroundBlendMode: 'overlay', backgroundColor: 'rgba(239, 234, 226, 0.9)'}}>
                    {chat.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-2 shadow-sm relative ${msg.sender === 'user' ? 'bg-[#d9fdd3] text-slate-800 rounded-tr-sm' : 'bg-white text-slate-800 rounded-tl-sm border border-slate-100'}`}>
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                          <div className="flex justify-end gap-1 items-center mt-1">
                            <span className="text-[10px] text-slate-400">{msg.time}</span>
                            {msg.sender === 'user' && <CheckCircle size={10} className="text-blue-500"/>}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex gap-1 items-center">
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  <form onSubmit={enviarMensaje} className="bg-[#f0f2f5] p-3 flex gap-2 border-t border-slate-200">
                    <input type="text" value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Ej: Necesito demandar a alguien..." className="flex-1 rounded-full px-5 py-2.5 border-none focus:ring-2 focus:ring-emerald-500 shadow-sm text-sm outline-none" disabled={isTyping} />
                    <button type="submit" disabled={isTyping} className="bg-[#00a884] text-white p-3 rounded-full hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-50">
                      <Send size={18} />
                    </button>
                  </form>
                </div>

                {/* JSON CEREBRO */}
                <div className="w-1/2 bg-[#0d1117] rounded-2xl shadow-sm border border-slate-800 flex flex-col overflow-hidden">
                  <div className="bg-[#161b22] p-4 flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <FileJson className="text-blue-400" size={18} />
                      <h3 className="text-white font-bold text-sm">Output Motor NLP (Backend Python)</h3>
                    </div>
                    <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded border border-blue-500/30 font-mono">JSON.stringify()</span>
                  </div>
                  <div className="p-4 overflow-y-auto flex-1">
                    <pre className="text-[#7ee787] font-mono text-sm leading-relaxed whitespace-pre-wrap">{jsonOutput}</pre>
                  </div>
                </div>

              </div>

              {/* Abajo: Terminal Logs */}
              <div className="bg-black rounded-2xl shadow-sm border border-slate-800 flex flex-col h-2/5 overflow-hidden">
                <div className="bg-slate-900 p-3 flex items-center gap-2 border-b border-slate-800">
                  <Terminal className="text-slate-400" size={16} />
                  <h3 className="text-slate-300 font-bold text-xs uppercase tracking-wider">Log de Ejecución / Webhooks en Vivo</h3>
                </div>
                <div className="p-4 overflow-y-auto font-mono text-xs space-y-1.5 flex-1">
                  {logs.map((log, i) => (
                    <div key={i} className={`${log.includes('POST') ? 'text-blue-400' : log.includes('NLP') ? 'text-purple-400' : log.includes('API') ? 'text-green-400' : 'text-slate-400'}`}>
                      {log}
                    </div>
                  ))}
                  {isTyping && <div className="text-slate-500 animate-pulse">_</div>}
                </div>
              </div>
            </div>
          )}

          {/* ---------------- PESTAÑA 2: TRIAJE (TABLA) ---------------- */}
          {activeTab === 'triaje' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-lg">Casos Entrantes vía Funnelchat</h3>
                <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex gap-2 items-center hover:bg-slate-50">
                  <Settings size={16}/> Configurar Reglas
                </button>
              </div>
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-100 text-slate-500 text-xs uppercase font-bold tracking-wider">
                  <tr>
                    <th className="p-4 border-b">ID / Ref</th>
                    <th className="p-4 border-b">Cliente Entidad</th>
                    <th className="p-4 border-b">Tipo Clasificado</th>
                    <th className="p-4 border-b">Riesgo IA</th>
                    <th className="p-4 border-b">Estado Victoria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono text-slate-500">#FC-0089</td>
                    <td className="p-4 font-bold text-slate-800">Inversiones Valle S.A.</td>
                    <td className="p-4">Cobro Pre-Jurídico</td>
                    <td className="p-4"><span className="bg-yellow-100 text-yellow-700 border border-yellow-200 px-2.5 py-1 rounded-full text-xs font-bold">MEDIO</span></td>
                    <td className="p-4"><span className="flex items-center gap-2 text-blue-600 font-medium"><RefreshCw size={14} className="animate-spin"/> Generando PDF</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors bg-red-50/30">
                    <td className="p-4 font-mono text-slate-500">#FC-0090</td>
                    <td className="p-4 font-bold text-slate-800">Carlos Restrepo</td>
                    <td className="p-4">Tutela de Salud</td>
                    <td className="p-4"><span className="bg-red-100 text-red-700 border border-red-200 px-2.5 py-1 rounded-full text-xs font-bold">ALTO</span></td>
                    <td className="p-4"><span className="flex items-center gap-2 text-red-600 font-bold"><AlertTriangle size={14}/> Escala a Abogado</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* ---------------- PESTAÑA 3: APRENDIZAJE (PAOLA) ---------------- */}
          {activeTab === 'aprendizaje' && (
            <div className="grid grid-cols-2 gap-6 h-full">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><GitMerge className="text-purple-600"/> Corrección de Borradores</h3>
                <p className="text-sm text-slate-500 mb-6">Si Victoria comete un error, el abogado lo corrige aquí. El modelo vectorial asimila el cambio para no repetirlo.</p>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl font-serif text-sm flex-1 mb-6 leading-relaxed relative">
                  <span className="absolute top-2 right-2 bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-1 rounded">V2.0 Autogenerada</span>
                  <p>...se acuerda que la penalidad por incumplimiento será de <span className="bg-red-200 line-through px-1">$5,000,000</span> <span className="bg-green-200 px-1 font-bold cursor-pointer border-b-2 border-green-500" title="Corregido por abogado: Paola">10 Salarios Mínimos Legales</span>, pagaderos a los...</p>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl shadow-md transition-all flex justify-center items-center gap-2">
                  <RefreshCw size={18} /> Inyectar a Base Vectorial (Re-entrenar)
                </button>
              </div>
              <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-6 flex flex-col justify-center items-center text-center">
                <BookOpen className="text-slate-600 mb-4" size={64}/>
                <h3 className="text-white font-bold text-xl mb-2">Modelo Adaptativo Activo</h3>
                <p className="text-slate-400 text-sm max-w-sm">Victoria ha aprendido de 142 correcciones humanas este mes. La tasa de precisión documental actual es del 98.4%.</p>
              </div>
            </div>
          )}

          {/* ---------------- PESTAÑA 4: LOGÍSTICA ---------------- */}
          {activeTab === 'logistica' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 h-full flex flex-col justify-center items-center text-center">
                <Truck className="text-slate-300 mb-6" size={80}/>
                <h2 className="text-2xl font-bold text-slate-700 mb-3">Módulo Logístico y API de Envíos</h2>
                <p className="text-slate-500 max-w-md mx-auto mb-8">Victoria está programada para disparar alertas y generar guías de Servientrega automáticamente cuando el sistema detecta vencimientos de radicación física.</p>
                <div className="flex gap-4">
                  <span className="bg-slate-100 border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2"><Calendar size={18}/> 3 Vencimientos Hoy</span>
                  <span className="bg-blue-50 border border-blue-200 text-blue-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2"><CheckCircle size={18}/> 12 PDFs Firmados</span>
                </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}