import { ReactNode } from "react";

type DashboardGuardProps = {
  children: ReactNode;
};

export function DashboardGuard({ children }: DashboardGuardProps) {
  return <>{children}</>;
}
