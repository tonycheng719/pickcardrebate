// CDN 圖片處理
// 支援多種 CDN 服務：Cloudflare Images, imgix, Cloudinary 等

// CDN 配置
export const cdnConfig = {
  // 使用的 CDN 服務
  provider: (process.env.NEXT_PUBLIC_CDN_PROVIDER || 'supabase') as 'supabase' | 'cloudflare' | 'imgix' | 'cloudinary',
  
  // CDN 域名
  cdnDomain: process.env.NEXT_PUBLIC_CDN_DOMAIN || '',
  
  // Supabase Storage URL（預設）
  supabaseStorageUrl: 'https://pickcardrebate-supabase-kong.zeabur.app/storage/v1/object/public/images',
  
  // 圖片品質（1-100）
  defaultQuality: 80,
  
  // 預設格式
  defaultFormat: 'webp',
};

// 圖片尺寸預設
export const imageSizes = {
  thumbnail: { width: 100, height: 100 },
  small: { width: 200, height: 200 },
  medium: { width: 400, height: 400 },
  large: { width: 800, height: 800 },
  card: { width: 300, height: 190 }, // 信用卡比例
  cardLarge: { width: 600, height: 380 },
  merchant: { width: 80, height: 80 },
  merchantLarge: { width: 160, height: 160 },
};

export type ImageSize = keyof typeof imageSizes;

// 獲取優化後的圖片 URL
export function getOptimizedImageUrl(
  originalUrl: string,
  options?: {
    size?: ImageSize;
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpg' | 'png';
  }
): string {
  if (!originalUrl) return '';
  
  // 如果是外部 URL 且沒有配置 CDN，直接返回
  if (!cdnConfig.cdnDomain && !originalUrl.includes(cdnConfig.supabaseStorageUrl)) {
    return originalUrl;
  }
  
  const size = options?.size ? imageSizes[options.size] : null;
  const width = options?.width || size?.width;
  const height = options?.height || size?.height;
  const quality = options?.quality || cdnConfig.defaultQuality;
  const format = options?.format || cdnConfig.defaultFormat;
  
  switch (cdnConfig.provider) {
    case 'cloudflare':
      // Cloudflare Images URL 格式
      // https://imagedelivery.net/<account_hash>/<image_id>/<variant>
      return buildCloudflareUrl(originalUrl, { width, height, quality, format });
      
    case 'imgix':
      // imgix URL 格式
      return buildImgixUrl(originalUrl, { width, height, quality, format });
      
    case 'cloudinary':
      // Cloudinary URL 格式
      return buildCloudinaryUrl(originalUrl, { width, height, quality, format });
      
    case 'supabase':
    default:
      // Supabase 目前不支援圖片轉換，使用 Next.js Image 組件優化
      return originalUrl;
  }
}

// Cloudflare Images URL 構建
function buildCloudflareUrl(
  url: string,
  options: { width?: number; height?: number; quality?: number; format?: string }
): string {
  const transforms: string[] = [];
  
  if (options.width) transforms.push(`w=${options.width}`);
  if (options.height) transforms.push(`h=${options.height}`);
  if (options.quality) transforms.push(`q=${options.quality}`);
  if (options.format) transforms.push(`f=${options.format}`);
  
  // 假設使用 Cloudflare Images
  // 格式：/cdn-cgi/image/options/path
  const baseUrl = cdnConfig.cdnDomain || '';
  const imagePath = url.replace(cdnConfig.supabaseStorageUrl, '');
  
  return `${baseUrl}/cdn-cgi/image/${transforms.join(',')}${imagePath}`;
}

// imgix URL 構建
function buildImgixUrl(
  url: string,
  options: { width?: number; height?: number; quality?: number; format?: string }
): string {
  const params = new URLSearchParams();
  
  if (options.width) params.append('w', String(options.width));
  if (options.height) params.append('h', String(options.height));
  if (options.quality) params.append('q', String(options.quality));
  if (options.format) params.append('fm', options.format);
  params.append('auto', 'format,compress');
  params.append('fit', 'crop');
  
  const baseUrl = cdnConfig.cdnDomain || '';
  const imagePath = url.replace(cdnConfig.supabaseStorageUrl, '');
  
  return `${baseUrl}${imagePath}?${params.toString()}`;
}

// Cloudinary URL 構建
function buildCloudinaryUrl(
  url: string,
  options: { width?: number; height?: number; quality?: number; format?: string }
): string {
  const transforms: string[] = [];
  
  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.quality) transforms.push(`q_${options.quality}`);
  if (options.format) transforms.push(`f_${options.format}`);
  transforms.push('c_fill');
  
  // Cloudinary URL 格式
  // https://res.cloudinary.com/<cloud_name>/image/upload/<transforms>/<public_id>
  const baseUrl = cdnConfig.cdnDomain || '';
  const imagePath = url.replace(cdnConfig.supabaseStorageUrl, '');
  
  return `${baseUrl}/image/upload/${transforms.join(',')}${imagePath}`;
}

// 信用卡圖片 URL
export function getCardImageUrl(cardId: string, size: 'small' | 'large' = 'small'): string {
  // 從資料庫或配置獲取原始 URL
  // 這裡假設圖片存儲在 Supabase Storage
  const imagePath = `/cards/${cardId}.png`;
  const originalUrl = `${cdnConfig.supabaseStorageUrl}${imagePath}`;
  
  return getOptimizedImageUrl(originalUrl, {
    size: size === 'small' ? 'card' : 'cardLarge',
  });
}

// 商戶圖標 URL
export function getMerchantIconUrl(merchantId: string, size: 'small' | 'large' = 'small'): string {
  const imagePath = `/merchants/${merchantId}.png`;
  const originalUrl = `${cdnConfig.supabaseStorageUrl}${imagePath}`;
  
  return getOptimizedImageUrl(originalUrl, {
    size: size === 'small' ? 'merchant' : 'merchantLarge',
  });
}

// 預載圖片
export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
}

// 批量預載圖片
export async function preloadImages(urls: string[]): Promise<void> {
  await Promise.allSettled(urls.map(preloadImage));
}

