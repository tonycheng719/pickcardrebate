import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';
import { Button } from '@/components/ui';
import { logEvent } from '@/lib/analytics';
import { API_BASE_URL } from '@/lib/api/client';

interface PartnerOffer {
  enabled: boolean;
  applyUrl: string;
  bonusValue: number;
  bonusDescription: string;
  bonusItems?: string[];
  validFrom: string;
  validTo: string;
  requirements?: string[];
  minSpend?: number;
  minSpendDays?: number;
  notes?: string;
}

interface ExistingCustomerOffer {
  bonusValue: number;
  bonusDescription: string;
  bonusItems?: string[];
  requirements?: string[];
}

interface PartnerOfferCardProps {
  cardId: string;
  cardName: string;
  cardBank: string;
  offer: PartnerOffer;
  existingCustomerOffer?: ExistingCustomerOffer;
  bankWelcomeValue?: number; // 銀行迎新價值（港幣）
}

export function PartnerOfferCard({ 
  cardId, 
  cardName, 
  cardBank, 
  offer,
  existingCustomerOffer,
  bankWelcomeValue = 0 
}: PartnerOfferCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [customerType, setCustomerType] = useState<'new' | 'existing'>('new');
  const [showDetails, setShowDetails] = useState(false);

  const hasExistingOffer = !!existingCustomerOffer;
  const currentOffer = customerType === 'existing' && existingCustomerOffer 
    ? existingCustomerOffer 
    : offer;
  const currentBonusValue = currentOffer.bonusValue;
  const currentBonusItems = currentOffer.bonusItems;
  const currentRequirements = customerType === 'existing' && existingCustomerOffer
    ? existingCustomerOffer.requirements
    : offer.requirements;
  
  // 計算總價值（銀行迎新 + 本網額外獎賞）
  const totalValue = bankWelcomeValue + currentBonusValue;

  // 格式化日期
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-HK');
  };

  // 點擊申請
  const handleApply = async () => {
    // 追蹤事件到 Firebase Analytics
    logEvent('click_apply_partner', {
      card_id: cardId,
      card_name: cardName,
      card_bank: cardBank,
      customer_type: customerType,
      bonus_value: currentBonusValue,
    });

    // 發送到後端統計
    try {
      fetch(`${API_BASE_URL}/stats/partner-click`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardId,
          cardName,
          customerType: hasExistingOffer ? customerType : 'new',
          source: 'app',
        }),
      }).catch(() => {});
    } catch {}

    // 打開申請連結（優先使用 WebBrowser，fallback 到 Linking）
    try {
      await WebBrowser.openBrowserAsync(offer.applyUrl);
    } catch (error) {
      // Fallback: 嘗試用系統瀏覽器打開
      const canOpen = await Linking.canOpenURL(offer.applyUrl);
      if (canOpen) {
        await Linking.openURL(offer.applyUrl);
      } else {
        Alert.alert(
          '無法開啟連結',
          '請稍後再試，或複製以下連結到瀏覽器：\n\n' + offer.applyUrl,
          [{ text: '確定' }]
        );
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#3D2800' : '#FFF7ED' }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="gift" size={18} color="#FFF" />
          <Text style={styles.headerTitle}>經本網連結申請額外獎賞</Text>
        </View>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>+${currentBonusValue.toLocaleString()}</Text>
        </View>
      </View>

      {/* Customer Type Tabs */}
      {hasExistingOffer && (
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              customerType === 'new' && styles.tabActive,
              { borderColor: colors.border }
            ]}
            onPress={() => setCustomerType('new')}
          >
            <Ionicons 
              name="person-add" 
              size={14} 
              color={customerType === 'new' ? '#F59E0B' : colors.textMuted} 
            />
            <Text style={[
              styles.tabText,
              { color: customerType === 'new' ? '#F59E0B' : colors.textMuted }
            ]}>全新客戶</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              customerType === 'existing' && styles.tabActive,
              { borderColor: colors.border }
            ]}
            onPress={() => setCustomerType('existing')}
          >
            <Ionicons 
              name="person" 
              size={14} 
              color={customerType === 'existing' ? '#F59E0B' : colors.textMuted} 
            />
            <Text style={[
              styles.tabText,
              { color: customerType === 'existing' ? '#F59E0B' : colors.textMuted }
            ]}>現有客戶</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        {/* Combined Total Value (like web) */}
        {bankWelcomeValue > 0 && (
          <View style={[styles.totalValueCard, { backgroundColor: colors.backgroundCard }]}>
            <Text style={[styles.totalValueLabel, { color: colors.text }]}>
              銀行迎新 + 本網額外獎賞 最高可獲
            </Text>
            <Text style={styles.totalValueAmount}>
              ${totalValue.toLocaleString()}
            </Text>
            <View style={styles.totalValueBreakdown}>
              <Text style={[styles.breakdownText, { color: colors.textMuted }]}>
                銀行迎新 ${bankWelcomeValue.toLocaleString()} + 額外獎賞 ${currentBonusValue.toLocaleString()}
              </Text>
            </View>
          </View>
        )}

        {/* Bonus Value (only show if no bank welcome) */}
        {bankWelcomeValue === 0 && (
          <View style={[styles.valueCard, { backgroundColor: colors.backgroundCard }]}>
            <Text style={[styles.valueLabel, { color: colors.textMuted }]}>
              本網額外獎賞
            </Text>
            <Text style={styles.valueAmount}>
              ${currentBonusValue.toLocaleString()}
            </Text>
          </View>
        )}

        {/* Bonus Items */}
        {currentBonusItems && currentBonusItems.length > 0 && (
          <View style={styles.itemsSection}>
            <View style={styles.itemsHeader}>
              <Ionicons name="gift-outline" size={16} color="#F59E0B" />
              <Text style={[styles.itemsTitle, { color: colors.text }]}>
                額外獎賞內容
              </Text>
              {currentBonusItems.length > 1 && (
                <View style={styles.choiceBadge}>
                  <Text style={styles.choiceBadgeText}>{currentBonusItems.length}選1</Text>
                </View>
              )}
            </View>
            {currentBonusItems.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <Text style={[styles.itemBullet, { color: '#F59E0B' }]}>•</Text>
                <Text style={[styles.itemText, { color: colors.text }]}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Requirements */}
        {((offer.minSpend && offer.minSpend > 0) || (currentRequirements && currentRequirements.length > 0)) && (
          <View style={styles.requirementsSection}>
            <View style={styles.requirementsHeader}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={[styles.requirementsTitle, { color: colors.text }]}>
                申請要求
              </Text>
            </View>
            {offer.minSpend && offer.minSpend > 0 && customerType === 'new' && (
              <View style={styles.requirementRow}>
                <Text style={[styles.requirementCheck, { color: '#10B981' }]}>✓</Text>
                <Text style={[styles.requirementText, { color: colors.textMuted }]}>
                  批卡後 {offer.minSpendDays || 30} 日內簽賬滿 ${offer.minSpend.toLocaleString()}
                </Text>
              </View>
            )}
            {currentRequirements?.map((req, index) => (
              <View key={index} style={styles.requirementRow}>
                <Text style={[styles.requirementCheck, { color: '#10B981' }]}>✓</Text>
                <Text style={[styles.requirementText, { color: colors.textMuted }]}>{req}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Valid Period */}
        <View style={styles.validPeriod}>
          <Ionicons name="time-outline" size={14} color={colors.textMuted} />
          <Text style={[styles.validPeriodText, { color: colors.textMuted }]}>
            優惠期：{formatDate(offer.validFrom)} - {formatDate(offer.validTo)}
          </Text>
        </View>

        {/* Apply Button */}
        <TouchableOpacity style={styles.applyButton} onPress={handleApply} activeOpacity={0.8}>
          <Text style={styles.applyButtonText}>立即申請賺取額外獎賞</Text>
          <Ionicons name="open-outline" size={18} color="#FFF" />
        </TouchableOpacity>

        {/* Toggle Details */}
        <TouchableOpacity 
          style={styles.detailsToggle} 
          onPress={() => setShowDetails(!showDetails)}
        >
          <Ionicons name="information-circle-outline" size={14} color={colors.textMuted} />
          <Text style={[styles.detailsToggleText, { color: colors.textMuted }]}>
            換領須知及條款
          </Text>
          <Ionicons 
            name={showDetails ? "chevron-up" : "chevron-down"} 
            size={14} 
            color={colors.textMuted} 
          />
        </TouchableOpacity>

        {/* Details Section */}
        {showDetails && (
          <View style={[styles.detailsContent, { backgroundColor: colors.backgroundCard }]}>
            <Text style={[styles.detailsTitle, { color: colors.text }]}>📋 換領須知</Text>
            <Text style={[styles.detailsItem, { color: colors.textMuted }]}>
              1. 必須透過本網指定連結申請。
            </Text>
            <Text style={[styles.detailsItem, { color: colors.textMuted }]}>
              2. 建議使用 Chrome 瀏覽器，確保沒有封鎖追蹤、Cookie，沒有使用無痕模式，並已關閉 AdBlock。
            </Text>
            <Text style={[styles.detailsItem, { color: colors.textMuted }]}>
              3. 申請後7日內必須填寫電郵內的換領表格。
            </Text>
            
            {offer.notes && (
              <>
                <Text style={[styles.detailsTitle, { color: colors.text, marginTop: 12 }]}>📝 其他備註</Text>
                <Text style={[styles.detailsItem, { color: colors.textMuted }]}>{offer.notes}</Text>
              </>
            )}
            
            <Text style={[styles.disclaimer, { color: colors.textMuted }]}>
              *額外迎新禮品由合作夥伴送出及安排換領，受條款及細則約束。
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: Layout.spacing.lg,
    borderWidth: 2,
    borderColor: '#FBBF24',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F59E0B',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  headerBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  headerBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  tabActive: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  totalValueCard: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FBBF24',
  },
  totalValueLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  totalValueAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F59E0B',
  },
  totalValueBreakdown: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#FDE68A',
  },
  breakdownText: {
    fontSize: 11,
  },
  valueCard: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  valueLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  valueAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F59E0B',
  },
  itemsSection: {
    marginBottom: 16,
  },
  itemsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  choiceBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  choiceBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#F59E0B',
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  itemBullet: {
    fontSize: 14,
    marginRight: 8,
  },
  itemText: {
    fontSize: 13,
    flex: 1,
    lineHeight: 20,
  },
  requirementsSection: {
    marginBottom: 16,
  },
  requirementsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  requirementRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  requirementCheck: {
    fontSize: 14,
    marginRight: 8,
  },
  requirementText: {
    fontSize: 13,
    flex: 1,
    lineHeight: 20,
  },
  validPeriod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  validPeriodText: {
    fontSize: 12,
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F59E0B',
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  detailsToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 16,
    paddingVertical: 8,
  },
  detailsToggleText: {
    fontSize: 12,
  },
  detailsContent: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
  },
  detailsTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  detailsItem: {
    fontSize: 11,
    lineHeight: 18,
    marginBottom: 4,
  },
  disclaimer: {
    fontSize: 10,
    lineHeight: 16,
    marginTop: 12,
    opacity: 0.7,
  },
});

