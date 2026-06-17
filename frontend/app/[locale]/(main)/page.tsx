import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import AnnouncementsSection from "@/components/home/AnnouncementsSection";
import DepartmentsHub from "@/components/home/DepartmentsHub";
import QuickActions from "@/components/home/QuickActions";
import NewResources from "@/components/home/NewResources";
import AIPreview from "@/components/home/AIPreview";
import ReadingRoomPreview from "@/components/home/ReadingRoomPreview";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <QuickActions />
      <AnnouncementsSection />
      <DepartmentsHub />
      <NewResources />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <AIPreview />
        <ReadingRoomPreview />
      </div>
    </div>
  );
}
