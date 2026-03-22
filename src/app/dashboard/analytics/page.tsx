"use client";

import { mockAnalytics, mockProfile } from "@/lib/mock-data";
import { Eye, MousePointerClick, Percent, Timer, Smartphone, Laptop, Globe, TrendingUp, TrendingDown, Plus } from "lucide-react";

const kpis = [
  {
    label: "Views",
    value: "12.5k",
    trend: "+15%",
    up: true,
    icon: <Eye className="w-4 h-4" />,
    iconBg: "#efe8fd",
    iconColor: "#705092",
  },
  {
    label: "Clicks",
    value: "8.2k",
    trend: "+10%",
    up: true,
    icon: <MousePointerClick className="w-4 h-4" />,
    iconBg: "#ddf1fe",
    iconColor: "#1d648c",
  },
  {
    label: "CTR",
    value: "65.6%",
    trend: "+5%",
    up: true,
    icon: <Percent className="w-4 h-4" />,
    iconBg: "#fef4e2",
    iconColor: "#735a2e",
  },
  {
    label: "Avg. Time",
    value: "45s",
    trend: "-2%",
    up: false,
    icon: <Timer className="w-4 h-4" />,
    iconBg: "#fde8e8",
    iconColor: "#ba1a1a",
  },
];

export default function AnalyticsPage() {
  const analytics = mockAnalytics;
  const profile = mockProfile;

  // Bar chart bars — alternating violet (views) and blue (clicks)
  const bars = [
    { h: "40%", type: "views" },
    { h: "55%", type: "views" },
    { h: "45%", type: "views" },
    { h: "70%", type: "views" },
    { h: "65%", type: "views" },
    { h: "30%", type: "clicks" },
    { h: "85%", type: "views" },
    { h: "90%", type: "views" },
    { h: "45%", type: "clicks" },
    { h: "75%", type: "views" },
    { h: "60%", type: "views" },
    { h: "80%", type: "views" },
    { h: "55%", type: "clicks" },
    { h: "100%", type: "views" },
  ];

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-5xl flex flex-col gap-8 md:gap-12 relative">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-black text-3xl md:text-5xl tracking-tighter text-[#1c1b1b]">
            Your <span className="marker">Analytics</span>
          </h1>
          <p className="text-[#7b7487] text-base font-medium mt-2">Track your performance and audience growth.</p>
        </div>
        {/* Time range selector */}
        <div className="inline-flex bg-[#f3f3f3] p-1.5 rounded-full">
          {["Last 7 Days", "Last 30 Days", "All Time"].map((r, i) => (
            <button
              key={r}
              className="px-5 py-2 rounded-full text-xs font-bold transition-all"
              style={{
                backgroundColor: i === 0 ? "white" : "transparent",
                color: i === 0 ? "#705092" : "#7b7487",
                boxShadow: i === 0 ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white p-6 rounded-3xl hover:-translate-y-1 transition-all duration-300"
            style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#7b7487] font-bold text-[10px] uppercase tracking-widest">{kpi.label}</span>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: kpi.iconBg, color: kpi.iconColor }}
              >
                {kpi.icon}
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-4xl font-black tracking-tighter text-[#1c1b1b]">{kpi.value}</span>
              <span
                className="text-xs font-bold flex items-center gap-0.5"
                style={{ color: kpi.up ? "#10b981" : "#ef4444" }}
              >
                {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Trends Chart */}
      <div
        className="bg-white p-8 rounded-3xl"
        style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-black text-xl text-[#1c1b1b] tracking-tight">Performance Trends</h3>
            <p className="text-[#7b7487] text-sm mt-0.5">Traffic over the last 30 days</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#d2aef8" }} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7b7487]">Views</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#91cefb" }} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7b7487]">Clicks</span>
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div className="h-64 w-full flex items-end justify-between gap-1 relative pt-8">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="border-b border-[#f0edf4] w-full h-0" />
            ))}
          </div>
          {bars.map((bar, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-lg cursor-pointer group transition-all duration-200 hover:opacity-80"
              style={{
                height: bar.h,
                backgroundColor: bar.type === "views" ? "#d2aef840" : "#91cefb40",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  bar.type === "views" ? "#d2aef8" : "#91cefb";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  bar.type === "views" ? "#d2aef840" : "#91cefb40";
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Top Links — 2 cols */}
        <div
          className="lg:col-span-2 bg-white p-6 rounded-3xl"
          style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-lg text-[#1c1b1b] tracking-tight">Top Links</h3>
            <button className="text-[#705092] font-bold text-sm hover:underline underline-offset-4">
              Export CSV
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {analytics.topLinks.map((link) => (
              <div
                key={link.title}
                className="flex items-center justify-between p-4 rounded-2xl group transition-colors"
                style={{ backgroundColor: "#f3f3f3" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#eeeeee"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#f3f3f3"; }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1c1b1b] text-sm">{link.title}</h4>
                    <p className="text-xs text-[#7b7487] font-medium">{link.url}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black tracking-tight text-[#1c1b1b]">
                    {(link.clicks / 1000).toFixed(1)}k
                  </div>
                  <div className="text-[10px] text-[#7b7487] uppercase tracking-widest font-bold">Clicks</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources — 1 col */}
        <div
          className="bg-white p-6 rounded-3xl"
          style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}
        >
          <h3 className="font-black text-lg text-[#1c1b1b] tracking-tight mb-6">Traffic Sources</h3>
          <div className="flex flex-col gap-5">
            {analytics.sources.map((source) => (
              <div key={source.name} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-sm font-bold text-[#1c1b1b]">
                  <span>{source.name}</span>
                  <span>{source.value}%</span>
                </div>
                <div className="h-2 w-full bg-[#f3f3f3] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${source.value}%`, backgroundColor: source.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Split + Top Countries — full width row */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Device Split */}
          <div
            className="bg-white p-8 rounded-3xl flex items-center justify-between"
            style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}
          >
            <div>
              <h4 className="font-black text-lg text-[#1c1b1b] tracking-tight">Device Split</h4>
              <p className="text-[#7b7487] text-xs font-medium mt-0.5">Where they see you</p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <Smartphone className="w-8 h-8 text-[#705092] mx-auto" />
                <div className="font-black text-lg text-[#1c1b1b] mt-1">{analytics.deviceSplit.mobile}%</div>
                <div className="text-[10px] uppercase font-bold text-[#7b7487]">Mobile</div>
              </div>
              <div className="text-center">
                <Laptop className="w-8 h-8 text-[#cdc3d0] mx-auto" />
                <div className="font-black text-lg text-[#1c1b1b] mt-1">{analytics.deviceSplit.desktop}%</div>
                <div className="text-[10px] uppercase font-bold text-[#7b7487]">Desktop</div>
              </div>
            </div>
          </div>

          {/* Top Countries */}
          <div
            className="bg-white p-8 rounded-3xl"
            style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-black text-lg text-[#1c1b1b] tracking-tight">Top Countries</h4>
              <Globe className="w-5 h-5 text-[#7b7487]" />
            </div>
            <div className="flex gap-3">
              {analytics.topCountries.map((c) => (
                <div
                  key={c.code}
                  className="flex-1 bg-[#f3f3f3] p-4 rounded-2xl text-center"
                >
                  <div className="text-[10px] font-bold text-[#7b7487] uppercase mb-1">{c.code}</div>
                  <div className="text-2xl font-black tracking-tight text-[#1c1b1b]">
                    {(c.value / 1000).toFixed(1)}k
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer spacer */}
      <div className="h-16" />

      {/* FAB */}
      <button
        className="fixed bottom-20 md:bottom-10 right-4 md:right-10 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all z-40"
        style={{ backgroundColor: "#705092" }}
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
