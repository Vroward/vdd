"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TicketForm } from "@/components/TicketForm";
import { ChevronDown, MessageCircle, Send, X } from "lucide-react";

const faqs = [
  { q: "How do I download and install the loader?", a: "After purchase, go to your Client Area dashboard and click 'Downloads' on your active license. Run the loader as administrator and enter your license key when prompted." },
  { q: "What payment methods do you accept?", a: "We accept Cryptocurrency (BTC, ETH, LTC, XMR), PayPal, Credit/Debit Cards via Stripe, and CashApp." },
  { q: "Is my account and purchase information secure?", a: "Absolutely. We use industry-standard encryption and never share your information with third parties." },
  { q: "How do I get a refund?", a: "Refunds are handled on a case-by-case basis. Open a ticket to request one." },
  { q: "My game updated and the cheat stopped working. What do I do?", a: "Check the Status page for real-time updates. Your subscription time is automatically paused during downtime." },
  { q: "Can I use the same license on multiple PCs?", a: "Most products are HWID-locked to one machine. Open a ticket for an HWID reset once every 7 days." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-nv-border">
      <button onClick={() => setOpen(!open)} className="w-full py-4 flex items-center justify-between text-left text-white font-semibold hover:text-nv-pink transition-colors">
        {question}
        <ChevronDown className={`w-5 h-5 text-nv-pink transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} className="overflow-hidden">
        <p className="pb-4 text-nv-text-secondary text-sm leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
}

export default function SupportPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Welcome to Neon Vault Support! How can we help you today?" },
    { from: "bot", text: "Type your question and our team will respond shortly. Average wait time: 2 minutes." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      const responses = [
        "Thanks for reaching out! A support agent will be with you shortly.",
        "I've forwarded your message to our team. Expected response time: under 5 minutes.",
        "For faster assistance, please include your Order ID if this is about a purchase.",
        "Our team is currently online and reviewing your message.",
      ];
      setMessages((prev) => [...prev, { from: "bot", text: responses[Math.floor(Math.random() * responses.length)] }]);
    }, 1000 + Math.random() * 2000);
  };

  return (
    <div className="min-h-[80vh] px-6 py-8 max-w-[1200px] mx-auto">
      <div className="text-center py-12">
        <h1 className="font-display text-4xl font-extrabold gradient-text mb-3">Support Center</h1>
        <p className="text-nv-text-muted max-w-[500px] mx-auto">Get help with your purchases, technical issues, and account questions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-nv-card border border-nv-border rounded-[20px] p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-nv-pink to-nv-purple" />
          <h3 className="font-display text-lg font-bold mb-6 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-nv-pink" /> Frequently Asked Questions
          </h3>
          <div>{faqs.map((faq) => (<FAQItem key={faq.q} question={faq.q} answer={faq.a} />))}</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-nv-card border border-nv-border rounded-[20px] p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-nv-pink to-nv-purple" />
          <h3 className="font-display text-lg font-bold mb-6 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-nv-pink" /> Submit a Ticket
          </h3>
          <TicketForm />
        </motion.div>
      </div>

      <div className="fixed bottom-6 right-6 z-[999]">
        {chatOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute bottom-16 right-0 w-[350px] bg-nv-card border border-nv-border rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="p-4 bg-gradient-to-r from-nv-pink to-nv-purple flex items-center justify-between">
              <h4 className="font-semibold text-sm">Live Support</h4>
              <button onClick={() => setChatOpen(false)} className="text-white hover:text-white/80"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 h-[300px] overflow-y-auto flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div key={i} className={`p-3 rounded-xl text-sm max-w-[80%] leading-relaxed ${
                  msg.from === "bot" ? "bg-nv-darker text-nv-text-secondary self-start rounded-bl-sm" : "bg-gradient-to-r from-nv-pink to-nv-purple text-white self-end rounded-br-sm"
                }`}>{msg.text}</div>
              ))}
            </div>
            <div className="p-3 border-t border-nv-border flex gap-2">
              <input type="text" placeholder="Type a message..." className="flex-1 px-3 py-2 bg-nv-darker border border-nv-border rounded-lg text-sm text-white placeholder:text-nv-text-muted focus:outline-none focus:border-nv-pink"
                value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && sendMessage()} />
              <button onClick={sendMessage} className="px-3 py-2 bg-gradient-to-r from-nv-pink to-nv-purple rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
        <button onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-nv-pink to-nv-purple text-white flex items-center justify-center shadow-[0_4px_20px_rgba(255,107,157,0.4)] hover:scale-110 transition-transform">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}