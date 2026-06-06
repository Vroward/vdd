"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Key, Diamond, Ticket, Shield, LogOut, Copy, Check } from "lucide-react";
import { signOut } from "next-auth/react";

export default function ClientPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState({ orders: [] as any[], licenses: [] as any[] });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth");
    if (status === "authenticated") {
      fetch("/api/orders")
        .then((res) => res.json())
        .then((d) => { setData(d); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [status, router]);

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-nv-pink border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const user = session.user as any;
  const activeLicenses = data.licenses.filter((l) => l.status === "ACTIVE").length;
  const totalSpent = data.orders.reduce((acc, o) => acc + o.price, 0);

  return (
    <div className="min-h-[80vh] px-6 py-8 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold">Dashboard</h2>
          <p className="text-nv-text-muted text-sm">Welcome back, {user.name || "User"}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-nv-pink to-nv-purple flex items-center justify-center text-sm font-bold shadow-[0_0_15px_rgba(255,107,157,0.3)]">
            {(user.name?.[0] || "U").toUpperCase()}
          </div>
          <div className="hidden sm:block">
            <div className="font-semibold text-sm">{user.name || "User"}</div>
            <div className="text-xs text-nv-text-muted">{user.role === "ADMIN" ? "Administrator" : "Premium Member"}</div>
          </div>
          <button onClick={() => signOut({ callbackUrl: "/" })} className="p-2 rounded-lg bg-nv-danger/15 border border-nv-danger/30 text-nv-danger hover:bg-nv-danger/25 transition-all">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: <Key className="w-5 h-5" />, title: "Active Licenses", value: activeLicenses.toString(), sub: `${data.licenses.filter((l) => l.expiresAt && new Date(l.expiresAt) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length} expiring soon`, color: "text-nv-pink" },
          { icon: <Diamond className="w-5 h-5" />, title: "Total Spent", value: `$${totalSpent.toFixed(2)}`, sub: "Lifetime purchases", color: "text-nv-purple" },
          { icon: <Ticket className="w-5 h-5" />, title: "Support Tickets", value: "0", sub: "0 open, 0 pending", color: "text-nv-info" },
          { icon: <Shield className="w-5 h-5" />, title: "Account Status", value: "Active", sub: "Member since " + new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }), color: "text-nv-success" },
        ].map((card) => (
          <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-nv-card border border-nv-border rounded-2xl p-5 hover:border-nv-pink/30 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-nv-text-muted uppercase tracking-wider">{card.title}</span>
              <span className={card.color}>{card.icon}</span>
            </div>
            <div className="font-display text-2xl font-bold text-white">{card.value}</div>
            <div className="text-xs text-nv-text-muted mt-1">{card.sub}</div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-nv-card border border-nv-border rounded-2xl overflow-hidden mb-6">
        <div className="p-5 border-b border-nv-border">
          <h3 className="font-display text-lg font-bold">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-nv-text-muted uppercase tracking-wider">
                <th className="p-4 border-b border-nv-border">Order ID</th>
                <th className="p-4 border-b border-nv-border">Product</th>
                <th className="p-4 border-b border-nv-border">Date</th>
                <th className="p-4 border-b border-nv-border">Status</th>
                <th className="p-4 border-b border-nv-border">Price</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-nv-text-muted">No orders yet. Visit the store to make your first purchase.</td></tr>
              ) : (
                data.orders.map((order) => (
                  <tr key={order.id} className="hover:bg-nv-pink/5 transition-colors">
                    <td className="p-4 text-sm text-nv-text-secondary border-b border-nv-border">#{order.orderId}</td>
                    <td className="p-4 text-sm text-white border-b border-nv-border">{order.product}</td>
                    <td className="p-4 text-sm text-nv-text-muted border-b border-nv-border">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 border-b border-nv-border">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        order.status === "ACTIVE" ? "bg-nv-success/15 text-nv-success border border-nv-success/30" : "bg-nv-warning/15 text-nv-warning border border-nv-warning/30"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${order.status === "ACTIVE" ? "bg-nv-success" : "bg-nv-warning"} animate-pulse`} />{order.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-semibold text-nv-pink border-b border-nv-border">${order.price.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-nv-card border border-nv-border rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-nv-border">
          <h3 className="font-display text-lg font-bold">Your Licenses</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-nv-text-muted uppercase tracking-wider">
                <th className="p-4 border-b border-nv-border">Product</th>
                <th className="p-4 border-b border-nv-border">Key</th>
                <th className="p-4 border-b border-nv-border">Expires</th>
                <th className="p-4 border-b border-nv-border">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.licenses.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-nv-text-muted">No active licenses. Purchase a product to get started.</td></tr>
              ) : (
                data.licenses.map((license) => (
                  <tr key={license.id} className="hover:bg-nv-pink/5 transition-colors">
                    <td className="p-4 text-sm text-white border-b border-nv-border">{license.product}</td>
                    <td className="p-4 text-sm text-nv-text-secondary border-b border-nv-border">
                      <div className="flex items-center gap-2">
                        <code className="bg-nv-dark px-2 py-1 rounded text-xs">{license.key}</code>
                        <button onClick={() => copyKey(license.key)} className="p-1 rounded hover:bg-nv-pink/10 text-nv-text-muted hover:text-nv-pink transition-colors">
                          {copied === license.key ? <Check className="w-3.5 h-3.5 text-nv-success" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-nv-text-muted border-b border-nv-border">{license.expiresAt ? new Date(license.expiresAt).toLocaleDateString() : "Never"}</td>
                    <td className="p-4 border-b border-nv-border">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-nv-success/15 text-nv-success border border-nv-success/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-nv-success animate-pulse" /> Active
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}