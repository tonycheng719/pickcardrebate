import { NextRequest, NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin";

// 臨時 API - 更新密碼後請刪除此檔案
export async function POST(request: NextRequest) {
  try {
    const { email, newPassword, secretKey } = await request.json();

    // 簡單嘅安全檢查 - 需要提供正確嘅 secret key
    if (secretKey !== "pickcardrebate2025") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!email || !newPassword) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    // 搵用戶
    const { data: users, error: listError } = await adminAuthClient.auth.admin.listUsers();
    
    if (listError) {
      return NextResponse.json({ error: listError.message }, { status: 500 });
    }

    const user = users.users.find(u => u.email?.toLowerCase() === email.toLowerCase());

    if (!user) {
      // 列出所有用戶嘅 email 幫助 debug
      const emails = users.users.map(u => u.email);
      return NextResponse.json({ 
        error: "User not found", 
        availableEmails: emails 
      }, { status: 404 });
    }

    // 更新密碼
    const { error: updateError } = await adminAuthClient.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Password updated for ${user.email}` 
    });

  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

