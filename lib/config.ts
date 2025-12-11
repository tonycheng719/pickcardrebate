/**
 * Global configuration settings
 * 
 * Note: These settings can be overridden by environment variables or admin settings
 */

export const CONFIG = {
  /**
   * Partner Mode - 合作夥伴模式
   * 
   * When enabled: Use partner apply URLs (e.g. MoneyHero) for card applications
   * When disabled: Use official bank apply URLs
   * 
   * Set to true when partner welcome offers are active
   * Set to false when partner welcome offers are suspended
   */
  PARTNER_MODE_ENABLED: false, // ← 改為 true 啟用合作夥伴連結
  
  /**
   * Default miles value for calculations
   * Standard Asia Miles valuation: $0.1 per mile
   */
  DEFAULT_MILES_VALUE: 0.1,
  
  /**
   * Default foreign currency fee for cards without explicit fee
   */
  DEFAULT_FX_FEE: 1.95,
};

// Export individual settings for convenience
export const PARTNER_MODE_ENABLED = CONFIG.PARTNER_MODE_ENABLED;

