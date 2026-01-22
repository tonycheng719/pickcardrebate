import { calculateRebate } from '@/lib/logic/calculator';

describe('Calculator', () => {
  describe('calculateRebate', () => {
    it('should return empty array when no cards provided', () => {
      const results = calculateRebate({
        cards: [],
        merchant: { id: 'test', name: 'Test', categoryIds: ['dining'] },
        amount: 100,
        paymentMethod: 'credit_card',
        rewardPreference: 'cash',
      });
      
      expect(results).toEqual([]);
    });

    it('should calculate basic rebate correctly', () => {
      const mockCard = {
        id: 'test-card',
        name: 'Test Card',
        bank: 'Test Bank',
        rules: [
          {
            description: 'Base rebate 1%',
            matchType: 'base' as const,
            percentage: 1,
          },
        ],
        style: { bgColor: 'bg-blue-500', textColor: 'text-white' },
      };

      const results = calculateRebate({
        cards: [mockCard],
        merchant: { id: 'test', name: 'Test Merchant', categoryIds: ['general'] },
        amount: 1000,
        paymentMethod: 'credit_card',
        rewardPreference: 'cash',
      });

      expect(results).toHaveLength(1);
      expect(results[0].cardId).toBe('test-card');
      expect(results[0].totalPercentage).toBe(1);
      expect(results[0].totalReward).toBe(10); // 1000 * 1%
    });

    it('should prioritize higher rebate cards', () => {
      const lowCard = {
        id: 'low-card',
        name: 'Low Card',
        bank: 'Test Bank',
        rules: [{ description: 'Base 0.5%', matchType: 'base' as const, percentage: 0.5 }],
        style: { bgColor: 'bg-gray-500', textColor: 'text-white' },
      };

      const highCard = {
        id: 'high-card',
        name: 'High Card',
        bank: 'Test Bank',
        rules: [{ description: 'Base 2%', matchType: 'base' as const, percentage: 2 }],
        style: { bgColor: 'bg-green-500', textColor: 'text-white' },
      };

      const results = calculateRebate({
        cards: [lowCard, highCard],
        merchant: { id: 'test', name: 'Test', categoryIds: ['general'] },
        amount: 1000,
        paymentMethod: 'credit_card',
        rewardPreference: 'cash',
      });

      expect(results[0].cardId).toBe('high-card');
      expect(results[1].cardId).toBe('low-card');
    });

    it('should apply category-specific rules', () => {
      const mockCard = {
        id: 'dining-card',
        name: 'Dining Card',
        bank: 'Test Bank',
        rules: [
          { description: 'Base 0.5%', matchType: 'base' as const, percentage: 0.5 },
          { description: 'Dining 4%', matchType: 'category' as const, matchValue: ['dining'], percentage: 4 },
        ],
        style: { bgColor: 'bg-orange-500', textColor: 'text-white' },
      };

      const diningResults = calculateRebate({
        cards: [mockCard],
        merchant: { id: 'restaurant', name: 'Restaurant', categoryIds: ['dining'] },
        amount: 1000,
        paymentMethod: 'credit_card',
        rewardPreference: 'cash',
      });

      const generalResults = calculateRebate({
        cards: [mockCard],
        merchant: { id: 'shop', name: 'Shop', categoryIds: ['general'] },
        amount: 1000,
        paymentMethod: 'credit_card',
        rewardPreference: 'cash',
      });

      expect(diningResults[0].totalPercentage).toBe(4); // Dining rate
      expect(generalResults[0].totalPercentage).toBe(0.5); // Base rate
    });

    it('should respect cap limits', () => {
      const mockCard = {
        id: 'capped-card',
        name: 'Capped Card',
        bank: 'Test Bank',
        rules: [
          {
            description: '4% with $50 cap',
            matchType: 'base' as const,
            percentage: 4,
            cap: 50,
            capType: 'reward' as const,
          },
        ],
        style: { bgColor: 'bg-purple-500', textColor: 'text-white' },
      };

      const results = calculateRebate({
        cards: [mockCard],
        merchant: { id: 'test', name: 'Test', categoryIds: ['general'] },
        amount: 10000, // Would be $400 without cap
        paymentMethod: 'credit_card',
        rewardPreference: 'cash',
      });

      // Should be capped at $50
      expect(results[0].totalReward).toBeLessThanOrEqual(50);
    });
  });
});

