import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, User, Bot, Star, MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { salons } from '../data/salons';

const AIAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isBot: boolean; salons?: typeof salons }[]>([
    { text: "Hello! I'm your AI Beauty Assistant. Ask me about salons, services, or pricing!", isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const prompts = [
    'Best bridal makeup salon under ₹2000',
    'Cheapest hair spa near me',
    'Top rated salon for facial',
    'Bridal package recommendations',
  ];

  const find = (query: string) => {
    const q = query.toLowerCase();
    let results = salons;
    if (q.includes('best') || q.includes('top')) results = [...salons].sort((a, b) => b.rating - a.rating);
    if (q.includes('cheapest') || q.includes('budget')) results = [...salons].sort((a, b) => a.startingPrice - b.startingPrice);
    if (q.includes('bridal')) results = results.filter(s => s.services.some(sv => sv.category === 'bridal-makeup'));
    if (q.includes('spa')) results = results.filter(s => s.services.some(sv => sv.category === 'hair-spa'));
    if (q.includes('facial')) results = results.filter(s => s.services.some(sv => sv.category === 'facial'));
    const match = q.match(/under\s*₹?(\d+)/);
    if (match) { const max = parseInt(match[1]); results = results.filter(s => s.startingPrice <= max); }
    return results.slice(0, 5);
  };

  const send = async (msg: string) => {
    if (!msg.trim()) return;
    setMessages(p => [...p, { text: msg, isBot: false }]);
    setInput('');
    setTyping(true);
    await new Promise(r => setTimeout(r, 1000));
    setTyping(false);
    const results = find(msg);
    setMessages(p => [...p, { text: `Found ${results.length} salons for you:`, isBot: true, salons: results }]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="bg-white dark:bg-surface border-b flex-shrink-0">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl flex items-center justify-center"><Sparkles className="w-5 h-5 text-white" /></div>
          <div><h1 className="font-semibold text-gray-800 dark:text-white">AI Beauty Assistant</h1><p className="text-xs text-gray-500">Powered by SalonAI</p></div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.isBot ? '' : 'justify-end'}`}>
              {m.isBot && <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-500 rounded-lg flex items-center justify-center flex-shrink-0"><Bot className="w-4 h-4 text-white" /></div>}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${m.isBot ? 'bg-white dark:bg-surface shadow-sm' : 'bg-primary-400 text-white'}`}>
                <p className="text-sm whitespace-pre-line">{m.text}</p>
                {m.salons && m.salons.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {m.salons.map(s => (
                      <Link key={s.id} to={`/salon/${s.slug}`} className="block p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100">
                        <div className="flex items-start gap-3">
                          <img src={s.images[0]} alt={s.name} className="w-16 h-16 rounded-lg object-cover" />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 dark:text-white flex items-center gap-2">{s.name}</h4>
                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500"><Star className="w-3 h-3 text-amber-400 fill-current" />{s.rating}<span>•</span><MapPin className="w-3 h-3" />{s.area}</div>
                            <div className="flex items-center justify-between mt-2"><span className="text-sm font-semibold text-primary-400">From ₹{s.startingPrice}</span><ChevronRight className="w-4 h-4 text-gray-400" /></div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {!m.isBot && <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0"><User className="w-4 h-4 text-gray-500" /></div>}
            </div>
          ))}
          {typing && <div className="flex gap-3"><div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-500 rounded-lg flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div><div className="bg-white dark:bg-surface rounded-2xl px-4 py-3 shadow-sm"><div className="flex gap-1"><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} /><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} /><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} /></div></div></div>}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {messages.length <= 2 && (
        <div className="max-w-3xl mx-auto px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">{prompts.slice(0, 3).map(p => <button key={p} onClick={() => send(p)} className="px-3 py-1.5 bg-white dark:bg-surface border border-gray-200 rounded-full text-sm text-gray-600 hover:border-primary-400 hover:text-primary-400">{p}</button>)}</div>
        </div>
      )}
      <div className="bg-white dark:bg-surface border-t flex-shrink-0">
        <div className="max-w-3xl mx-auto p-4">
          <form onSubmit={e => { e.preventDefault(); send(input); }} className="flex gap-3">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask me about salons..." className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400" />
            <button type="submit" disabled={!input.trim()} className="w-12 h-12 bg-primary-400 rounded-xl flex items-center justify-center text-white disabled:opacity-50"><Send className="w-5 h-5" /></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
