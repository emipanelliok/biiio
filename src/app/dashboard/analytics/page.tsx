import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Eye, MousePointerClick, Percent, Smartphone, Laptop, Globe } from "lucide-react";

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name")
    .eq("id", user.id)
    .single();

  // Real link clicks
  const { data: links } = await supabase
    .from("links")
    .select("id, title, url, emoji, clicks")
    .eq("user_id", user.id)
    .order("clicks", { ascending: false });

  const totalClicks = (links || []).reduce((sum, l) => sum + (l.clicks || 0), 0);

  // Page views from page_views table (may not exist yet)
  let totalViews = 0;
  let viewsByDay: { date: string; count: number }[] = [];

  try {
    const { data: views } = await supabase
      .from("page_views")
      .select("viewed_at")
      .eq("user_id", user.id);

    if (views) {
      totalViews = views.length;

      // Group by day (last 14 days)
      const now = new Date();
      const dayMap: Record<string, number> = {};
      for (let i = 13; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        dayMap[key] = 0;
      }
      for (const v of views) {
        const key = v.viewed_at.slice(0, 10);
        if (key in dayMap) dayMap[key]++;
      }
      viewsByDay = Object.entries(dayMap).map(([date, count]) => ({ date, count }));
    }
  } catch {
    // Table doesn't exist yet — show zeros
    const now = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      viewsByDay.push({ date: d.toISOString().slice(0, 10), count: 0 });
    }
  }

  const ctr = totalViews > 0 ? Math.round((totalClicks / totalViews) * 100) : 0;
  const maxViews = Math.max(...viewsByDay.map(d => d.count), 1);

  const topLinks = (links || []).slice(0, 5);

  return (
    <div className="p-4 md:p-8 max-w-5xl flex flex-col gap-6 md:gap-8">

      {/* Header */}
      <div>
        <h1 className="font-black text-3xl md:text-4xl tracking-tighter text-[#1c1b1b]">
          Your <span className="marker">Analytics</span>
        </h1>
        <p className="text-[#7b7487] text-sm font-medium mt-1">
          Real stats for <span className="font-bold text-[#1c1b1b]">biiio.io/{profile?.username}</span>
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <div className="bg-white p-4 md:p-6 rounded-3xl" style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#7b7487] font-bold text-[10px] uppercase tracking-widest">Views</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#fef9ec] text-[#b8860b]">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl md:text-4xl font-black tracking-tighter text-[#1c1b1b]">
            {totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}k` : totalViews}
          </div>
          <p className="text-[10px] text-[#cdc3d0] mt-1 font-medium">profile visits</p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-3xl" style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#7b7487] font-bold text-[10px] uppercase tracking-widest">Clicks</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#e8f4ff] text-[#1d648c]">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl md:text-4xl font-black tracking-tighter text-[#1c1b1b]">
            {totalClicks >= 1000 ? `${(totalClicks / 1000).toFixed(1)}k` : totalClicks}
          </div>
          <p className="text-[10px] text-[#cdc3d0] mt-1 font-medium">link clicks</p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-3xl" style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#7b7487] font-bold text-[10px] uppercase tracking-widest">CTR</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#f0fdf4] text-[#15803d]">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl md:text-4xl font-black tracking-tighter text-[#1c1b1b]">{ctr}%</div>
          <p className="text-[10px] text-[#cdc3d0] mt-1 font-medium">click-through rate</p>
        </div>
      </div>

      {/* Views chart */}
      <div className="bg-white p-5 md:p-8 rounded-3xl" style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-black text-lg text-[#1c1b1b] tracking-tight">Profile Views</h3>
            <p className="text-[#7b7487] text-xs mt-0.5">Last 14 days</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#f7d59e]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7b7487]">Views</span>
          </div>
        </div>

        {totalViews === 0 && (
          <div className="text-center py-8 text-[#cdc3d0] text-sm">
            No views yet — share your profile to start tracking!
          </div>
        )}

        {totalViews > 0 && (
          <div className="h-40 flex items-end justify-between gap-1">
            {viewsByDay.map((d) => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div
                  className="w-full rounded-t-lg transition-all"
                  style={{
                    height: `${Math.max((d.count / maxViews) * 100, d.count > 0 ? 8 : 2)}%`,
                    backgroundColor: d.count > 0 ? "#f7d59e" : "#f3f3f3",
                  }}
                />
                <span className="text-[8px] text-[#cdc3d0] font-bold hidden md:block">
                  {new Date(d.date + "T12:00:00").toLocaleDateString("es-AR", { day: "numeric", month: "numeric" })}
                </span>
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1c1b1b] text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {d.count} view{d.count !== 1 ? "s" : ""}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top Links */}
      <div className="bg-white p-5 md:p-8 rounded-3xl" style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}>
        <h3 className="font-black text-lg text-[#1c1b1b] tracking-tight mb-5">Top Links</h3>
        {topLinks.length === 0 ? (
          <p className="text-[#cdc3d0] text-sm text-center py-6">No links yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {topLinks.map((link, i) => {
              const pct = totalClicks > 0 ? Math.round(((link.clicks || 0) / totalClicks) * 100) : 0;
              return (
                <div key={link.id} className="flex items-center gap-4 p-4 rounded-2xl bg-[#f9f9f9]">
                  <span className="text-xs font-black text-[#cdc3d0] w-4 flex-shrink-0">#{i + 1}</span>
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-base flex-shrink-0 shadow-sm">
                    {link.emoji || "🔗"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#1c1b1b] truncate">{link.title}</p>
                    <div className="h-1.5 w-full bg-[#f0f0f0] rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#f7d59e] transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-lg font-black text-[#1c1b1b]">{link.clicks || 0}</div>
                    <div className="text-[10px] text-[#7b7487] font-bold uppercase">clicks</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-3xl flex items-center justify-between" style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}>
          <div>
            <h4 className="font-black text-base text-[#1c1b1b]">Device Split</h4>
            <p className="text-[#7b7487] text-xs mt-0.5">Coming soon</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <Smartphone className="w-7 h-7 text-[#f7d59e] mx-auto" />
              <div className="font-black text-sm text-[#1c1b1b] mt-1">—</div>
              <div className="text-[10px] uppercase font-bold text-[#7b7487]">Mobile</div>
            </div>
            <div className="text-center">
              <Laptop className="w-7 h-7 text-[#cdc3d0] mx-auto" />
              <div className="font-black text-sm text-[#1c1b1b] mt-1">—</div>
              <div className="text-[10px] uppercase font-bold text-[#7b7487]">Desktop</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl" style={{ boxShadow: "0 20px 40px rgba(26,28,28,0.04)" }}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-black text-base text-[#1c1b1b]">Top Countries</h4>
            <Globe className="w-4 h-4 text-[#7b7487]" />
          </div>
          <p className="text-[#cdc3d0] text-sm">Coming soon</p>
        </div>
      </div>

      <div className="h-16" />
    </div>
  );
}
