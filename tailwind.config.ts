"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, CheckCircle } from "lucide-react";

export default function StatusPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/status");
      const d = await res.json();
      setData(d);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchStatus(); }, []);

  return (
    <div className="min-h-[80vh] px-6 py-8 max-w-[1000px] mx-auto">
      <div className="text-center py-12">
        <h1 className="font-display text-4xl font-extrabold gradient-text mb-3">System Status</h1>
        <p className="text-nv-text-muted">Real-time status of all our services and products.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { value: data?.overview?.online ?? 14, label: "Services Online", color: "text-nv-success" },
          { value: data?.overview?.maintenance ?? 1, label: "Maintenance", color: "text-nv-warning" },
          { value: data?.overview?.incidents ?? 0, label: "Incidents", color: "text-nv-danger" },
          { value: data?.overview?.uptime ?? "99.97%", label: "Uptime (30d)", color: "text-nv-success" },
        ].map((stat) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-nv-card border border-nv-border rounded-2xl p-5 text-center hover:border-nv-pink/30 hover:-translate-y-1 transition-all">
            <div className={`font-display text-3xl font-extrabold ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-nv-text-muted mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-nv-card border border-nv-border rounded-[20px] overflow-hidden mb-8">
        <div className="p-5 border-b border-nv-border flex items-center justify-between">
          <h3 className="font-display text-lg font-bold">Service Status</h3>
          <button onClick={fetchStatus} className={`flex items-center gap-2 px-3 py-1.5 bg-nv-darker border border-nv-border rounded-lg text-xs text-nv-text-secondary hover:border-nv-pink hover:text-nv-pink transition-all ${loading ? "animate-spin" : ""}`}>
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
        {(data?.games || []).map((game: any) => (
          <div key={game.id} className="p-4 border-b border-nv-border flex items-center justify-between hover:bg-nv-pink/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-nv-darker flex items-center justify-center text-lg">{game.icon}</div>
              <div>
                <div className="font-semibold text-sm">{game.name}</div>
                <div className="text-xs text-nv-text-muted">{game.status === "ONLINE" ? "All products operational" : "Scheduled maintenance in progress"}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${game.status === "ONLINE" ? "bg-nv-success shadow-[0_0_10px_rgba(0,245,160,0.4)]" : "bg-nv-warning shadow-[0_0_10px_rgba(255,184,0,0.4)]"} animate-pulse`} />
              <span className={`text-sm font-semibold ${game.status === "ONLINE" ? "text-nv-success" : "text-nv-warning"}`}>{game.status === "ONLINE" ? "Online" : "Maintenance"}</span>
              <span className="text-xs text-nv-text-muted hidden sm:inline">{game.uptime} uptime</span>
            </div>
          </div>
        ))}
      </motion.div>

      <div>
        <h3 className="font-display text-lg font-bold mb-4 pl-2">Recent Incidents</h3>
        {(data?.incidents || []).map((incident: any) => (
          <motion.div key={incident.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className={`bg-nv-card border border-nv-border rounded-2xl p-5 mb-4 border-l-[3px] ${
              incident.severity === "HIGH" ? "border-l-nv-danger" : incident.severity === "MEDIUM" ? "border-l-nv-warning" : "border-l-nv-success"
            }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm">{incident.title}</span>
              <span className="text-xs text-nv-text-muted">{new Date(incident.createdAt).toLocaleDateString()} · {new Date(incident.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} UTC</span>
            </div>
            <p className="text-sm text-nv-text-secondary leading-relaxed mb-3">{incident.description}</p>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-nv-success/15 text-nv-success border border-nv-success/30">
              <CheckCircle className="w-3 h-3" /> Resolved
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}