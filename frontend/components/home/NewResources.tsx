"use client";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight, BookOpen, Download, Eye, FileText, Video, FlaskConical, Loader2 } from "lucide-react";
import { resourcesApi } from "@/lib/api";

const TYPE_ICON: Record<string, any> = {
  textbook: BookOpen, lecture: FileText, lab: FlaskConical, video: Video,
};
const TYPE_COLOR: Record<string, string> = {
  textbook: "bg-blue-50 text-blue-600", lecture: "bg-teal-50 text-teal-600",
  lab: "bg-emerald-50 text-emerald-600", video: "bg-purple-50 text-purple-600",
};

const FALLBACK = [
  { id: 1, title: "Ma'lumotlar bazasi: nazariya va amaliyot", material_type: "textbook", course: 2, view_count: 234, download_count: 89, department_name: "Axborot texnologiyalari" },
  { id: 2, title: "Python dasturlash asoslari", material_type: "lecture", course: 1, view_count: 189, download_count: 67, department_name: "Axborot texnologiyalari" },
  { id: 3, title: "Sun'iy intellekt asoslari", material_type: "video", course: 3, view_count: 312, download_count: 0, department_name: "Axborot texnologiyalari" },
  { id: 4, title: "Kompyuter tarmoqlari laboratoriya", material_type: "lab", course: 2, view_count: 156, download_count: 45, department_name: "Axborot texnologiyalari" },
];

export default function NewResources() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    resourcesApi.list({ status: "approved", limit: 4, offset: 0 })
      .then((r) => {
        const data = Array.isArray(r.data) ? r.data : (r.data?.items || []);
        setResources(data.length > 0 ? data : FALLBACK);
      })
      .catch(() => setResources(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const list = resources.length > 0 ? resources : FALLBACK;

  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-sm font-semibold text-[#1457A8] mb-2 uppercase tracking-wider">🆕 Yangi materiallar</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#061B3A]">Yangi qo&apos;shilgan resurslar</h2>
            <p className="text-gray-500 text-sm mt-1">O&apos;qituvchilar tomonidan yuklangan so&apos;nggi materiallar</p>
          </div>
          <Link href="/departments" className="hidden md:flex items-center gap-2 text-sm font-medium text-[#1457A8] hover:text-[#0B3D73]">
            Barchasi <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-[#1457A8]" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {list.map((res: any) => {
              const type = res.material_type || "default";
              const Icon = TYPE_ICON[type] || FileText;
              const colorCls = TYPE_COLOR[type] || "bg-gray-50 text-gray-600";
              return (
                <div key={res.id} className="group bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 card-hover">
                  <div className={`w-10 h-10 rounded-xl ${colorCls} flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-gray-400 mb-1">
                    {res.department_name || res.department?.name_uz || "Kafedra resursi"}
                    {res.course && ` · ${res.course}-kurs`}
                  </div>
                  <h4 className="font-bold text-[#172033] text-sm leading-snug mb-3 group-hover:text-[#1457A8] transition-colors line-clamp-2">
                    {res.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{res.view_count || 0}</span>
                    {(res.download_count ?? 0) > 0 && (
                      <span className="flex items-center gap-1"><Download className="w-3 h-3" />{res.download_count}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 text-xs font-semibold text-[#1457A8] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      O&apos;qish
                    </button>
                    <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-[#1457A8] hover:border-[#1457A8] transition-colors">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
