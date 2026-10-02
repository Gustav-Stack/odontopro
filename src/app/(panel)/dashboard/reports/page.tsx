// app/dashboard/layout.tsx
// Versão para NextAuth v4 (import { getServerSession } from "next-auth")

import { SessionAuthProvider } from "@/components/session-auth";
import { SidebarDashboard } from "./_components/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // ajuste para o caminho real do seu authOptions
import { redirect } from "next/navigation";
import { getUserData } from "./profile/_data-access/get-info-user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userId = session.user?.id;

  if (!userId) {
    redirect("/");
  }

  const user = await getUserData({ userId });

  if (!user) {
    redirect("/");
  }

  return (
    <SessionAuthProvider session={session}>
      <SidebarDashboard userName={user.name} userEmail={user.email}>
        {children}
      </SidebarDashboard>
    </SessionAuthProvider>
  );
}