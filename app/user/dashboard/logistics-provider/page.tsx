"use client";

import {
  WeatherCard,
  RatingCard,
  QuickStatsCard,
  CostProfitCard,
  GifCard,
  IndiaRouteCard,
  DUMMY_WEATHER,
  DUMMY_RATING,
  DUMMY_ROUTE,
  DUMMY_FINANCIAL,
} from "@/components/logistics-provider";

export default function LogisticsProviderDashboard() {
  return (
    <div className="w-full h-screen bg-gray-50 overflow-hidden flex flex-col p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Logistics Provider Overview</p>
      </div>

      {/* Grid Container - No Scroll */}
      <div className="grid grid-cols-4 grid-rows-2 gap-6 flex-1 overflow-hidden">
            {/* Weather Card - Top Left */}
            <WeatherCard data={DUMMY_WEATHER} />

            {/* Rating Card - Top Center Left */}
            <RatingCard
              rating={DUMMY_RATING.rating}
              maxRating={DUMMY_RATING.maxRating}
              reviews={DUMMY_RATING.reviews}
            />

            {/* Quick Stats Card - Top Center Right */}
            <QuickStatsCard shipments={DUMMY_ROUTE.activeShipments} />

            {/* GIF Card - Top Right */}
            <GifCard />

            {/* India Route Card - Bottom (Spans 3 cols) */}
            <IndiaRouteCard />

            {/* Cost Profit Card - Bottom Right */}
            <CostProfitCard data={DUMMY_FINANCIAL} />
          </div>
    </div>
  );
}
