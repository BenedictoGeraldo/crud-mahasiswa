import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardNavbar } from "@/components/dashboardNavbar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#efede8]">
      <DashboardNavbar />
      <div className="pt-3">{children}</div>
    </div>
  );
}
