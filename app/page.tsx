import DashboardCard from "@/components/dashboard/DashboardCard";
import TableComponent from "@/components/dashboard/TableComponent";

export default function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-5 mb-5"></div>
      <DashboardCard />
      <TableComponent />
    </>
  );
}
