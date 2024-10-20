"use client";

import DashboardLayout from "@/components/DashboardLayout";
import Card from "@/components/Card";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:px-20">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="bold-40">Welcome, [User Name]!</h2>
          <p className="regular-20">Here’s a summary of your recent activity.</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card title="Total Orders" value="245" />
          <Card title="Pending Tasks" value="12" />
          <Card title="Messages" value="35" />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4">
          <button className="btn_dark_green">Search Flights</button>
          <button className="btn_white_text">View Itinerary</button>
          <button className="btn_green">Plan a Trip</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
