import React from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'outline' | 'elevated';
}

export function Card({ children, style, onPress, variant = 'default' }: CardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: colors.backgroundCard,
      borderRadius: Layout.radius.xl,
      padding: Layout.spacing.lg,
    };

    switch (variant) {
      case 'outline':
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = colors.border;
        break;
      case 'elevated':
        Object.assign(baseStyle, Layout.shadow.md);
        break;
      default:
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = colors.borderLight;
    }

    return baseStyle;
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          getCardStyle(),
          pressed && { opacity: 0.9 },
          style,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[getCardStyle(), style]}>{children}</View>;
}

// Card Header
interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function CardHeader({ children, style }: CardHeaderProps) {
  return (
    <View style={[styles.header, style]}>
      {children}
    </View>
  );
}

// Card Content
interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function CardContent({ children, style }: CardContentProps) {
  return (
    <View style={[styles.content, style]}>
      {children}
    </View>
  );
}

// Card Footer
interface CardFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function CardFooter({ children, style }: CardFooterProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  return (
    <View style={[styles.footer, { borderTopColor: colors.borderLight }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: Layout.spacing.md,
  },
  content: {
    // Default content style
  },
  footer: {
    marginTop: Layout.spacing.md,
    paddingTop: Layout.spacing.md,
    borderTopWidth: 1,
  },
});

