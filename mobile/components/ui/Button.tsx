import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  onPress,
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: Layout.radius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Size
    switch (size) {
      case 'sm':
        baseStyle.paddingVertical = Layout.spacing.sm;
        baseStyle.paddingHorizontal = Layout.spacing.md;
        break;
      case 'lg':
        baseStyle.paddingVertical = Layout.spacing.lg;
        baseStyle.paddingHorizontal = Layout.spacing.xl;
        break;
      default:
        baseStyle.paddingVertical = Layout.spacing.md;
        baseStyle.paddingHorizontal = Layout.spacing.lg;
    }

    // Variant
    switch (variant) {
      case 'secondary':
        baseStyle.backgroundColor = colors.primaryLight;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = colors.border;
        break;
      case 'ghost':
        baseStyle.backgroundColor = 'transparent';
        break;
      default:
        baseStyle.backgroundColor = colors.primary;
    }

    if (disabled || loading) {
      baseStyle.opacity = 0.5;
    }

    if (fullWidth) {
      baseStyle.width = '100%';
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
        baseStyle.fontSize = Layout.fontSize.sm;
        break;
      case 'lg':
        baseStyle.fontSize = Layout.fontSize.lg;
        break;
      default:
        baseStyle.fontSize = Layout.fontSize.base;
    }

    // Variant
    switch (variant) {
      case 'secondary':
        baseStyle.color = colors.primary;
        break;
      case 'outline':
      case 'ghost':
        baseStyle.color = colors.text;
        break;
      default:
        baseStyle.color = '#FFFFFF';
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyle(), style]}
      activeOpacity={0.7}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#FFFFFF' : colors.primary}
          style={{ marginRight: Layout.spacing.sm }}
        />
      )}
      <Text style={[getTextStyle(), textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

