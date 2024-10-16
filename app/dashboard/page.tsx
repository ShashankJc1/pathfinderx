"use client";

import DashboardLayout from "@/components/DashboardLayout";
import Card from "@/components/Card";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Orders" value="245" />
        <Card title="Pending Tasks" value="12" />
        <Card title="Messages" value="35" />
      </div>
    </DashboardLayout>
  );
}
