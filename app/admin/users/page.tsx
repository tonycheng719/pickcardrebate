import { createClient } from "@/lib/supabase/server";
import { UserTable, AdminUser } from "./user-table";
import { AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic"; // Force dynamic rendering to fetch fresh data

export default async function AdminUsersPage() {
  const supabase = await createClient();

  try {
    // Fetch users directly on the server
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("email");

    if (error) {
        console.error("AdminUsersPage fetch error:", error);
        throw error;
    }

    const users: AdminUser[] = (data || []).map((profile: any) => ({
        id: profile.id,
        name: profile.name || "Unknown",
        email: profile.email || "No Email",
        role: "member", 
        status: "active",
        joinDate: profile.created_at ? new Date(profile.created_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        lastIp: profile.last_ip
    }));

    return <UserTable initialUsers={users} />;

  } catch (error: any) {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-red-500 gap-4">
            <AlertCircle className="h-12 w-12" />
            <h2 className="text-xl font-bold">載入會員資料失敗</h2>
            <p className="text-sm bg-red-50 p-4 rounded font-mono max-w-md overflow-auto">
                {error.message || String(error)}
            </p>
            <p className="text-gray-500 text-sm">
                請確認您的帳號權限，或稍後再試。
            </p>
        </div>
    );
  }
}
