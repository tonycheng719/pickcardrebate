"use client";

import { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HK_CARDS } from "@/lib/data/cards";
import { 
  ArrowLeft, ArrowRight, Check, CreditCard, 
  ShoppingBag, Plane, Utensils, Car, Film, 
  Smartphone, Gift, DollarSign, Percent, Star,
  ChevronRight, RotateCcw, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: string;
  question: string;
  description?: string;
  type: 'single' | 'multiple' | 'range';
  options: {
    id: string;
    label: string;
    icon?: React.ReactNode;
    value: string | number;
  }[];
}

const questions: Question[] = [
  {
    id: 'monthly_spend',
    question: '你每月平均信用卡消費大約幾多？',
    description: '包括所有日常消費',
    type: 'single',
    options: [
      { id: 'low', label: '$5,000 以下', value: 5000 },
      { id: 'medium', label: '$5,000 - $15,000', value: 10000 },
      { id: 'high', label: '$15,000 - $30,000', value: 22500 },
      { id: 'very_high', label: '$30,000 以上', value: 40000 },
    ]
  },
  {
    id: 'main_categories',
    question: '你最常喺邊啲地方消費？',
    description: '可選擇多個',
    type: 'multiple',
    options: [
      { id: 'dining', label: '餐飲', icon: <Utensils className="h-5 w-5" />, value: 'dining' },
      { id: 'supermarket', label: '超市', icon: <ShoppingBag className="h-5 w-5" />, value: 'supermarket' },
      { id: 'online', label: '網購', icon: <Smartphone className="h-5 w-5" />, value: 'online' },
      { id: 'travel', label: '旅遊/機票', icon: <Plane className="h-5 w-5" />, value: 'travel' },
      { id: 'transport', label: '交通', icon: <Car className="h-5 w-5" />, value: 'transport' },
      { id: 'entertainment', label: '娛樂', icon: <Film className="h-5 w-5" />, value: 'entertainment' },
    ]
  },
  {
    id: 'reward_preference',
    question: '你偏好邊種回贈方式？',
    type: 'single',
    options: [
      { id: 'cash', label: '現金回贈', icon: <DollarSign className="h-5 w-5 text-emerald-500" />, value: 'cash' },
      { id: 'miles', label: '飛行里數', icon: <Plane className="h-5 w-5 text-sky-500" />, value: 'miles' },
      { id: 'points', label: '積分換禮品', icon: <Gift className="h-5 w-5 text-purple-500" />, value: 'points' },
      { id: 'any', label: '無所謂，最抵就好', icon: <Percent className="h-5 w-5 text-orange-500" />, value: 'any' },
    ]
  },
  {
    id: 'annual_fee',
    question: '你可以接受年費嗎？',
    type: 'single',
    options: [
      { id: 'no', label: '唔想俾年費', value: 0 },
      { id: 'low', label: '可接受 $2,000 以下', value: 2000 },
      { id: 'medium', label: '可接受 $2,000 - $5,000', value: 5000 },
      { id: 'high', label: '只要回贈夠高就可以', value: 99999 },
    ]
  },
  {
    id: 'foreign_spend',
    question: '你有幾常喺海外/外幣消費？',
    type: 'single',
    options: [
      { id: 'never', label: '幾乎冇', value: 'never' },
      { id: 'sometimes', label: '間中（每年幾次旅行）', value: 'sometimes' },
      { id: 'often', label: '經常（網購外幣/常旅行）', value: 'often' },
    ]
  },
];

interface Answers {
  [key: string]: string | string[] | number;
}

export default function CardQuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [featureEnabled, setFeatureEnabled] = useState<boolean | null>(null);

  // Fetch feature flag from backend
  useEffect(() => {
    async function checkFeature() {
      try {
        const res = await fetch('/api/features');
        const data = await res.json();
        setFeatureEnabled(data.quiz_enabled);
      } catch (e) {
        setFeatureEnabled(false);
      }
    }
    checkFeature();
  }, []);

  // Loading state
  if (featureEnabled === null) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-16 flex-1 flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </main>
      </div>
    );
  }

  // If feature is disabled, show coming soon
  if (!featureEnabled) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-16 flex-1 flex flex-col items-center justify-center text-center">
          <CreditCard className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
          <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">功能開發中</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">信用卡推薦問卷即將推出，敬請期待！</p>
          <Link href="/">
            <Button>返回首頁</Button>
          </Link>
        </main>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (value: string | number) => {
    const question = questions[currentStep];
    
    if (question.type === 'multiple') {
      const currentAnswers = (answers[question.id] as string[]) || [];
      const newAnswers = currentAnswers.includes(value as string)
        ? currentAnswers.filter(a => a !== value)
        : [...currentAnswers, value as string];
      setAnswers({ ...answers, [question.id]: newAnswers });
    } else {
      setAnswers({ ...answers, [question.id]: value });
    }
  };

  const canProceed = () => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0;
    }
    return answer !== undefined;
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  // Calculate recommended cards based on answers
  const recommendedCards = useMemo(() => {
    if (!showResults) return [];

    const scores: Record<string, number> = {};
    
    HK_CARDS.forEach(card => {
      let score = 0;
      
      // Score based on reward preference
      const rewardPref = answers.reward_preference;
      if (rewardPref === 'miles' && card.rewardConfig?.currency?.includes('里')) {
        score += 30;
      } else if (rewardPref === 'cash' && !card.rewardConfig) {
        score += 20;
      }
      
      // Score based on categories
      const categories = (answers.main_categories as string[]) || [];
      card.rules.forEach(rule => {
        if (categories.includes('dining') && rule.matchType === 'category' && 
            (rule.matchValue === 'dining' || (Array.isArray(rule.matchValue) && rule.matchValue.includes('dining')))) {
          score += rule.percentage * 2;
        }
        if (categories.includes('supermarket') && rule.matchType === 'category' && 
            (rule.matchValue === 'supermarket' || (Array.isArray(rule.matchValue) && rule.matchValue.includes('supermarket')))) {
          score += rule.percentage * 2;
        }
        if (categories.includes('online') && rule.matchType === 'category' && 
            (rule.matchValue === 'online' || (Array.isArray(rule.matchValue) && rule.matchValue.includes('online')))) {
          score += rule.percentage * 2;
        }
        if (categories.includes('travel') && rule.matchType === 'category' && 
            (rule.matchValue === 'travel' || (Array.isArray(rule.matchValue) && rule.matchValue.includes('travel')))) {
          score += rule.percentage * 2;
        }
      });
      
      // Score based on annual fee tolerance
      const feeTolerance = answers.annual_fee as number;
      if (!card.annualFee || card.annualFee <= feeTolerance) {
        score += 15;
      }
      
      // Score based on foreign currency usage
      const foreignSpend = answers.foreign_spend;
      if (foreignSpend === 'often' && card.foreignCurrencyFee === 0) {
        score += 25;
      } else if (foreignSpend === 'sometimes' && card.foreignCurrencyFee !== undefined && card.foreignCurrencyFee < 2) {
        score += 10;
      }
      
      scores[card.id] = score;
    });

    // Sort by score and return top 5
    return HK_CARDS
      .map(card => ({ card, score: scores[card.id] }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [showResults, answers]);

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-8 flex-1">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Star className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                為你推薦的信用卡
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                根據你的消費習慣，以下信用卡最適合你
              </p>
            </div>

            <div className="space-y-4">
              {recommendedCards.map(({ card, score }, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/cards/${card.id}`}>
                    <Card className={`hover:shadow-lg transition-shadow cursor-pointer ${
                      index === 0 ? 'border-2 border-emerald-400 dark:border-emerald-600' : ''
                    }`}>
                      <CardContent className="p-4 flex items-center gap-4">
                        {index === 0 && (
                          <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                            最推薦
                          </div>
                        )}
                        
                        <div className="text-2xl font-bold text-gray-300 dark:text-gray-600 w-8">
                          #{index + 1}
                        </div>
                        
                        {card.imageUrl ? (
                          <div className="w-16 h-10 rounded border bg-white flex items-center justify-center overflow-hidden shrink-0">
                            <img src={card.imageUrl} alt={card.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                          </div>
                        ) : (
                          <div className={`w-16 h-10 rounded ${card.style?.bgColor || 'bg-gray-500'} shrink-0`}></div>
                        )}
                        
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400">{card.bank}</p>
                          <h3 className="font-bold text-gray-900 dark:text-white">{card.name}</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {card.tags?.slice(0, 2).map(tag => (
                              <span key={tag} className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <Button variant="outline" onClick={resetQuiz} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                重新測試
              </Button>
              <Link href="/cards">
                <Button className="gap-2">
                  查看所有信用卡
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>問題 {currentStep + 1} / {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {currentQuestion.question}
              </h1>
              {currentQuestion.description && (
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {currentQuestion.description}
                </p>
              )}

              <div className={`grid gap-3 ${currentQuestion.type === 'multiple' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {currentQuestion.options.map(option => {
                  const isSelected = currentQuestion.type === 'multiple'
                    ? ((answers[currentQuestion.id] as string[]) || []).includes(option.value as string)
                    : answers[currentQuestion.id] === option.value;

                  return (
                    <motion.button
                      key={option.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {option.icon && (
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-800'}`}>
                            {option.icon}
                          </div>
                        )}
                        <span className={`font-medium ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
                          {option.label}
                        </span>
                        {isSelected && (
                          <Check className="h-5 w-5 text-blue-500 ml-auto" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              上一題
            </Button>
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="gap-2"
            >
              {currentStep === questions.length - 1 ? '查看結果' : '下一題'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

