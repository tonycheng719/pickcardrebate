import { UserTable, AdminUser } from "./user-table";
import { AlertCircle } from "lucide-react";
import { adminAuthClient } from "@/lib/supabase/admin-client";

export const dynamic = "force-dynamic"; 

export default async function AdminUsersPage() {
  // Use service_role client to bypass RLS for admin access
  const supabase = adminAuthClient;

  try {
    // Fetch profiles - ordered by created_at descending (newest first)
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
        console.error("AdminUsersPage fetch error:", error);
        throw error;
    }

    // Fetch card counts for all users
    const { data: cardData, error: cardError } = await supabase
      .from("user_cards")
      .select("user_id");

    // Count cards per user
    const cardCountMap: Record<string, number> = {};
    if (!cardError && cardData) {
      cardData.forEach((row: any) => {
        cardCountMap[row.user_id] = (cardCountMap[row.user_id] || 0) + 1;
      });
    }

    const users: AdminUser[] = (data || []).map((profile: any) => ({
        id: profile.id,
        name: profile.name || "Unknown",
        email: profile.email || "No Email",
        role: "member", 
        status: "active",
        joinDate: profile.created_at ? new Date(profile.created_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        lastIp: profile.last_ip,
        cardCount: cardCountMap[profile.id] || 0,
        signupSource: profile.signup_source,
        lastLoginSource: profile.last_login_source,
        lastLoginAt: profile.last_login_at,
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
