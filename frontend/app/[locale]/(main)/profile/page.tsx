"use client";
import { useEffect, useState } from "react";
import { getUser, isAuthenticated } from "@/lib/auth";
import { useRouter } from "@/i18n/navigation";
import StudentProfile from "@/components/profile/StudentProfile";
import TeacherProfile from "@/components/profile/TeacherProfile";
import ProfilePage from "@/components/profile/ProfilePage";

export default function Profile() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    const user = getUser();
    setRole(user?.role || "other");
  }, []);

  if (role === null) return null;
  if (role === "student") return <StudentProfile />;
  if (role === "teacher") return <TeacherProfile />;
  return <ProfilePage />;
}
