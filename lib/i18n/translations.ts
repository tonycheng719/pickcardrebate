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

// URL 路徑對應
export const localePaths: Record<Locale, string> = {
  'zh-HK': '', // 預設語言，無路徑前綴
  'zh-CN': '/zh-cn',
  'en': '/en',
};

export const translations = {
  'zh-HK': {
    // SEO 元數據
    seo: {
      siteName: 'PickCardRebate',
      homeTitle: 'PickCardRebate | 香港信用卡回贈比較計算機 - 一鍵找出最高回贈',
      homeDescription: '香港最強信用卡回贈計算機！即時比較全港信用卡優惠，輸入商戶金額即知邊張卡最抵。支援超市、餐飲、網購、旅遊等消費類別，助你每次消費都賺盡回贈。',
      cardsTitle: '信用卡庫 | 香港所有信用卡回贈一覽',
      cardsDescription: '瀏覽香港所有銀行信用卡，比較年費、迎新優惠、回贈率，找出最適合你的信用卡。',
      discoverTitle: '探索 | 信用卡優惠攻略與最新資訊',
      discoverDescription: '最新信用卡優惠、消費攻略、回贈教學，助你成為精明消費者。',
      calculatorTitle: '回贈計算機 | 即時計算最高回贈信用卡',
      calculatorDescription: '輸入消費金額和商戶，即時計算哪張信用卡回贈最高，支援現金回贈和飛行里數。',
      walletTitle: '我的錢包 | 管理你的信用卡和消費記錄',
      walletDescription: '管理你持有的信用卡，追蹤消費記錄和回贈。',
      rankingsTitle: '信用卡排行榜 | 各類別最佳信用卡推薦',
      rankingsDescription: '按消費類別排名的最佳信用卡推薦，找出超市、餐飲、網購、旅遊等最高回贈卡。',
    },
    
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
      perMonth: '每月',
      perYear: '每年',
      free: '免費',
      waived: '豁免',
      viewAll: '查看全部',
      learnMore: '了解更多',
      tryNow: '立即試用',
    },
    
    // 導航
    nav: {
      home: '首頁',
      calculator: '回贈計算機',
      cards: '信用卡庫',
      discover: '探索',
      wallet: '我的錢包',
      rankings: '排行榜',
      compare: '比較',
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
      yourCards: '你持有的卡',
      otherCards: '其他信用卡',
      noCardsOwned: '你還沒有添加信用卡到卡包',
      addCardsPrompt: '添加你持有的信用卡，獲取更個人化的推薦',
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
      bank: '發卡銀行',
      cardType: '卡類型',
      features: '主要特色',
      rebateCategories: '回贈類別',
      termsAndConditions: '條款及細則',
      officialPage: '官方頁面',
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
      noCards: '你還沒有添加信用卡',
      addFirstCard: '添加你的第一張信用卡',
      recentTransactions: '最近消費',
      noTransactions: '暫無消費記錄',
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
      loginRequired: '請先登入',
      loginToComment: '登入後即可發表評論',
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
      privacy: '私隱政策',
      terms: '服務條款',
    },
    
    // 評論
    comments: {
      title: '用戶評價',
      writeComment: '撰寫評論',
      placeholder: '分享你的使用體驗...',
      submit: '發表',
      noComments: '暫無評論，成為第一個評論的人！',
      loginToComment: '登入後即可參與討論',
      loadMore: '載入更多',
      reply: '回覆',
      like: '讚',
      report: '舉報',
    },
    
    // 頁腳
    footer: {
      about: '關於我們',
      terms: '服務條款',
      privacy: '私隱政策',
      contact: '聯絡我們',
      copyright: '© 2025 PickCardRebate. 版權所有。',
      joinWhatsApp: '加入 WhatsApp 討論群',
    },
  },
  
  'zh-CN': {
    // SEO 元数据
    seo: {
      siteName: 'PickCardRebate',
      homeTitle: 'PickCardRebate | 香港信用卡回赠比较计算器 - 一键找出最高回赠',
      homeDescription: '香港最强信用卡回赠计算器！即时比较全港信用卡优惠，输入商户金额即知哪张卡最划算。支持超市、餐饮、网购、旅游等消费类别，助你每次消费都赚尽回赠。',
      cardsTitle: '信用卡库 | 香港所有信用卡回赠一览',
      cardsDescription: '浏览香港所有银行信用卡，比较年费、迎新优惠、回赠率，找出最适合你的信用卡。',
      discoverTitle: '探索 | 信用卡优惠攻略与最新资讯',
      discoverDescription: '最新信用卡优惠、消费攻略、回赠教学，助你成为精明消费者。',
      calculatorTitle: '回赠计算器 | 即时计算最高回赠信用卡',
      calculatorDescription: '输入消费金额和商户，即时计算哪张信用卡回赠最高，支持现金回赠和飞行里程。',
      walletTitle: '我的钱包 | 管理你的信用卡和消费记录',
      walletDescription: '管理你持有的信用卡，追踪消费记录和回赠。',
      rankingsTitle: '信用卡排行榜 | 各类别最佳信用卡推荐',
      rankingsDescription: '按消费类别排名的最佳信用卡推荐，找出超市、餐饮、网购、旅游等最高回赠卡。',
    },
    
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
      perMonth: '每月',
      perYear: '每年',
      free: '免费',
      waived: '豁免',
      viewAll: '查看全部',
      learnMore: '了解更多',
      tryNow: '立即试用',
    },
    
    // 导航
    nav: {
      home: '首页',
      calculator: '回赠计算器',
      cards: '信用卡库',
      discover: '探索',
      wallet: '我的钱包',
      rankings: '排行榜',
      compare: '比较',
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
      yourCards: '你持有的卡',
      otherCards: '其他信用卡',
      noCardsOwned: '你还没有添加信用卡到卡包',
      addCardsPrompt: '添加你持有的信用卡，获取更个性化的推荐',
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
      bank: '发卡银行',
      cardType: '卡类型',
      features: '主要特色',
      rebateCategories: '回赠类别',
      termsAndConditions: '条款及细则',
      officialPage: '官方页面',
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
      noCards: '你还没有添加信用卡',
      addFirstCard: '添加你的第一张信用卡',
      recentTransactions: '最近消费',
      noTransactions: '暂无消费记录',
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
      loginRequired: '请先登录',
      loginToComment: '登录后即可发表评论',
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
      privacy: '隐私政策',
      terms: '服务条款',
    },
    
    // 评论
    comments: {
      title: '用户评价',
      writeComment: '撰写评论',
      placeholder: '分享你的使用体验...',
      submit: '发表',
      noComments: '暂无评论，成为第一个评论的人！',
      loginToComment: '登录后即可参与讨论',
      loadMore: '加载更多',
      reply: '回复',
      like: '赞',
      report: '举报',
    },
    
    // 页脚
    footer: {
      about: '关于我们',
      terms: '服务条款',
      privacy: '隐私政策',
      contact: '联系我们',
      copyright: '© 2025 PickCardRebate. 版权所有。',
      joinWhatsApp: '加入 WhatsApp 讨论群',
    },
  },
  
  'en': {
    // SEO Metadata
    seo: {
      siteName: 'PickCardRebate',
      homeTitle: 'PickCardRebate | Hong Kong Credit Card Rebate Calculator - Find the Best Cashback',
      homeDescription: 'The ultimate Hong Kong credit card rebate calculator! Instantly compare credit card offers across all banks. Enter merchant and amount to find the card with highest cashback. Supports supermarkets, dining, online shopping, travel, and more.',
      cardsTitle: 'Credit Card Library | All Hong Kong Credit Card Rebates',
      cardsDescription: 'Browse all Hong Kong bank credit cards. Compare annual fees, welcome offers, and rebate rates to find your perfect card.',
      discoverTitle: 'Discover | Credit Card Deals & Tips',
      discoverDescription: 'Latest credit card promotions, spending guides, and rebate tips to help you become a smart consumer.',
      calculatorTitle: 'Rebate Calculator | Instantly Find the Best Cashback Card',
      calculatorDescription: 'Enter spending amount and merchant to instantly calculate which credit card offers the highest rebate. Supports cash rebate and miles.',
      walletTitle: 'My Wallet | Manage Your Credit Cards & Transactions',
      walletDescription: 'Manage your credit cards and track spending records and rebates.',
      rankingsTitle: 'Credit Card Rankings | Best Cards by Category',
      rankingsDescription: 'Top credit card recommendations by spending category. Find the best cashback cards for supermarkets, dining, online shopping, and travel.',
    },
    
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
      perMonth: 'per month',
      perYear: 'per year',
      free: 'Free',
      waived: 'Waived',
      viewAll: 'View All',
      learnMore: 'Learn More',
      tryNow: 'Try Now',
    },
    
    // Navigation
    nav: {
      home: 'Home',
      calculator: 'Calculator',
      cards: 'Credit Cards',
      discover: 'Discover',
      wallet: 'My Wallet',
      rankings: 'Rankings',
      compare: 'Compare',
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
      yourCards: 'Your Cards',
      otherCards: 'Other Cards',
      noCardsOwned: "You haven't added any cards to your wallet",
      addCardsPrompt: 'Add your credit cards for personalized recommendations',
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
      bank: 'Issuing Bank',
      cardType: 'Card Type',
      features: 'Key Features',
      rebateCategories: 'Rebate Categories',
      termsAndConditions: 'Terms & Conditions',
      officialPage: 'Official Page',
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
      noCards: "You haven't added any credit cards",
      addFirstCard: 'Add your first credit card',
      recentTransactions: 'Recent Transactions',
      noTransactions: 'No transactions yet',
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
      loginRequired: 'Please login first',
      loginToComment: 'Login to leave a comment',
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
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
    
    // Comments
    comments: {
      title: 'User Reviews',
      writeComment: 'Write a review',
      placeholder: 'Share your experience...',
      submit: 'Submit',
      noComments: 'No reviews yet. Be the first to review!',
      loginToComment: 'Login to join the discussion',
      loadMore: 'Load More',
      reply: 'Reply',
      like: 'Like',
      report: 'Report',
    },
    
    // Footer
    footer: {
      about: 'About Us',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      contact: 'Contact Us',
      copyright: '© 2025 PickCardRebate. All rights reserved.',
      joinWhatsApp: 'Join WhatsApp Group',
    },
  },
};

export function getTranslation(locale: Locale = 'zh-HK') {
  return translations[locale] || translations['zh-HK'];
}

// 獲取當前語言的 SEO 標籤語言代碼
export function getHreflangCode(locale: Locale): string {
  switch (locale) {
    case 'zh-HK':
      return 'zh-Hant-HK';
    case 'zh-CN':
      return 'zh-Hans-CN';
    case 'en':
      return 'en';
    default:
      return 'zh-Hant-HK';
  }
}
