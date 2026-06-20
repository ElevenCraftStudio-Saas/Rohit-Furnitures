import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { getDbData } from "@/lib/db";
import { AdminDashboardClient } from "@/app/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("rohit_admin_session")?.value;

  if (!token || !verifyToken(token)) {
    redirect("/admin/login");
  }

  const dbData = getDbData();

  return <AdminDashboardClient initialData={dbData} />;
}
