"use client";

import { useState, useEffect, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ACHIEVEMENTS, ACHIEVEMENTS_ENABLED, Achievement, UserAchievementProgress, checkAchievements } from "@/lib/achievements";
import { useWallet } from "@/lib/store/wallet-context";
import { 
  Trophy, Lock, Star, Flame, CreditCard, Target,
  ChevronRight, Medal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const categoryIcons: Record<string, React.ReactNode> = {
  beginner: <Star className="h-5 w-5" />,
  explorer: <Target className="h-5 w-5" />,
  collector: <CreditCard className="h-5 w-5" />,
  streak: <Flame className="h-5 w-5" />,
  saver: <Medal className="h-5 w-5" />,
};

const categoryNames: Record<string, string> = {
  beginner: '新手入門',
  explorer: '探索達人',
  collector: '收藏家',
  streak: '連續登入',
  saver: '精明儲蓄',
};

export default function AchievementsPage() {
  const { myCardIds, transactions } = useWallet();
  const [userProgress, setUserProgress] = useState<UserAchievementProgress | null>(null);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pickcardrebate-achievements");
    if (saved) {
      setUserProgress(JSON.parse(saved));
    } else {
      // Initialize
      setUserProgress({
        unlockedAchievements: [],
        progress: {
          calculationCount: 0,
          cardCount: myCardIds.length,
          loginStreak: 1,
          lastLoginDate: new Date().toISOString().split('T')[0],
          totalSaved: 0,
          firstActions: [],
        }
      });
    }
  }, [myCardIds.length]);

  // Update card count when wallet changes
  useEffect(() => {
    if (userProgress) {
      const newProgress = {
        ...userProgress,
        progress: {
          ...userProgress.progress,
          cardCount: myCardIds.length,
        }
      };
      setUserProgress(newProgress);
      localStorage.setItem("pickcardrebate-achievements", JSON.stringify(newProgress));
    }
  }, [myCardIds.length]);

  // Check for newly unlocked achievements
  const unlockedIds = useMemo(() => {
    if (!userProgress) return [];
    return checkAchievements(userProgress.progress);
  }, [userProgress]);

  // If feature is disabled, show coming soon
  if (!ACHIEVEMENTS_ENABLED) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-16 flex-1 flex flex-col items-center justify-center text-center">
          <Trophy className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
          <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">功能開發中</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">成就系統即將推出，敬請期待！</p>
          <Link href="/">
            <Button>返回首頁</Button>
          </Link>
        </main>
      </div>
    );
  }

  const groupedAchievements = useMemo(() => {
    const groups: Record<string, Achievement[]> = {};
    ACHIEVEMENTS.forEach(a => {
      if (!groups[a.category]) groups[a.category] = [];
      groups[a.category].push(a);
    });
    return groups;
  }, []);

  const totalUnlocked = unlockedIds.length;
  const totalAchievements = ACHIEVEMENTS.length;
  const progressPercent = (totalUnlocked / totalAchievements) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              我的成就
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              已解鎖 {totalUnlocked} / {totalAchievements} 個成就
            </p>
            <div className="mt-4 max-w-xs mx-auto">
              <Progress value={progressPercent} className="h-2" />
            </div>
          </div>

          {/* Achievement Categories */}
          <div className="space-y-6">
            {Object.entries(groupedAchievements).map(([category, achievements]) => (
              <Card key={category} className="overflow-hidden">
                <CardHeader className="pb-2 bg-gray-50 dark:bg-gray-800/50">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {categoryIcons[category]}
                    {categoryNames[category]}
                    <span className="ml-auto text-sm font-normal text-gray-500">
                      {achievements.filter(a => unlockedIds.includes(a.id)).length} / {achievements.length}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y dark:divide-gray-700">
                    {achievements.map((achievement, index) => {
                      const isUnlocked = unlockedIds.includes(achievement.id);
                      
                      return (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className={`p-4 flex items-center gap-4 ${
                            isUnlocked 
                              ? 'bg-white dark:bg-gray-800' 
                              : 'bg-gray-50/50 dark:bg-gray-900/50'
                          }`}
                        >
                          <div className={`text-3xl ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
                            {achievement.icon}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className={`font-bold ${
                                isUnlocked 
                                  ? 'text-gray-900 dark:text-white' 
                                  : 'text-gray-400 dark:text-gray-500'
                              }`}>
                                {achievement.name}
                              </h3>
                              {isUnlocked && (
                                <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full">
                                  已解鎖
                                </span>
                              )}
                            </div>
                            <p className={`text-sm ${
                              isUnlocked 
                                ? 'text-gray-600 dark:text-gray-400' 
                                : 'text-gray-400 dark:text-gray-500'
                            }`}>
                              {achievement.description}
                            </p>
                          </div>
                          
                          {!isUnlocked && (
                            <Lock className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

