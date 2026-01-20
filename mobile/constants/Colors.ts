/**
 * PickCardRebate 設計系統 - 顏色
 * 與 Web 版本保持一致
 */

const tintColorLight = '#2563EB'; // Blue-600
const tintColorDark = '#60A5FA';  // Blue-400

export const Colors = {
  light: {
    // 基礎顏色
    text: '#111827',           // Gray-900
    textSecondary: '#6B7280',  // Gray-500
    textMuted: '#9CA3AF',      // Gray-400
    background: '#F9FAFB',     // Gray-50
    backgroundCard: '#FFFFFF',
    
    // 品牌顏色
    tint: tintColorLight,
    primary: '#2563EB',        // Blue-600
    primaryLight: '#DBEAFE',   // Blue-100
    
    // 功能顏色
    success: '#10B981',        // Emerald-500
    successLight: '#D1FAE5',   // Emerald-100
    warning: '#F59E0B',        // Amber-500
    warningLight: '#FEF3C7',   // Amber-100
    error: '#EF4444',          // Red-500
    errorLight: '#FEE2E2',     // Red-100
    
    // 邊框與分隔
    border: '#E5E7EB',         // Gray-200
    borderLight: '#F3F4F6',    // Gray-100
    
    // Tab 導航
    tabIconDefault: '#9CA3AF', // Gray-400
    tabIconSelected: tintColorLight,
    
    // 信用卡相關
    rewardGreen: '#059669',    // Emerald-600
    rewardGreenLight: '#ECFDF5', // Emerald-50
  },
  dark: {
    // 基礎顏色
    text: '#F9FAFB',           // Gray-50
    textSecondary: '#9CA3AF',  // Gray-400
    textMuted: '#6B7280',      // Gray-500
    background: '#030712',     // Gray-950
    backgroundCard: '#111827', // Gray-900
    
    // 品牌顏色
    tint: tintColorDark,
    primary: '#60A5FA',        // Blue-400
    primaryLight: '#1E3A5F',   // Custom dark blue
    
    // 功能顏色
    success: '#34D399',        // Emerald-400
    successLight: '#064E3B',   // Emerald-900
    warning: '#FBBF24',        // Amber-400
    warningLight: '#78350F',   // Amber-900
    error: '#F87171',          // Red-400
    errorLight: '#7F1D1D',     // Red-900
    
    // 邊框與分隔
    border: '#374151',         // Gray-700
    borderLight: '#1F2937',    // Gray-800
    
    // Tab 導航
    tabIconDefault: '#6B7280', // Gray-500
    tabIconSelected: tintColorDark,
    
    // 信用卡相關
    rewardGreen: '#34D399',    // Emerald-400
    rewardGreenLight: '#064E3B', // Emerald-900
  },
};

// 銀行品牌顏色
export const BankColors: Record<string, { bg: string; text: string }> = {
  'HSBC': { bg: '#DB0011', text: '#FFFFFF' },
  'BOC': { bg: '#E31937', text: '#FFFFFF' },
  'SCB': { bg: '#0072CE', text: '#FFFFFF' },
  'Citi': { bg: '#003B70', text: '#FFFFFF' },
  'DBS': { bg: '#E31C3D', text: '#FFFFFF' },
  'Hang Seng': { bg: '#00A651', text: '#FFFFFF' },
  'BEA': { bg: '#0033A0', text: '#FFFFFF' },
  'ICBC': { bg: '#C8102E', text: '#FFFFFF' },
  'CCB': { bg: '#003087', text: '#FFFFFF' },
  'CMB': { bg: '#ED1C24', text: '#FFFFFF' },
  'BOCHK': { bg: '#E31937', text: '#FFFFFF' },
  'Fubon': { bg: '#003C71', text: '#FFFFFF' },
  'OCBC': { bg: '#ED1C24', text: '#FFFFFF' },
  'Wing Lung': { bg: '#003087', text: '#FFFFFF' },
  'Dah Sing': { bg: '#003C71', text: '#FFFFFF' },
  'WeLab': { bg: '#6366F1', text: '#FFFFFF' },
  'ZA Bank': { bg: '#FF6B35', text: '#FFFFFF' },
  'Mox': { bg: '#FF3366', text: '#FFFFFF' },
  'PAOB': { bg: '#4A90A4', text: '#FFFFFF' },
  'livi': { bg: '#00D4AA', text: '#000000' },
  'Airstar': { bg: '#1E40AF', text: '#FFFFFF' },
  'default': { bg: '#6B7280', text: '#FFFFFF' },
};
