import React, { useState } from 'react';
import { Shield, FileText, Calendar, MessageCircle, Send, User, Bot, CheckCircle, FileJson } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('live_chat');
  const [mensaje, setMensaje] = useState('');
  
  // Estado simulado del chat
  const [chat, setChat] = useState([
    { sender: 'bot', text: '¡Hola! Soy Victoria, tu asistente legal B2B. ¿En qué te puedo ayudar hoy?' }
  ]);

  // Simular envío de mensaje
  const enviarMensaje = (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;
    
    setChat([...chat, { sender: 'user', text: mensaje }]);
    setMensaje('');
    
    // Simular respuesta de Victoria después de 1 segundo
    setTimeout(() => {
      setChat(prev => [...prev, { 
        sender: 'bot', 
        text: 'He procesado tu solicitud. Estoy extrayendo los datos para generar el Acuerdo de Confidencialidad.' 
      }]);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* SIDEBAR CORPORATIVO */}
      <div className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-10">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <Shield className="text-blue-400" size={32} />
          <div>
            <h1 className="text-xl font-bold tracking-wider">VICTORIA</h1>
            <p className="text-xs text-slate-400">Powered by Funnelchat</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('live_chat')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${activeTab === 'live_chat' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
            <MessageCircle size={20} />
            <span>Simulador Interactivo</span>
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
            <FileText size={20} />
            <span>Bandeja B2B</span>
          </button>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shrink-0">
          <h2 className="text-2xl font-bold text-slate-800">
            {activeTab === 'live_chat' && 'Demostración en Vivo: Cliente vs Victoria'}
            {activeTab === 'dashboard' && 'Panel de Control del Abogado'}
          </h2>
          <span className="flex items-center gap-2 text-sm bg-green-100 text-green-700 px-4 py-1.5 rounded-full font-bold shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 
            Conectado a Funnelchat
          </span>
        </header>

        {/* PESTAÑA PRINCIPAL: CHAT + CEREBRO */}
        {activeTab === 'live_chat' && (
          <div className="flex-1 flex overflow-hidden p-6 gap-6 bg-slate-100">
            
            {/* COLUMNA IZQUIERDA: EL CHAT DEL CLIENTE */}
            <div className="w-1/2 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-emerald-600 p-4 text-white flex items-center gap-3 shadow-md z-10">
                <div className="bg-white/20 p-2 rounded-full"><User size={20} /></div>
                <div>
                  <h3 className="font-bold">WhatsApp / Funnelchat</h3>
                  <p className="text-xs text-emerald-100">Vista del Cliente (PyME)</p>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 bg-[#efeae2] space-y-4">
                {chat.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm relative ${msg.sender === 'user' ? 'bg-[#d9fdd3] text-slate-800 rounded-tr-sm' : 'bg-white text-slate-800 rounded-tl-sm'}`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <span className="text-[10px] text-slate-400 block text-right mt-1">Ahora</span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={enviarMensaje} className="bg-[#f0f2f5] p-4 flex gap-2">
                <input 
                  type="text" 
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Escribe como si fueras el cliente (Ej: Necesito un contrato rápido...)"
                  className="flex-1 rounded-full px-6 py-3 border-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                />
                <button type="submit" className="bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 transition-colors shadow-sm">
                  <Send size={20} />
                </button>
              </form>
            </div>

            {/* COLUMNA DERECHA: EL CEREBRO DE VICTORIA */}
            <div className="w-1/2 flex flex-col gap-6">
              
              {/* Tarjeta de Extracción JSON */}
              <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 flex flex-col h-1/2 overflow-hidden">
                <div className="bg-slate-950 p-4 flex items-center gap-2 border-b border-slate-800">
                  <FileJson className="text-blue-400" size={20} />
                  <h3 className="text-white font-bold">Motor NLP: Datos Extraídos</h3>
                </div>
                <div className="p-6 overflow-y-auto">
                  <p className="text-slate-400 text-sm mb-4">El backend en Python está escuchando el chat y estructurando esto en tiempo real:</p>
                  <pre className="text-green-400 font-mono text-sm leading-relaxed">
{chat.length > 1 ? `{
  "tipo_documento": "NDA",
  "riesgo_legal": "BAJO",
  "accion_requerida": "Generar PDF",
  "entidades": {
    "empresa": "Detectando...",
    "nit": "Detectando..."
  },
  "estado": "PROCESANDO"
}` : `{
  "estado": "ESPERANDO_MENSAJE"
}`}
                  </pre>
                </div>
              </div>

              {/* Tarjeta de Ejecución y Plantilla */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-1/2 overflow-hidden">
                <div className="bg-slate-50 p-4 flex items-center gap-2 border-b border-slate-200">
                  <FileText className="text-blue-600" size={20} />
                  <h3 className="font-bold text-slate-800">Ejecución Documental (Plantilla)</h3>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-center items-center text-center">
                  {chat.length > 2 ? (
                    <>
                      <CheckCircle className="text-green-500 mb-3" size={48} />
                      <h4 className="font-bold text-lg mb-2">Acuerdo de Confidencialidad Generado</h4>
                      <p className="text-sm text-slate-500 mb-4">El contrato ha sido renderizado e inyectado vía webhook a Funnelchat.</p>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-blue-700">
                        Ver PDF Final
                      </button>
                    </>
                  ) : (
                    <p className="text-slate-400 italic">Esperando datos completos para renderizar el documento...</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* PESTAÑA 2: MANTENEMOS EL DASHBOARD VIEJO SOLO POR SI ACASO */}
        {activeTab === 'dashboard' && (
           <div className="flex-1 p-8 flex items-center justify-center">
             <div className="text-center">
               <Shield className="text-slate-300 mx-auto mb-4" size={64}/>
               <h2 className="text-2xl font-bold text-slate-400">Bandeja de Entrada B2B</h2>
               <p className="text-slate-500 mt-2">Usa el simulador para hacer la demostración principal.</p>
             </div>
           </div>
        )}

      </div>
    </div>
  );
}