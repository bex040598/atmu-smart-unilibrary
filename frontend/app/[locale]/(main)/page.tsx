import HeroSection from "@/components/home/HeroSection";
import UniversityAbout from "@/components/home/UniversityAbout";
import UniversityNews from "@/components/home/UniversityNews";
import UniversityEvents from "@/components/home/UniversityEvents";
import InteractiveServices from "@/components/home/InteractiveServices";
import FacultyDepartments from "@/components/home/FacultyDepartments";
import StudentLife from "@/components/home/StudentLife";
import ResearchSection from "@/components/home/ResearchSection";
import ScientificCenters from "@/components/home/ScientificCenters";
import AlumniSection from "@/components/home/AlumniSection";
import SmartLibrarySection from "@/components/home/SmartLibrarySection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <UniversityAbout />
      <UniversityNews />
      <UniversityEvents />
      <InteractiveServices />
      <FacultyDepartments />
      <StudentLife />
      <ResearchSection />
      <ScientificCenters />
      <AlumniSection />
      <SmartLibrarySection />
    </div>
  );
}
