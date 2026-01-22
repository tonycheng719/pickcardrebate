export type Locale = 'zh-HK' | 'zh-CN' | 'en';

export const localeNames: Record<Locale, string> = {
  'zh-HK': '繁體中文',
  'zh-CN': '简体中文',
  'en': 'English',
};

export const localeFlags: Record<Locale, string> = {
  'zh-HK': '🇭🇰',
  'zh-CN': '🇨🇳',
  'en': '🇬🇧',
};

export const translations = {
  'zh-HK': {
    // 通用
    common: {
      loading: '載入中...',
      error: '發生錯誤',
      save: '儲存',
      cancel: '取消',
      confirm: '確認',
      delete: '刪除',
      edit: '編輯',
      share: '分享',
      back: '返回',
      next: '下一步',
      submit: '提交',
      search: '搜尋',
      close: '關閉',
      more: '更多',
      all: '全部',
      none: '無',
      yes: '是',
      no: '否',
    },
    
    // 導航
    nav: {
      home: '首頁',
      calculator: '回贈計算機',
      cards: '信用卡庫',
      discover: '探索',
      wallet: '我的錢包',
      login: '登入',
      logout: '登出',
      settings: '設定',
    },
    
    // 計算機
    calculator: {
      title: '信用卡回贈計算機',
      subtitle: '選擇商戶與消費方式，即時計算最高回贈信用卡。',
      amount: '消費金額',
      amountPlaceholder: '輸入金額',
      merchant: '商戶',
      merchantPlaceholder: '選擇或搜尋商戶',
      paymentMethod: '付款方式',
      calculate: '計算',
      result: '計算結果',
      bestCard: '最佳信用卡',
      rebateRate: '回贈率',
      rebateAmount: '回贈金額',
      noCards: '沒有符合條件的信用卡',
      cashRebate: '現金回贈',
      milesRebate: '飛行里數',
    },
    
    // 卡片
    cards: {
      title: '信用卡庫',
      subtitle: '瀏覽所有信用卡及其回贈優惠',
      allCards: '所有信用卡',
      myCards: '我的卡包',
      addToWallet: '加入卡包',
      removeFromWallet: '從卡包移除',
      compare: '比較',
      details: '詳情',
      rating: '評分',
      reviews: '評論',
      noReviews: '暫無評論',
      writeReview: '撰寫評論',
      annualFee: '年費',
      minIncome: '最低年薪',
      welcomeOffer: '迎新優惠',
      apply: '立即申請',
    },
    
    // 錢包
    wallet: {
      title: '我的錢包',
      myCards: '我的卡包',
      transactions: '消費記錄',
      history: '計算歷史',
      reports: '消費報告',
      monthlySpending: '本月支出',
      monthlyRebate: '本月回贈',
      addTransaction: '新增記錄',
      selectCard: '選擇信用卡',
      selectCardHint: '只顯示您卡包中的信用卡',
    },
    
    // 認證
    auth: {
      login: '登入',
      register: '註冊',
      logout: '登出',
      email: '電子郵件',
      password: '密碼',
      forgotPassword: '忘記密碼',
      loginWithGoogle: '使用 Google 登入',
      loginWithApple: '使用 Apple 登入',
      noAccount: '還沒有帳號？',
      hasAccount: '已經有帳號？',
    },
    
    // 設定
    settings: {
      title: '設定',
      theme: '主題',
      themeLight: '淺色',
      themeDark: '深色',
      themeSystem: '跟隨系統',
      language: '語言',
      notifications: '通知',
      clearCache: '清除快取',
      about: '關於',
      version: '版本',
    },
  },
  
  'zh-CN': {
    // 通用
    common: {
      loading: '加载中...',
      error: '发生错误',
      save: '保存',
      cancel: '取消',
      confirm: '确认',
      delete: '删除',
      edit: '编辑',
      share: '分享',
      back: '返回',
      next: '下一步',
      submit: '提交',
      search: '搜索',
      close: '关闭',
      more: '更多',
      all: '全部',
      none: '无',
      yes: '是',
      no: '否',
    },
    
    // 导航
    nav: {
      home: '首页',
      calculator: '回赠计算器',
      cards: '信用卡库',
      discover: '探索',
      wallet: '我的钱包',
      login: '登录',
      logout: '登出',
      settings: '设置',
    },
    
    // 计算器
    calculator: {
      title: '信用卡回赠计算器',
      subtitle: '选择商户与消费方式，即时计算最高回赠信用卡。',
      amount: '消费金额',
      amountPlaceholder: '输入金额',
      merchant: '商户',
      merchantPlaceholder: '选择或搜索商户',
      paymentMethod: '付款方式',
      calculate: '计算',
      result: '计算结果',
      bestCard: '最佳信用卡',
      rebateRate: '回赠率',
      rebateAmount: '回赠金额',
      noCards: '没有符合条件的信用卡',
      cashRebate: '现金回赠',
      milesRebate: '飞行里程',
    },
    
    // 卡片
    cards: {
      title: '信用卡库',
      subtitle: '浏览所有信用卡及其回赠优惠',
      allCards: '所有信用卡',
      myCards: '我的卡包',
      addToWallet: '加入卡包',
      removeFromWallet: '从卡包移除',
      compare: '比较',
      details: '详情',
      rating: '评分',
      reviews: '评论',
      noReviews: '暂无评论',
      writeReview: '撰写评论',
      annualFee: '年费',
      minIncome: '最低年薪',
      welcomeOffer: '迎新优惠',
      apply: '立即申请',
    },
    
    // 钱包
    wallet: {
      title: '我的钱包',
      myCards: '我的卡包',
      transactions: '消费记录',
      history: '计算历史',
      reports: '消费报告',
      monthlySpending: '本月支出',
      monthlyRebate: '本月回赠',
      addTransaction: '新增记录',
      selectCard: '选择信用卡',
      selectCardHint: '只显示您卡包中的信用卡',
    },
    
    // 认证
    auth: {
      login: '登录',
      register: '注册',
      logout: '登出',
      email: '电子邮件',
      password: '密码',
      forgotPassword: '忘记密码',
      loginWithGoogle: '使用 Google 登录',
      loginWithApple: '使用 Apple 登录',
      noAccount: '还没有账号？',
      hasAccount: '已经有账号？',
    },
    
    // 设置
    settings: {
      title: '设置',
      theme: '主题',
      themeLight: '浅色',
      themeDark: '深色',
      themeSystem: '跟随系统',
      language: '语言',
      notifications: '通知',
      clearCache: '清除缓存',
      about: '关于',
      version: '版本',
    },
  },
  
  'en': {
    // Common
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      save: 'Save',
      cancel: 'Cancel',
      confirm: 'Confirm',
      delete: 'Delete',
      edit: 'Edit',
      share: 'Share',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      search: 'Search',
      close: 'Close',
      more: 'More',
      all: 'All',
      none: 'None',
      yes: 'Yes',
      no: 'No',
    },
    
    // Navigation
    nav: {
      home: 'Home',
      calculator: 'Rebate Calculator',
      cards: 'Credit Cards',
      discover: 'Discover',
      wallet: 'My Wallet',
      login: 'Login',
      logout: 'Logout',
      settings: 'Settings',
    },
    
    // Calculator
    calculator: {
      title: 'Credit Card Rebate Calculator',
      subtitle: 'Select a merchant and payment method to find the best rebate.',
      amount: 'Amount',
      amountPlaceholder: 'Enter amount',
      merchant: 'Merchant',
      merchantPlaceholder: 'Select or search merchant',
      paymentMethod: 'Payment Method',
      calculate: 'Calculate',
      result: 'Result',
      bestCard: 'Best Credit Card',
      rebateRate: 'Rebate Rate',
      rebateAmount: 'Rebate Amount',
      noCards: 'No matching credit cards found',
      cashRebate: 'Cash Rebate',
      milesRebate: 'Miles',
    },
    
    // Cards
    cards: {
      title: 'Credit Card Library',
      subtitle: 'Browse all credit cards and their rebate offers',
      allCards: 'All Cards',
      myCards: 'My Cards',
      addToWallet: 'Add to Wallet',
      removeFromWallet: 'Remove from Wallet',
      compare: 'Compare',
      details: 'Details',
      rating: 'Rating',
      reviews: 'Reviews',
      noReviews: 'No reviews yet',
      writeReview: 'Write a review',
      annualFee: 'Annual Fee',
      minIncome: 'Min. Income',
      welcomeOffer: 'Welcome Offer',
      apply: 'Apply Now',
    },
    
    // Wallet
    wallet: {
      title: 'My Wallet',
      myCards: 'My Cards',
      transactions: 'Transactions',
      history: 'Calculation History',
      reports: 'Spending Reports',
      monthlySpending: 'Monthly Spending',
      monthlyRebate: 'Monthly Rebate',
      addTransaction: 'Add Transaction',
      selectCard: 'Select Credit Card',
      selectCardHint: 'Only cards in your wallet are shown',
    },
    
    // Auth
    auth: {
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot Password',
      loginWithGoogle: 'Login with Google',
      loginWithApple: 'Login with Apple',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
    },
    
    // Settings
    settings: {
      title: 'Settings',
      theme: 'Theme',
      themeLight: 'Light',
      themeDark: 'Dark',
      themeSystem: 'System',
      language: 'Language',
      notifications: 'Notifications',
      clearCache: 'Clear Cache',
      about: 'About',
      version: 'Version',
    },
  },
};

export function getTranslation(locale: Locale = 'zh-HK') {
  return translations[locale] || translations['zh-HK'];
}
