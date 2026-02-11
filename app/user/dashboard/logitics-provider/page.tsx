import Sidebar from "@/components/Sidebar";
import { CostProfitChart } from "@/components/logistics-provider/CostProfitChart";
import { RouteRiskMap } from "@/components/logistics-provider/RouteRiskMap";
import {
  GifWidget,
  RatingWidget,
  WeatherWidget,
} from "@/components/logistics-provider/DashboardWidgets";

export default function LogisticsProviderDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Logistics Provider Dashboard
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Route optimization, shipment tracking, and finance insights.
              </p>
            </div>
          </div>

          {/* Layout based on provided wireframe */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
            {/* Top widgets row */}
            <div className="md:col-span-4 min-h-[150px]">
              <WeatherWidget />
            </div>
            <div className="md:col-span-4 min-h-[150px]">
              <RatingWidget />
            </div>
            <div className="md:col-span-4 min-h-[150px]">
              <GifWidget />
            </div>

            {/* Main content row */}
            <div className="md:col-span-8 min-h-[420px]">
              <RouteRiskMap />
            </div>
            <div className="md:col-span-4 min-h-[420px]">
              <CostProfitChart />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
