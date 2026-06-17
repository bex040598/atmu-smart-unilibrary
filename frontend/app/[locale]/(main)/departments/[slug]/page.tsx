import DepartmentDetailPage from "@/components/departments/DepartmentDetailPage";

export default function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  return <DepartmentDetailPage params={params} />;
}
