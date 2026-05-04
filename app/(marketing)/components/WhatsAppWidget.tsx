'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';


const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER; 
  console.log("WhatsApp Widget Phone Number:", phoneNumber); // Debug log
  const message = "Hello! I'd like to learn more about your services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-72 overflow-hidden rounded-2xl bg-white shadow-2xl border border-emerald-100"
          >
            {/* Header */}
            <div className="bg-emerald-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                      W
                    </div>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-emerald-600 bg-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Support Team</p>
                    <p className="text-xs opacity-90">Typically replies in minutes</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 hover:bg-emerald-700 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="bg-emerald-50 p-4">
              <div className="inline-block rounded-lg bg-white p-3 shadow-sm">
                <p className="text-sm text-slate-700">
                  Hi there! 👋 How can we help you today?
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="bg-white p-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95"
              >
                <MessageCircle size={18} />
                Start Chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-colors hover:bg-emerald-600"
        aria-label="Contact us on WhatsApp"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
};

export default WhatsAppWidget;