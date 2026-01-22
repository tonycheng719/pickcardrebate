"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/lib/store/wallet-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Navbar } from "@/components/navbar";
import { toast } from "sonner";
import { Check, X, Loader2 } from "lucide-react";

// Custom debounce hook
function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }) as T,
    [callback, delay]
  );
}

const HK_DISTRICTS = [
  {
    region: "香港島",
    districts: ["中西區", "東區", "南區", "灣仔區"]
  },
  {
    region: "九龍",
    districts: ["九龍城區", "觀塘區", "深水埗區", "黃大仙區", "油尖旺區"]
  },
  {
    region: "新界",
    districts: ["離島區", "葵青區", "北區", "西貢區", "沙田區", "大埔區", "荃灣區", "屯門區", "元朗區"]
  }
];

export default function OnboardingPage() {
  const { user, updateProfile } = useWallet();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "taken" | "invalid">("idle");
  const [usernameError, setUsernameError] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [district, setDistrict] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentYear, setCurrentYear] = useState(2025); // Default for SSR

  // Set current year on client-side to avoid hydration mismatch
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // 驗證用戶名
  const checkUsername = useDebouncedCallback(async (value: string) => {
    if (!value || value.length < 3) {
      setUsernameStatus("idle");
      return;
    }

    setUsernameStatus("checking");
    try {
      const res = await fetch(`/api/user/check-username?username=${encodeURIComponent(value)}`);
      const data = await res.json();
      
      if (data.available) {
        setUsernameStatus("available");
        setUsernameError("");
      } else {
        setUsernameStatus(data.error?.includes("格式") || data.error?.includes("字符") ? "invalid" : "taken");
        setUsernameError(data.error || "用戶名不可用");
      }
    } catch {
      setUsernameStatus("idle");
    }
  }, 500);

  const handleUsernameChange = (value: string) => {
    // 只允許英文、數字、底線
    const sanitized = value.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 20);
    setUsername(sanitized);
    setUsernameStatus("idle");
    setUsernameError("");
    
    if (sanitized.length >= 3) {
      checkUsername(sanitized);
    }
  };

  const years = Array.from({ length: 100 }, (_, i) => currentYear - i); // Last 100 years
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    // Redirect if not logged in
    if (!user && !isLoading) {
        // Allow time for hydration, but eventually redirect
    }
    
    // Redirect if already completed
    if (user && user.gender && user.district && user.birthYear) {
      router.replace("/");
    }
  }, [user, router, isLoading]);

  const handleSubmit = async () => {
    if (!username || !district || !birthYear || !birthMonth || usernameStatus !== "available") return;

    setIsLoading(true);
    try {
      await updateProfile({
        username,
        gender,
        district,
        birthYear: parseInt(birthYear),
        birthMonth: parseInt(birthMonth)
      });
      toast.success("設定完成！");
      router.push("/");
      router.refresh(); // Force refresh to update server components if any
    } catch (error) {
      toast.error("儲存失敗，請稍後再試");
      console.error(error);
    } finally {
      // Don't set loading false immediately if successful, to prevent flicker
      // But if error, we need to reset
      // actually, just keep it true if pushing to home
    }
  };

  const isFormValid = username && usernameStatus === "available" && gender && district && birthYear && birthMonth;

  if (!user) {
      return null; // Or loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg dark:bg-gray-900 dark:border-gray-800 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-2xl">
                👋
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              歡迎加入 PickCardRebate
            </CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              為了提供更精準的信用卡優惠資訊，請填寫以下基本資料。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            
            {/* Username */}
            <div className="space-y-4">
              <Label className="text-base">用戶名 <span className="text-red-500">*</span></Label>
              <div className="relative">
                <Input
                  placeholder="輸入用戶名（3-20個英文字母、數字或底線）"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  className={`h-12 pr-10 ${
                    usernameStatus === "available" ? "border-green-500 focus-visible:ring-green-500" :
                    usernameStatus === "taken" || usernameStatus === "invalid" ? "border-red-500 focus-visible:ring-red-500" : ""
                  }`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {usernameStatus === "checking" && <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />}
                  {usernameStatus === "available" && <Check className="h-5 w-5 text-green-500" />}
                  {(usernameStatus === "taken" || usernameStatus === "invalid") && <X className="h-5 w-5 text-red-500" />}
                </div>
              </div>
              {usernameError && (
                <p className="text-sm text-red-500">{usernameError}</p>
              )}
              {usernameStatus === "available" && (
                <p className="text-sm text-green-600">✓ 此用戶名可以使用</p>
              )}
              <p className="text-xs text-gray-500">用戶名將用於留言等公開場合，無法更改。</p>
            </div>

            {/* Gender */}
            <div className="space-y-4">
              <Label className="text-base">您的性別 <span className="text-red-500">*</span></Label>
              <RadioGroup 
                defaultValue="male" 
                value={gender} 
                onValueChange={(v) => setGender(v as any)}
                className="grid grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem value="male" id="male" className="peer sr-only" />
                  <Label
                    htmlFor="male"
                    className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-transparent p-4 hover:bg-gray-50 dark:hover:bg-gray-800 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 dark:peer-data-[state=checked]:bg-blue-900/20 dark:peer-data-[state=checked]:text-blue-400 cursor-pointer transition-all"
                  >
                    <span className="text-2xl mb-2">👨</span>
                    <span className="font-medium">男士</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="female" id="female" className="peer sr-only" />
                  <Label
                    htmlFor="female"
                    className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-transparent p-4 hover:bg-gray-50 dark:hover:bg-gray-800 peer-data-[state=checked]:border-pink-600 peer-data-[state=checked]:bg-pink-50 dark:peer-data-[state=checked]:bg-pink-900/20 dark:peer-data-[state=checked]:text-pink-400 cursor-pointer transition-all"
                  >
                    <span className="text-2xl mb-2">👩</span>
                    <span className="font-medium">女士</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="other" id="other" className="peer sr-only" />
                  <Label
                    htmlFor="other"
                    className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-transparent p-4 hover:bg-gray-50 dark:hover:bg-gray-800 peer-data-[state=checked]:border-purple-600 peer-data-[state=checked]:bg-purple-50 dark:peer-data-[state=checked]:bg-purple-900/20 dark:peer-data-[state=checked]:text-purple-400 cursor-pointer transition-all"
                  >
                    <span className="text-2xl mb-2">🌈</span>
                    <span className="font-medium">其他</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-base">出生年月 <span className="text-red-500">*</span></Label>
              <div className="grid grid-cols-2 gap-4">
                <Select value={birthYear} onValueChange={setBirthYear}>
                    <SelectTrigger className="h-12">
                        <SelectValue placeholder="年份" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map(y => (
                            <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={birthMonth} onValueChange={setBirthMonth}>
                    <SelectTrigger className="h-12">
                        <SelectValue placeholder="月份" />
                    </SelectTrigger>
                    <SelectContent>
                        {months.map(m => (
                            <SelectItem key={m} value={m.toString()}>{m}月</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-base">居住地區 <span className="text-red-500">*</span></Label>
              <Select value={district} onValueChange={setDistrict}>
                <SelectTrigger className={`h-12 text-base ${!district ? "border-orange-300 ring-2 ring-orange-100 dark:ring-orange-900/20" : ""}`}>
                  <SelectValue placeholder="選擇您的居住區域" />
                </SelectTrigger>
                <SelectContent>
                  {HK_DISTRICTS.map((region) => (
                    <div key={region.region}>
                      <div className="px-2 py-1.5 text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50">
                        {region.region}
                      </div>
                      {region.districts.map((d) => (
                        <SelectItem key={d} value={d} className="pl-6 cursor-pointer">
                          {d}
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">這將幫助我們推薦該區專屬的商戶優惠。</p>
            </div>

            <Button 
                className="w-full h-12 text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={isLoading || !isFormValid}
            >
              {isLoading ? "儲存中..." : "完成設定，開始探索"}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

