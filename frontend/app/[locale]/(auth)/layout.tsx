import { Link } from "@/i18n/navigation";
import { Library } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen gradient-navy flex flex-col">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#008C95] rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#1457A8] rounded-full blur-3xl" />
      </div>
      <div className="relative flex-1 flex flex-col">
        <header className="p-6">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <Library className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-bold">ATMU Smart UniLibrary</div>
              <div className="text-blue-300 text-xs">Elektron kutubxona platformasi</div>
            </div>
          </Link>
        </header>
        <main className="flex-1 flex items-center justify-center p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
