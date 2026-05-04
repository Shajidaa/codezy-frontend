'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaWhatsapp, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';



const AGENT_IMAGE = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=100&h=100&auto=format&fit=crop";

export default function WhatsAppLiveWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}?text=${encodedMsg}`;
    
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-9999 flex flex-col items-end font-sans">
      
      {/* --- Chat Window --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-87.5 overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100"
          >
            {/* Header */}
            <div className="bg-[#075e54] p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white/20">
                    <img
                      src={AGENT_IMAGE} 
                      alt="Support Agent" 
                      fill 
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#075e54] bg-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">Support Team</h3>
                    <p className="text-[10px] opacity-80 text-emerald-50">Typically replies in under an hour</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 hover:bg-white/10 transition-colors"
                >
                  <FaTimes size={18} />
                </button>
              </div>
            </div>

            {/* Chat Body (WhatsApp Background Style) */}
            <div className="bg-[#e5ddd5] p-4 min-h-30 relative overflow-hidden">
               {/* Pattern overlay usually goes here */}
              <div className="relative z-10">
                <div className="inline-block bg-white px-4 py-2 rounded-xl rounded-tl-none text-sm text-gray-800 shadow-sm border border-gray-200">
                  <p>Hi there! 👋</p>
                  <p className="mt-1">How can we help you ?</p>
                </div>
              </div>
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white flex gap-2 border-t">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#25d366] outline-none transition-all"
              />
              <button 
                type="submit"
                disabled={!message.trim()}
                className="bg-[#25d366] text-white p-2.5 rounded-full hover:bg-[#128c7e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPaperPlane size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Floating Trigger Button --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center justify-center h-16 w-16 bg-[#25d366] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 overflow-visible"
      >
        {/* Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-25 group-hover:hidden" />
        
        {isOpen ? (
          <FaTimes size={28} className="rotate-0" />
        ) : (
          <FaWhatsapp size={32} />
        )}

        {/* Tooltip Label */}
        {!isOpen && (
          <span className="absolute right-20 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Need help? Chat with us!
          </span>
        )}
      </button>
    </div>
  );
}