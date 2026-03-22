import Link from "next/link";
import BiiioLogo from "@/components/BiiioLogo";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#fcf9f8] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#f7d59e]/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#91cefb]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#f09ba4]/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        {/* Logo */}
        <div className="mb-10">
          <BiiioLogo size="lg" />
        </div>

        {/* 404 */}
        <div className="font-black text-[120px] md:text-[160px] leading-none tracking-tighter text-[#1c1b1b] select-none relative inline-block">
          <span className="relative inline-block z-[1]">
            404
            <span
              className="absolute left-[-8px] right-[-8px] bottom-[10px] h-[38%] z-[-1] rounded-[8px]"
              style={{ backgroundColor: "#f7d59e", transform: "rotate(-1deg)" }}
            />
          </span>
        </div>

        <h1 className="font-black text-2xl md:text-3xl tracking-tighter text-[#1c1b1b] mt-6 mb-3">
          Uy, justo este link no lo tenemos
        </h1>
        <p className="text-[#7b7487] text-base leading-relaxed mb-10">
          Puede que se haya movido, eliminado, o nunca existió.<br />
          ¡Pero tu Biiio sí puede existir!
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#f7d59e] text-[#1c1b1b] rounded-full font-black text-sm hover:opacity-90 transition-opacity shadow-lg shadow-[#f7d59e]/30 text-center"
          >
            Go home →
          </Link>
          <Link
            href="/signup"
            className="w-full sm:w-auto px-8 py-3.5 bg-white border border-black/[0.08] text-[#4a4455] rounded-full font-bold text-sm hover:bg-[#f6f3f2] transition-colors text-center"
          >
            Create your Biiio
          </Link>
        </div>
      </div>
    </main>
  );
}
