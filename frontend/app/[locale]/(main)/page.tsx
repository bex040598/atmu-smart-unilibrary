import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import DepartmentsHub from "@/components/home/DepartmentsHub";
import QuickActions from "@/components/home/QuickActions";
import NewResources from "@/components/home/NewResources";
import AIPreview from "@/components/home/AIPreview";
import ReadingRoomPreview from "@/components/home/ReadingRoomPreview";
import AnnouncementsSection from "@/components/home/AnnouncementsSection";

export default async function HomePage() {
  return (
    <div className="min-h-screen ornament-bg ornament-pattern">
      <HeroSection />
      <StatsSection />
      <DepartmentsHub />
      <QuickActions />
      <NewResources />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <AIPreview />
        <ReadingRoomPreview />
      </div>
      <AnnouncementsSection />
    </div>
  );
}
