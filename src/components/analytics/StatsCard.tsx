interface StatsCardProps {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  accent?: boolean;
}

export default function StatsCard({ label, value, sub, icon, accent }: StatsCardProps) {
  return (
    <div
      className="p-5 rounded-2xl flex items-start gap-4 bg-white"
      style={{
        boxShadow: accent
          ? "0 20px 40px rgba(210,174,248,0.2)"
          : "0 20px 40px rgba(26,28,28,0.06)",
        backgroundColor: accent ? "#f3ecfd" : "white",
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: accent ? "#d2aef8" : "#f0edf4",
          color: accent ? "#5b3fa0" : "#7b7487",
        }}
      >
        {icon}
      </div>
      <div>
        <p className="text-[#7b7487] text-xs mb-1">{label}</p>
        <p className={`text-xl font-black tracking-tight ${accent ? "text-[#5b3fa0]" : "text-[#1c1b1b]"}`}>
          {value}
        </p>
        {sub && <p className="text-[#aaa3b5] text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
