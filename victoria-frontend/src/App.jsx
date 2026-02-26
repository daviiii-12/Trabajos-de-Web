import React, { useState } from 'react';
import { Shield, FileText, Calendar, MessageCircle, AlertTriangle, CheckCircle, Clock, RefreshCw, Send } from 'lucide-react';
import './index.css'
export default function App() {
  const [activeTab, setActiveTab] = useState('triaje');

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* SIDEBAR */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <Shield className="text-blue-400" size={32} />
          <div>
            <h1 className="text-xl font-bold tracking-wider">VICTORIA</h1>
            <p className="text-xs text-slate-400">LegalTech B2B</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('triaje')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'triaje' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
            <MessageCircle size={20} />
            <span>Triaje Cognitivo</span>
          </button>
          <button 
            onClick={() => setActiveTab('escribiente')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'escribiente' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
            <FileText size={20} />
            <span>Escribiente Digital</span>
          </button>
          <button 
            onClick={() => setActiveTab('seguimiento')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'seguimiento' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
            <Calendar size={20} />
            <span>Agenda y Envíos</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">A</div>
            <div className="text-sm">
              <p className="font-semibold">Perfil Abogado</p>
              <p className="text-slate-400 text-xs">Firma Partner</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">
            {activeTab === 'triaje' && 'Bandeja de Entrada (NLP)'}
            {activeTab === 'escribiente' && 'Revisión Documental y Aprobación'}
            {activeTab === 'seguimiento' && 'Radar de Vencimientos'}
          </h2>
          <div className="flex gap-4">
            <span className="flex items-center gap-2 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
              <CheckCircle size={16} /> API Conectada
            </span>
            <span className="flex items-center gap-2 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              <RefreshCw size={16} /> Funnelchat Activo
            </span>
          </div>
        </header>

        <main className="p-8">
          {/* TAB 1: TRIAJE */}
          {activeTab === 'triaje' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 text-sm">
                  <tr>
                    <th className="p-4">ID Caso</th>
                    <th className="p-4">Cliente (WhatsApp)</th>
                    <th className="p-4">Tipo Identificado</th>
                    <th className="p-4">Riesgo / Prioridad</th>
                    <th className="p-4">Estado Victoria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm text-gray-500">#FC-001</td>
                    <td className="p-4 font-medium">TechCorp S.A.S.</td>
                    <td className="p-4">Acuerdo Confidencialidad</td>
                    <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">BAJO</span></td>
                    <td className="p-4"><span className="flex items-center gap-2 text-blue-600 text-sm"><CheckCircle size={16}/> Auto-Resuelto</span></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm text-gray-500">#FC-002</td>
                    <td className="p-4 font-medium">Constructora Gómez</td>
                    <td className="p-4">Requerimiento DIAN</td>
                    <td className="p-4"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">ALTO</span></td>
                    <td className="p-4"><span className="flex items-center gap-2 text-orange-600 text-sm"><AlertTriangle size={16}/> Escala a Abogado</span></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm text-gray-500">#FC-003</td>
                    <td className="p-4 font-medium">Distribuidora Valle</td>
                    <td className="p-4">Cobro Pre-Jurídico</td>
                    <td className="p-4"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">MEDIO</span></td>
                    <td className="p-4"><span className="flex items-center gap-2 text-gray-600 text-sm"><Clock size={16}/> Extrayendo Datos</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: ESCRIBIENTE */}
          {activeTab === 'escribiente' && (
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column: Data extracted */}
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <MessageCircle className="text-blue-500" /> Chat Funnelchat
                  </h3>
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4 text-sm">
                    <p className="text-slate-500 mb-1 font-semibold">Cliente:</p>
                    <p>"Hola, voy a contratar un desarrollador y necesito un NDA rápido. La empresa es TechCorp S.A.S., NIT 900.123.456-7. El representante legal soy yo, Juan Pérez."</p>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-4 mt-6">JSON Extraído (Motor NLP)</h3>
                  <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-auto">
{`{
  "tipo_documento": "NDA",
  "partes": {
    "empresa": "TechCorp S.A.S.",
    "nit": "900.123.456-7",
    "representante": "Juan Pérez"
  },
  "estado_variables": "COMPLETO"
}`}
                  </pre>
                </div>
              </div>

              {/* Right Column: Document & Actions */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col">
                <h3 className="text-lg font-bold mb-4">Vista Previa (Plantilla Inamovible)</h3>
                <div className="flex-1 bg-gray-50 border border-gray-200 p-8 rounded-lg mb-6 overflow-auto font-serif text-sm">
                  <h2 className="text-center font-bold mb-6">ACUERDO DE CONFIDENCIALIDAD (NDA)</h2>
                  <p className="mb-4 text-justify">
                    Entre los suscritos a saber: Por una parte, [LA FIRMA LEGAL], y por la otra <span className="bg-yellow-200 px-1 font-bold">TECHCORP S.A.S.</span>, identificada con NIT <span className="bg-yellow-200 px-1 font-bold">900.123.456-7</span>, representada legalmente por <span className="bg-yellow-200 px-1 font-bold">JUAN PÉREZ</span>, acuerdan mantener la más estricta confidencialidad sobre la información técnica y comercial compartida...
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2 transition-colors">
                    <Send size={18} /> Aprobar y Enviar PDF a WhatsApp
                  </button>
                  <button className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-lg font-bold transition-colors">
                    Corregir y Re-entrenar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SEGUIMIENTO */}
          {activeTab === 'seguimiento' && (
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-red-100 p-3 rounded-lg"><AlertTriangle className="text-red-600" /></div>
                  <span className="text-xs font-bold text-red-600 bg-red-200 px-2 py-1 rounded">HOY 14:00</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Envío Servientrega</h3>
                <p className="text-sm text-slate-600 mb-4">Radicar Derecho de Petición físico EPS Sanitas.</p>
                <button className="w-full bg-white text-red-600 border border-red-200 py-2 rounded font-semibold text-sm hover:bg-red-50">Imprimir Guía</button>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg"><CheckCircle className="text-blue-600" /></div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-200 px-2 py-1 rounded">MAÑANA</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Firma Electrónica</h3>
                <p className="text-sm text-slate-600 mb-4">Hacer ping a TechCorp por contrato NDA pendiente en WhatsApp.</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold text-sm hover:bg-blue-700">Programar Webhook</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}