import { SidebarDashboard } from "./_components/sidebar";
import { Providers } from "@/app/providers";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <Providers>
      <SidebarDashboard>{children}</SidebarDashboard>
      </Providers>
    </>
  );
}
