"use client";

import { useState } from "react";

interface Stats {
  totalViews: number;
  uniqueVisitors: number;
  totalBookingClicks: number;
  totalPhoneClicks: number;
  dailyViews: { date: string; count: number }[];
  dailyClicks: { date: string; booking: number; phone: number }[];
  recentVisitors: { ip: string; path: string; user_agent: string; created_at: string }[];
}

export default function StatsPage() {
  const [password, setPassword] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/stats?password=${encodeURIComponent(password)}`);
      if (!res.ok) {
        setError("Invalid password");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setStats(data);
    } catch {
      setError("Failed to fetch stats");
    }
    setLoading(false);
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-slate-800 rounded-xl p-8 w-full max-w-sm">
          <h1 className="text-xl font-bold text-white mb-6 text-center">Sleep Inn Analytics</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full border border-slate-600 bg-slate-700 text-white rounded-lg px-4 py-3 mb-4"
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg py-3 transition-colors disabled:opacity-50">
            {loading ? "Loading..." : "View Stats"}
          </button>
        </form>
      </div>
    );
  }
  const maxDailyView = Math.max(...stats.dailyViews.map((d) => Number(d.count)), 1);
  const maxDailyClick = Math.max(...stats.dailyClicks.map((d) => Number(d.booking) + Number(d.phone)), 1);
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Sleep Inn Analytics</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Views" value={stats.totalViews} />
          <StatCard label="Unique Visitors" value={stats.uniqueVisitors} />
          <StatCard label="Booking Clicks" value={stats.totalBookingClicks} />
          <StatCard label="Phone Clicks" value={stats.totalPhoneClicks} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ViewsChart views={stats.dailyViews} max={maxDailyView} />
          <ClicksChart clicks={stats.dailyClicks} max={maxDailyClick} />
        </div>
        <VisitorsTable visitors={stats.recentVisitors} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <p className="text-slate-400 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold">{value.toLocaleString()}</p>
    </div>
  );
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function ViewsChart({ views, max }: { views: Stats["dailyViews"]; max: number }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Daily Views (Last 30 Days)</h2>
      {views.length === 0 ? <p className="text-slate-400 text-sm">No data yet</p> : (
        <div className="space-y-2">
          {views.map((day) => (
            <div key={day.date} className="flex items-center gap-3 text-sm">
              <span className="w-24 text-slate-400 shrink-0">{fmtDate(day.date)}</span>
              <div className="flex-1 bg-slate-700 rounded-full h-5 overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full" style={{ width: `${(Number(day.count) / max) * 100}%` }} />
              </div>
              <span className="w-10 text-right text-slate-300">{day.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ClicksChart({ clicks, max }: { clicks: Stats["dailyClicks"]; max: number }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Daily Clicks (Last 30 Days)</h2>
      {clicks.length === 0 ? <p className="text-slate-400 text-sm">No data yet</p> : (
        <div className="space-y-2">
          {clicks.map((day) => (
            <div key={day.date} className="flex items-center gap-3 text-sm">
              <span className="w-24 text-slate-400 shrink-0">{fmtDate(day.date)}</span>
              <div className="flex-1 bg-slate-700 rounded-full h-5 overflow-hidden flex">
                <div className="bg-orange-500 h-full" style={{ width: `${(Number(day.booking) / max) * 100}%` }} />
                <div className="bg-green-500 h-full" style={{ width: `${(Number(day.phone) / max) * 100}%` }} />
              </div>
              <span className="w-16 text-right text-slate-300">{day.booking}/{day.phone}</span>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-4 mt-4 text-xs text-slate-400">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-500 rounded-sm" /> Booking</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-sm" /> Phone</span>
      </div>
    </div>
  );
}

function VisitorsTable({ visitors }: { visitors: Stats["recentVisitors"] }) {
  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Visitors</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="pb-3 pr-4">IP</th>
              <th className="pb-3 pr-4">Path</th>
              <th className="pb-3 pr-4">User Agent</th>
              <th className="pb-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((v, i) => (
              <tr key={i} className="border-b border-slate-700/50">
                <td className="py-2 pr-4 font-mono text-xs">{v.ip}</td>
                <td className="py-2 pr-4">{v.path}</td>
                <td className="py-2 pr-4 text-slate-400 max-w-xs truncate">{v.user_agent}</td>
                <td className="py-2 text-slate-400">{new Date(v.created_at).toLocaleString("en-US")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
