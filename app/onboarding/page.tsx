"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/lib/store/wallet-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Navbar } from "@/components/navbar";
import { toast } from "sonner";

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
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [district, setDistrict] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Redirect if not logged in
    if (!user && !isLoading) {
        // Allow time for hydration, but eventually redirect
    }
    
    // Redirect if already completed
    if (user && user.gender && user.district) {
      router.replace("/");
    }
  }, [user, router, isLoading]);

  const handleSubmit = async () => {
    if (!district) {
      toast.error("請選擇居住地區");
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile({
        gender,
        district
      });
      toast.success("設定完成！");
      router.push("/");
    } catch (error) {
      toast.error("儲存失敗，請稍後再試");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
            
            <div className="space-y-4">
              <Label className="text-base">您的性別</Label>
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
              <Label className="text-base">居住地區</Label>
              <Select value={district} onValueChange={setDistrict}>
                <SelectTrigger className="h-12 text-base">
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
                className="w-full h-12 text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
                onClick={handleSubmit}
                disabled={isLoading}
            >
              {isLoading ? "儲存中..." : "完成設定，開始探索"}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

