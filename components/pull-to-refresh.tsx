"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { RefreshCw } from "lucide-react";

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  disabled?: boolean;
}

const PULL_THRESHOLD = 80;
const MAX_PULL = 120;

export function PullToRefresh({ onRefresh, children, disabled = false }: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const pullDistance = useMotionValue(0);
  
  const opacity = useTransform(pullDistance, [0, PULL_THRESHOLD], [0, 1]);
  const rotate = useTransform(pullDistance, [0, PULL_THRESHOLD, MAX_PULL], [0, 180, 360]);
  const scale = useTransform(pullDistance, [0, PULL_THRESHOLD / 2, PULL_THRESHOLD], [0.5, 0.8, 1]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (disabled || isRefreshing) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    // Only enable pull-to-refresh when at top of scroll
    if (container.scrollTop <= 0) {
      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  }, [disabled, isRefreshing]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isPulling || disabled || isRefreshing) return;
    
    const container = containerRef.current;
    if (!container || container.scrollTop > 0) {
      setIsPulling(false);
      pullDistance.set(0);
      return;
    }
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    
    if (diff > 0) {
      // Apply resistance to the pull
      const resistance = 0.5;
      const pull = Math.min(diff * resistance, MAX_PULL);
      pullDistance.set(pull);
      
      // Prevent default scroll when pulling down
      if (diff > 10) {
        e.preventDefault();
      }
    }
  }, [isPulling, disabled, isRefreshing, pullDistance]);

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling) return;
    
    setIsPulling(false);
    const currentPull = pullDistance.get();
    
    if (currentPull >= PULL_THRESHOLD && !isRefreshing) {
      setIsRefreshing(true);
      
      // Animate to loading position
      animate(pullDistance, PULL_THRESHOLD / 2, { duration: 0.2 });
      
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        animate(pullDistance, 0, { duration: 0.3 });
      }
    } else {
      // Snap back
      animate(pullDistance, 0, { duration: 0.3 });
    }
  }, [isPulling, pullDistance, isRefreshing, onRefresh]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div ref={containerRef} className="relative h-full overflow-y-auto overscroll-y-contain">
      {/* Pull indicator */}
      <motion.div 
        className="absolute left-0 right-0 flex justify-center pointer-events-none z-10"
        style={{ 
          top: -40,
          y: pullDistance,
          opacity 
        }}
      >
        <motion.div 
          className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
            isRefreshing 
              ? 'bg-blue-500 text-white' 
              : 'bg-white dark:bg-gray-800 text-blue-500'
          }`}
          style={{ scale, rotate: isRefreshing ? undefined : rotate }}
          animate={isRefreshing ? { rotate: 360 } : undefined}
          transition={isRefreshing ? { repeat: Infinity, duration: 1, ease: "linear" } : undefined}
        >
          <RefreshCw className="h-5 w-5" />
        </motion.div>
      </motion.div>
      
      {/* Content */}
      <motion.div style={{ y: pullDistance }}>
        {children}
      </motion.div>
    </div>
  );
}

