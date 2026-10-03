// app/dashboard/layout.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SessionAuthProvider } from "@/components/session-auth";
import { SidebarDashboard } from "../_components/sidebar";
import { getUserData } from "../profile/_data-access/get-info-user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  const user = await getUserData({ userId: session.user.id });

  if (!user) {
    redirect("/");
  }

  return (
    <SessionAuthProvider>
      <SidebarDashboard>{children}</SidebarDashboard>
    </SessionAuthProvider>
  );
}