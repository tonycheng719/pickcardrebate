// HIDDEN FEATURE - Gamification Achievement System
// Set to true to enable
export const ACHIEVEMENTS_ENABLED = false;

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji
  category: 'beginner' | 'explorer' | 'saver' | 'collector' | 'streak';
  condition: {
    type: 'card_count' | 'calculation_count' | 'login_streak' | 'total_saved' | 'category_master' | 'first_action';
    target: number;
    extra?: string;
  };
  reward?: {
    type: 'badge' | 'title';
    value: string;
  };
}

export const ACHIEVEMENTS: Achievement[] = [
  // Beginner achievements
  {
    id: 'first_calculation',
    name: '初試啼聲',
    description: '完成第一次回贈計算',
    icon: '🎯',
    category: 'beginner',
    condition: { type: 'first_action', target: 1, extra: 'calculation' },
  },
  {
    id: 'first_card_added',
    name: '錢包起步',
    description: '將第一張信用卡加入錢包',
    icon: '💳',
    category: 'beginner',
    condition: { type: 'first_action', target: 1, extra: 'add_card' },
  },
  {
    id: 'first_transaction',
    name: '記賬達人',
    description: '記錄第一筆消費',
    icon: '📝',
    category: 'beginner',
    condition: { type: 'first_action', target: 1, extra: 'transaction' },
  },

  // Explorer achievements
  {
    id: 'calculator_10',
    name: '精打細算',
    description: '使用計算機 10 次',
    icon: '🧮',
    category: 'explorer',
    condition: { type: 'calculation_count', target: 10 },
  },
  {
    id: 'calculator_50',
    name: '回贈專家',
    description: '使用計算機 50 次',
    icon: '📊',
    category: 'explorer',
    condition: { type: 'calculation_count', target: 50 },
  },
  {
    id: 'calculator_100',
    name: '計算大師',
    description: '使用計算機 100 次',
    icon: '🏆',
    category: 'explorer',
    condition: { type: 'calculation_count', target: 100 },
  },

  // Collector achievements
  {
    id: 'cards_3',
    name: '小小收藏家',
    description: '錢包中擁有 3 張信用卡',
    icon: '🎴',
    category: 'collector',
    condition: { type: 'card_count', target: 3 },
  },
  {
    id: 'cards_5',
    name: '卡片收藏家',
    description: '錢包中擁有 5 張信用卡',
    icon: '🃏',
    category: 'collector',
    condition: { type: 'card_count', target: 5 },
  },
  {
    id: 'cards_10',
    name: '終極收藏家',
    description: '錢包中擁有 10 張信用卡',
    icon: '👑',
    category: 'collector',
    condition: { type: 'card_count', target: 10 },
  },

  // Streak achievements
  {
    id: 'streak_3',
    name: '三日連登',
    description: '連續 3 天使用 PickCardRebate',
    icon: '🔥',
    category: 'streak',
    condition: { type: 'login_streak', target: 3 },
  },
  {
    id: 'streak_7',
    name: '一週達人',
    description: '連續 7 天使用 PickCardRebate',
    icon: '⚡',
    category: 'streak',
    condition: { type: 'login_streak', target: 7 },
  },
  {
    id: 'streak_30',
    name: '忠實用戶',
    description: '連續 30 天使用 PickCardRebate',
    icon: '💎',
    category: 'streak',
    condition: { type: 'login_streak', target: 30 },
  },

  // Saver achievements
  {
    id: 'saved_100',
    name: '小試牛刀',
    description: '累計節省 $100 回贈',
    icon: '💰',
    category: 'saver',
    condition: { type: 'total_saved', target: 100 },
  },
  {
    id: 'saved_500',
    name: '精明消費者',
    description: '累計節省 $500 回贈',
    icon: '💵',
    category: 'saver',
    condition: { type: 'total_saved', target: 500 },
  },
  {
    id: 'saved_1000',
    name: '回贈王者',
    description: '累計節省 $1,000 回贈',
    icon: '🤑',
    category: 'saver',
    condition: { type: 'total_saved', target: 1000 },
  },
];

export interface UserAchievementProgress {
  unlockedAchievements: string[];
  progress: {
    calculationCount: number;
    cardCount: number;
    loginStreak: number;
    lastLoginDate: string;
    totalSaved: number;
    firstActions: string[];
  };
}

export function checkAchievements(progress: UserAchievementProgress['progress']): string[] {
  const newlyUnlocked: string[] = [];

  ACHIEVEMENTS.forEach(achievement => {
    const { condition } = achievement;
    let isUnlocked = false;

    switch (condition.type) {
      case 'calculation_count':
        isUnlocked = progress.calculationCount >= condition.target;
        break;
      case 'card_count':
        isUnlocked = progress.cardCount >= condition.target;
        break;
      case 'login_streak':
        isUnlocked = progress.loginStreak >= condition.target;
        break;
      case 'total_saved':
        isUnlocked = progress.totalSaved >= condition.target;
        break;
      case 'first_action':
        isUnlocked = progress.firstActions.includes(condition.extra || '');
        break;
    }

    if (isUnlocked) {
      newlyUnlocked.push(achievement.id);
    }
  });

  return newlyUnlocked;
}

export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find(a => a.id === id);
}

