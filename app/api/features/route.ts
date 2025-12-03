import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Public API to get feature flags
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("system_settings")
      .select("key, value")
      .in("key", ["quiz_enabled", "achievements_enabled"]);

    if (error) {
      // Return defaults if table doesn't exist or error
      return NextResponse.json({
        quiz_enabled: false,
        achievements_enabled: false,
      });
    }

    // Convert array to object
    const features = data.reduce((acc, curr) => {
      acc[curr.key] = curr.value === 'true';
      return acc;
    }, {} as Record<string, boolean>);

    return NextResponse.json({
      quiz_enabled: features.quiz_enabled || false,
      achievements_enabled: features.achievements_enabled || false,
    });
  } catch (error) {
    console.error("Error fetching features:", error);
    // Return defaults on error
    return NextResponse.json({
      quiz_enabled: false,
      achievements_enabled: false,
    });
  }
}

