import { ref, readonly } from 'vue'
import PocketBase from 'pocketbase'

export interface AdOptions {
  url: string
  token: string
}

export interface Ad {
  id: string
  image: string
  imageUrl?: string // URL كامل للصورة من PocketBase
  isActive: boolean
  show: string // نوع الإعلان: 'popup', 'banar', 'sidebar', إلخ
  link?: string // رابط الإعلان
  views: number
  delay?: number // تأخير بالثواني بعد تحميل الصفحة
}

export interface CookieAdData {
  id: string
  closedAt: number // timestamp
}

export const useAds = (options: AdOptions) => {
  const pb = new PocketBase(options.url)
  
  const ads = ref<Ad[]>([])
  const error = ref<string | null>(null)
  const isLoading = ref(false)
  
  // Cookie helper functions
  const getCookieName = (adId: string) => `ad_closed_${adId}`
  const COOKIE_EXPIRY_DAYS = 1 // يوم واحد
  
  // قراءة الإعلانات من الكوكيز المغلقة
  const getClosedAdsFromCookies = (): Record<string, CookieAdData> => {
    if (typeof document === 'undefined') return {}
    
    const closedAds: Record<string, CookieAdData> = {}
    
    document.cookie.split(';').forEach(cookie => {
      const parts = cookie.trim().split('=')
      const name = parts[0]
      const value = parts[1]
      
      if (name && value && name.startsWith('ad_closed_')) {
        try {
          const adId = name.replace('ad_closed_', '')
          const data = JSON.parse(decodeURIComponent(value)) as CookieAdData
          closedAds[adId] = data
        } catch (e) {
          console.warn('Error parsing ad cookie:', e)
        }
      }
    })
    
    return closedAds
  }
  
  // التحقق من انتهاء صلاحية الكوكي (بعد يوم)
  const isAdCookieExpired = (cookieData: CookieAdData): boolean => {
    const now = Date.now()
    const expiryTime = cookieData.closedAt + (COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
    return now > expiryTime
  }
  
  // حفظ إغلاق إعلان في الكوكيز
  const saveClosedAdToCookie = (adId: string) => {
    if (typeof document === 'undefined') return
    
    const cookieData: CookieAdData = {
      id: adId,
      closedAt: Date.now()
    }
    
    const expiryDate = new Date()
    expiryDate.setTime(expiryDate.getTime() + (COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000))
    
    document.cookie = `${getCookieName(adId)}=${encodeURIComponent(JSON.stringify(cookieData))};expires=${expiryDate.toUTCString()};path=/`
  }
  
  // جلب الإعلانات من PocketBase
  const fetchAds = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // جلب الإعلانات النشطة فقط
      const records = await pb.collection('productads').getList(1, 50, {
        filter: 'isActive = true',
        sort: '-created'
      })
      
      // قراءة الكوكيز للإعلانات المغلقة
      const closedAds = getClosedAdsFromCookies()
      
      // تصفية الإعلانات المغلقة التي لم تنته صلاحيتها وبناء URLs للصور
      const activeAds = records.items
        .map((record: any) => {
          // بناء URL كامل للصورة من PocketBase
          let imageUrl = ''
          if (record.image) {
            try {
              // إذا كانت الصورة ملف محمل في PocketBase
              if (typeof record.image === 'string' && record.id) {
                imageUrl = pb.files.getUrl(record, record.image)
              } else {
                imageUrl = record.image
              }
            } catch (e) {
              // إذا كان URL مباشر أو خطأ في البناء
              imageUrl = record.image
            }
          }
          
          return {
            id: record.id,
            image: record.image || '',
            imageUrl: imageUrl,
            isActive: record.isActive || false,
            show: record.show || '', // نوع الإعلان من حقل show
            link: record.link || '',
            views: record.views || 0,
            delay: record.delay || 0
          }
        })
        .filter((ad: Ad) => {
          // تصفية حسب نوع الإعلان المدعوم فقط
          const supportedTypes = ['popup', 'banar', 'banner', 'sidebar', 'asda']
          if (!supportedTypes.includes(ad.show.toLowerCase())) {
            return false
          }
          
          // التحقق من الكوكيز
          const closedAd = closedAds[ad.id]
          // إذا لم يكن الإعلان مغلقاً، أو انتهت صلاحية الكوكي، عرض الإعلان
          if (!closedAd) return true
          return isAdCookieExpired(closedAd)
        })
      
      ads.value = activeAds
      return activeAds
    } catch (e) {
      error.value = 'فشل في جلب الإعلانات'
      console.error('Ads fetch error:', e)
      return []
    } finally {
      isLoading.value = false
    }
  }
  
  // زيادة عدد المشاهدات
  const incrementViews = async (adId: string) => {
    try {
      // استخدام API endpoint لزيادة المشاهدات
      const response = await fetch(`/api/ads/${adId}/views`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: options.url
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to increment views')
      }
      
      const data = await response.json()
      
      // تحديث الحالة المحلية
      const adIndex = ads.value.findIndex(a => a.id === adId)
      if (adIndex !== -1 && data && typeof data.views === 'number') {
        const ad = ads.value[adIndex]
        if (ad) {
          ad.views = data.views
        }
      }
    } catch (e) {
      console.error('Error incrementing ad views:', e)
    }
  }
  
  // إغلاق إعلان (حفظ في الكوكيز)
  const closeAd = (adId: string) => {
    saveClosedAdToCookie(adId)
    // إزالة الإعلان من القائمة المحلية
    ads.value = ads.value.filter(ad => ad.id !== adId)
  }
  
  return {
    ads: readonly(ads),
    error: readonly(error),
    isLoading: readonly(isLoading),
    fetchAds,
    incrementViews,
    closeAd
  }
}

