"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { authApi } from "@/lib/api";
import { saveTokens, saveUser, getDashboardPath } from "@/lib/auth";
import { Mail, Lock, User, Phone, BookOpen, AlertCircle, CheckCircle } from "lucide-react";

const ROLES = [
  { value: "student", icon: "🎓", label: "Talaba", desc: "Kitob va resurslardan foydalaning" },
  { value: "teacher", icon: "👨‍🏫", label: "O'qituvchi", desc: "Resurslar yuklash va boshqarish" },
  { value: "librarian", icon: "📚", label: "Kutubxonachi", desc: "Kitob va bronlarni boshqarish" },
  { value: "department_head", icon: "🏛️", label: "Kafedra mudiri", desc: "Kafedra resurslarini tasdiqlash" },
];

const DEPARTMENTS = [
  { id: 1, name: "Axborot texnologiyalari kafedrasi" },
  { id: 2, name: "Matematika kafedrasi" },
  { id: 3, name: "Iqtisodiyot kafedrasi" },
  { id: 4, name: "Filologiya kafedrasi" },
  { id: 5, name: "Tarix kafedrasi" },
  { id: 6, name: "Pedagogika kafedrasi" },
];

const STEPS = ["Rol tanlash", "Shaxsiy ma'lumotlar", "Akademik ma'lumotlar", "Xavfsizlik", "Yakunlash"];

export default function RegisterForm() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("");
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    department_id: "",
    student_id: "",
    course: "",
    semester: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      setError("Parollar mos kelmadi");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const payload: any = {
        email: form.email,
        full_name: form.full_name,
        password: form.password,
        role,
        phone: form.phone || undefined,
        department_id: form.department_id ? parseInt(form.department_id) : undefined,
        student_id: form.student_id || undefined,
        course: form.course ? parseInt(form.course) : undefined,
        semester: form.semester ? parseInt(form.semester) : undefined,
      };
      const { data } = await authApi.register(payload);
      saveTokens(data.access_token, data.refresh_token);
      saveUser(data.user);
      setSuccess(true);
      setTimeout(() => {
        router.push(getDashboardPath(data.user.role, locale));
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Xato yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-10 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-2xl font-bold text-[#061B3A] mb-2">Muvaffaqiyatli!</h3>
          <p className="text-gray-500">Profilingizga yo'naltirilmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-[#061B3A] mb-2">{t("register")}</h2>

        {/* Step indicator */}
        <div className="flex items-center gap-1 mb-6">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-1 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < step ? "bg-emerald-500 text-white" :
                i === step ? "bg-[#1457A8] text-white" :
                "bg-gray-100 text-gray-400"
              }`}>
                {i < step ? "✓" : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 ${i < step ? "bg-emerald-400" : "bg-gray-100"}`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-500 mb-6">{STEPS[step]}</div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Step 0: Role */}
        {step === 0 && (
          <div className="grid grid-cols-2 gap-3">
            {ROLES.map((r) => (
              <button
                key={r.value}
                onClick={() => setRole(r.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  role === r.value
                    ? "border-[#1457A8] bg-blue-50"
                    : "border-gray-200 hover:border-[#1457A8]/30"
                }`}
              >
                <div className="text-2xl mb-2">{r.icon}</div>
                <div className="font-bold text-sm text-[#172033]">{r.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{r.desc}</div>
              </button>
            ))}
          </div>
        )}

        {/* Step 1: Personal info */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("fullName")}</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={form.full_name}
                  onChange={(e) => update("full_name", e.target.value)}
                  placeholder="Ism Familiya"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("email")}</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="email@atmu.uz"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("phone")}</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Academic info */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("department")}</label>
              <select
                value={form.department_id}
                onChange={(e) => update("department_id", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
              >
                <option value="">Kafedrani tanlang</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            {role === "student" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("studentId")}</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={form.student_id}
                      onChange={(e) => update("student_id", e.target.value)}
                      placeholder="AT-21-001"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("course")}</label>
                    <select
                      value={form.course}
                      onChange={(e) => update("course", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
                    >
                      <option value="">Kurs</option>
                      {[1, 2, 3, 4].map((c) => (
                        <option key={c} value={c}>{c}-kurs</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("semester")}</label>
                    <select
                      value={form.semester}
                      onChange={(e) => update("semester", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
                    >
                      <option value="">Semestr</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                        <option key={s} value={s}>{s}-semestr</option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 3: Password */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("password")}</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="Kamida 8 ta belgi"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Parolni tasdiqlang</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  placeholder="Parolni takrorlang"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1457A8]"
                />
              </div>
            </div>
            {form.password && form.confirmPassword && (
              <div className={`text-xs font-medium ${form.password === form.confirmPassword ? "text-emerald-600" : "text-red-500"}`}>
                {form.password === form.confirmPassword ? "✓ Parollar mos" : "✗ Parollar mos emas"}
              </div>
            )}
          </div>
        )}

        {/* Step 4: Complete */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="p-4 bg-[#F5F7FA] rounded-xl space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Ism:</span>
                <span className="font-medium">{form.full_name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Email:</span>
                <span className="font-medium">{form.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Rol:</span>
                <span className="font-medium capitalize">{role}</span>
              </div>
              {form.department_id && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Kafedra:</span>
                  <span className="font-medium">{DEPARTMENTS.find(d => d.id === parseInt(form.department_id))?.name}</span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500">Ma'lumotlarni tekshiring va ro'yxatdan o'ting.</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              {t("back")}
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => {
                if (step === 0 && !role) { setError("Iltimos, rol tanlang"); return; }
                setError("");
                setStep(step + 1);
              }}
              className="flex-1 py-3 bg-[#1457A8] hover:bg-[#0B3D73] text-white font-semibold rounded-xl transition-colors"
            >
              {t("next")}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-60"
            >
              {loading ? "Yaratilmoqda..." : t("finish")}
            </button>
          )}
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          {t("hasAccount")}{" "}
          <Link href="/auth/login" className="text-[#1457A8] font-medium hover:underline">
            {t("login")}
          </Link>
        </div>
      </div>
    </div>
  );
}
