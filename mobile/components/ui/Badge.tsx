import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'primary';
  size?: 'sm' | 'md';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  style,
  textStyle,
}: BadgeProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const getBadgeStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: Layout.radius.full,
      alignSelf: 'flex-start',
    };

    // Size
    switch (size) {
      case 'sm':
        baseStyle.paddingVertical = 2;
        baseStyle.paddingHorizontal = Layout.spacing.sm;
        break;
      default:
        baseStyle.paddingVertical = Layout.spacing.xs;
        baseStyle.paddingHorizontal = Layout.spacing.md;
    }

    // Variant
    switch (variant) {
      case 'success':
        baseStyle.backgroundColor = colors.successLight;
        break;
      case 'warning':
        baseStyle.backgroundColor = colors.warningLight;
        break;
      case 'error':
        baseStyle.backgroundColor = colors.errorLight;
        break;
      case 'primary':
        baseStyle.backgroundColor = colors.primaryLight;
        break;
      default:
        baseStyle.backgroundColor = colors.borderLight;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: Layout.fontWeight.semibold,
    };

    // Size
    switch (size) {
      case 'sm':
        baseStyle.fontSize = Layout.fontSize.xs;
        break;
      default:
        baseStyle.fontSize = Layout.fontSize.sm;
    }

    // Variant
    switch (variant) {
      case 'success':
        baseStyle.color = colors.success;
        break;
      case 'warning':
        baseStyle.color = colors.warning;
        break;
      case 'error':
        baseStyle.color = colors.error;
        break;
      case 'primary':
        baseStyle.color = colors.primary;
        break;
      default:
        baseStyle.color = colors.textSecondary;
    }

    return baseStyle;
  };

  return (
    <View style={[getBadgeStyle(), style]}>
      <Text style={[getTextStyle(), textStyle]}>{children}</Text>
    </View>
  );
}

// Reward Badge - 專門顯示回贈率
interface RewardBadgeProps {
  rate: number | string;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function RewardBadge({ rate, size = 'md', style }: RewardBadgeProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const rateNum = typeof rate === 'string' ? parseFloat(rate) : rate;
  const isHot = rateNum >= 5;
  const isGood = rateNum >= 2;

  const getSizeStyle = (): { container: ViewStyle; text: TextStyle } => {
    switch (size) {
      case 'sm':
        return {
          container: { paddingVertical: 2, paddingHorizontal: 6 },
          text: { fontSize: Layout.fontSize.xs },
        };
      case 'lg':
        return {
          container: { paddingVertical: 6, paddingHorizontal: 12 },
          text: { fontSize: Layout.fontSize.lg },
        };
      default:
        return {
          container: { paddingVertical: 4, paddingHorizontal: 8 },
          text: { fontSize: Layout.fontSize.sm },
        };
    }
  };

  const sizeStyle = getSizeStyle();

  return (
    <View
      style={[
        {
          backgroundColor: colors.rewardGreenLight,
          borderRadius: Layout.radius.md,
        },
        sizeStyle.container,
        style,
      ]}
    >
      <Text
        style={[
          {
            color: colors.rewardGreen,
            fontWeight: Layout.fontWeight.bold,
          },
          sizeStyle.text,
        ]}
      >
        {typeof rate === 'number' ? `${rate.toFixed(1)}%` : rate}
        {isHot && ' 🔥'}
      </Text>
    </View>
  );
}

