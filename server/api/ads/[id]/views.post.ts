import PocketBase from 'pocketbase'
import { defineEventHandler, readBody, getRouterParam, createError } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Ad ID is required'
      })
    }

    // قراءة البيانات من الطلب
    const body = await readBody(event)
    const { url } = body

    if (!url) {
      throw createError({
        statusCode: 400,
        statusMessage: 'PocketBase URL is required'
      })
    }

    // الاتصال بـ PocketBase
    const pb = new PocketBase(url)
    
    // جلب الإعلان الحالي
    const ad = await pb.collection('productads').getOne(id)
    const currentViews = ad.views || 0
    
    // تحديث عدد المشاهدات
    await pb.collection('productads').update(id, {
      views: currentViews + 1
    })
    
    return {
      success: true,
      views: currentViews + 1
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.status || 500,
      statusMessage: error.message || 'Failed to increment ad views'
    })
  }
})

