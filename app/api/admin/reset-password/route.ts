import { NextRequest, NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";

// This is a one-time use endpoint to reset/create admin password
// Should be removed after use for security
export async function POST(request: NextRequest) {
  try {
    const { email, newPassword, secretKey } = await request.json();

    // Simple secret key protection - change this before deploying
    if (secretKey !== "pickcardrebate-reset-2024") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!email || !newPassword) {
      return NextResponse.json({ error: "Missing email or newPassword" }, { status: 400 });
    }

    // First, find the user by email
    const { data: users, error: listError } = await adminAuthClient.auth.admin.listUsers();
    
    if (listError) {
      console.error("List users error:", listError);
      return NextResponse.json({ error: listError.message }, { status: 500 });
    }

    const user = users.users.find(u => u.email === email);
    
    if (!user) {
      // User doesn't exist, create new user
      const { data: newUser, error: createError } = await adminAuthClient.auth.admin.createUser({
        email,
        password: newPassword,
        email_confirm: true, // Auto-confirm email
      });

      if (createError) {
        console.error("Create user error:", createError);
        return NextResponse.json({ error: createError.message }, { status: 500 });
      }

      return NextResponse.json({ 
        success: true, 
        message: "Admin user created successfully",
        userId: newUser.user.id,
        action: "created"
      });
    }

    // Update the user's password
    const { data, error } = await adminAuthClient.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );

    if (error) {
      console.error("Update password error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Password updated successfully",
      userId: user.id,
      action: "updated"
    });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

