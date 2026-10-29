import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";

export default function MainLayout() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#dbe8ff] via-[#e6e0ff] to-[#d6efff]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-cyan/25 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-brand-violet/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-brand-pink/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-4">
        <DashboardHeader />
        <main className="mt-6 pb-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
